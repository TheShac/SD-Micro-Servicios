import { pool } from '../db.js';

export const Model = {

    findByEmai: async (email) => {
        const [rows] = await pool.query(
            'SELECT id_user, email FROM User WHERE email = ?', [email]
        );
        return rows[0];
    },

    createPasswordResettoken: async (userId, token, expiresAt) => {
        const [result] = await pool.query(
            `INSERT INTO PasswordResetTokens (user_id, token, expires_at) VALUES (?, ?, ?)`, [userId, token, expiresAt]
        );
        return result.insertId;
    },

    findValidToken: async (token) => {
        const [rows] = await pool.query(
            `SELECT user_id FROM PasswordResetTokens WHERE token = ? AND expires_at > NOW()`, [token]
        );
        return rows[0];
    },

    updatePasswordAndCleanTokens: async (newHashedPassword, userId) => { 
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        try{
            await connection.query(
                `UPDATE User SET password = ? WHERE id_user = ?`, [newHashedPassword, userId]
            );
            await connection.query(
                `DELETE FROM PasswordResetTokens WHERE user_id = ?`, [userId]
            );
            await connection.commit();
            return true;
        }
        catch (error){
            await connection.rollback();
            throw error;
        }
        finally{
            connection.release();
        }
    }
};

export default Model;