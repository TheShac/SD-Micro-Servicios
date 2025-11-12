import { pool } from "../config/db.js";

export const Model = {

    findByEmail: async (identifier) => {
        const [rows] = await pool.query(
          `SELECT id_user, email, is_verified FROM User WHERE email = ? OR username = ?`,
          [identifier, identifier]
        );
        return rows[0];
    },

    createVerificationToken: async (userId, token) => {
        await pool.query(
             `DELETE FROM EmailVerificationTokens WHERE user_id = ?`,
             [userId]
        );

        const [result] = await pool.query(
            `INSERT INTO EmailVerificationTokens (user_id, token) VALUES (?, ?)`,
            [userId, token]
        );
        return result.insertId;
    },

    verifyUserAndCleanToken: async (token) => {
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        try {
            const [tokenRows] = await connection.query(
                `SELECT user_id FROM EmailVerificationTokens WHERE token = ?`, [token]
            );
            const tokenEntry = tokenRows[0];

            if(!tokenEntry){
                await connection.rollback();
                return null;
            }

            await connection.query(
                `UPDATE User SET is_verified = TRUE WHERE id_user = ?`, [tokenEntry.user_id]
            );

            await connection.query(
                `DELETE FROM EmailVerificationTokens WHERE user_id = ?`, [tokenEntry.user_id]
            );
            
            await connection.commit();
            return tokenEntry.user_id;
        }
        catch (error) {
            await connection.rollback();
            throw error;
        }
        finally{
            connection.release();
        }
    }
};

export default Model;