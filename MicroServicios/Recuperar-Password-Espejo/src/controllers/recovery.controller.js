import Model from '../models/recovery.model.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: process.env.GMAIL_SECURE === 'true',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Solicitud de Token
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Model.findByEmail(email);

        if (!user) {
            console.log(`Intento de recuperación para email no encontrado: ${email}`);
            return res.status(202).json({ message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.' });
        }

        const userId = user.id_user;
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000);

        await Model.createPasswordResetToken(userId, token, expiresAt);

        const resetLink = `${process.env.FRONTEND_URL}/recovery?token=${token}`;
        
        console.log(`Enviando correo a : ${user.email} con token: ${token}`);
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: 'Restablecimiento de Contraseña',
            html: `<p>MS1, Solicitaste un restablecimiento de contraseña. Haz clic en el siguiente enlace: <a href="${resetLink}">${resetLink}</a></p>`
        });

        res.status(202).json({ message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.' });

    } catch (error) {
        console.error('Error al solicitar restablecimiento:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Restablecimiento de contraseña
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'MS1, Token y nueva contraseña son requeridos.' });
    }

    try {
        const tokenEntry = await Model.findValidToken(token);

        if (!tokenEntry) {
            return res.status(400).json({ message: 'MS1, El enlace de restablecimiento es inválido o ha expirado.' });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        
        await Model.updatePasswordAndCleanTokens(tokenEntry.user_id, newHashedPassword);

        res.status(200).json({ message: 'MS1, Contraseña restablecida exitosamente.' });

    } 
    catch (error) {
        console.error('MS1, Error al restablecer contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};