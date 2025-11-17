import Model from '../models/verification.model.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: process.env.GMAIL_SECURE === 'true',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

export const sendVerificationEmail = async (req, res) => {
    const email = req.body.email ? req.body.email.trim() : null;
    
     if (!email) {
        return res.status(400).json({ message: 'Se requiere el correo electrónico.' });
    }

    try {
        const user = await Model.findByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'MS1, Usuario no encontrado para verificación.' });
        }
        
        if (user.is_verified) {
             return res.status(200).json({ message: 'El usuario ya está verificado.' });
        }

        const token = Math.floor(100000 + Math.random() * 900000).toString();

        await Model.createVerificationToken(user.id_user, token); 

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        
        await transporter.sendMail({
            from: process.env.EMAIL_FROM, 
            to: user.email,
            subject: 'Verificación de Correo Electrónico',
            html: `<p>MS1, Tu código de verificación es: <strong>${token}</strong>.</p>`
        });

        res.status(200).json({ message: 'Se ha enviado un correo de verificación.' });

    } 
    catch (error) {
        console.error('Error al enviar verificación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const verifyEmail = async (req, res) => {
    const email = req.body.email ? req.body.email.trim() : null;
    const token = req.body.token ? req.body.token.trim() : null;

    if (!email || !token) {
        return res.status(400).json({ message: 'Email y código de verificación son requeridos.' });
    }

    try {
        const verifiedUserId = await Model.verifyUserAndCleanToken(email, token);

        if (!verifiedUserId) {
            return res.status(400).json({ message: 'Código inválido, expirado o email no coincide.' });
        }
        
        res.status(200).json({ message: 'MS1, Correo verificado correctamente.', userId: verifiedUserId });

    } 
    catch (error) {
        console.error('MS1, Error al verificar correo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};