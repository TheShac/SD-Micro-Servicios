import Model from '../models/recovery.model.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Model.findByEmail(email);

        if (!user) {
            console.log(`Intento de recuperación para email no encontrado: ${email}`);
            return res.status(202).json({ message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000);

        await Model.createPasswordResetToken(user.id, token, expiresAt);

        const resetLink = `http://tufrontend.com/reset-password?token=${token}`;
        
        await transporter.sendMail({
            to: user.email,
            subject: 'Restablecimiento de Contraseña',
            html: `<p>Solicitaste un restablecimiento de contraseña. Haz clic en el siguiente enlace: <a href="${resetLink}">${resetLink}</a></p>`
        });

        res.status(202).json({ message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.' });

    } catch (error) {
        console.error('Error al solicitar restablecimiento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token y nueva contraseña son requeridos.' });
    }

    try {
        const tokenEntry = await Model.findValidToken(token);

        if (!tokenEntry) {
            return res.status(400).json({ message: 'El enlace de restablecimiento es inválido o ha expirado.' });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        
        await Model.updatePasswordAndCleanTokens(tokenEntry.user_id, newHashedPassword);

        res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });

    } catch (error) {
        console.error('Error al restablecer contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};