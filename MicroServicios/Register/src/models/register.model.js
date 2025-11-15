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

  // Crear nuevo usuario
  create: async (userData) => {
    const { nombre, apellido, username, email, password } = userData;
    const [result] = await pool.query(
      `INSERT INTO User ( nombre, apellido, username, email, password) VALUES (?, ?, ?, ?, ?)`,
      [ nombre, apellido, username, email, password ]
    );
    return result.insertId;
  }
};

export default Model;