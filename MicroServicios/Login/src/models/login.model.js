import { pool } from '../config/db.js';

export const Model = {
    // Buscar usuario por email o username
  findByEmailOrUsername: async (identifier) => {
    const [rows] = await pool.query(
      `SELECT * FROM User WHERE email = ? OR username = ?`,
      [identifier, identifier]
    );
    return rows[0];
  },

};

export default Model;