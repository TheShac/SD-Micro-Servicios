import bcrypt from "bcryptjs";
import Model from "../models/register.model.js";

export const Register = async (req, res) => {
  try {
      const { nombre, apellido, username, email, password } = req.body;
      if (await Model.findByEmailOrUsername(username) || await Model.findByEmailOrUsername(email)) {
        return res.status(409).json({ message: 'El nombre de usuario o email ya están registrados.' });
      };
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = await Model.create({ nombre, apellido, username, email, password: hashedPassword });
      res.json({ message: 'Cliente registrado correctamente', id });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' }); 
    }
};