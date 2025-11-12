import bcrypt from "bcrypt";
import LoginModel from "../models/login.model.js";

export const Login = async (req, res) => {
    const { identifier, password } = req.body;
    
    if (!identifier || !password){
      return res.status(400).json({
        message: "Se requiere un email/username y una contraseña."
      });
    }

    try {
      const user = await LoginModel.findByEmailOrUsername(identifier);

      if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

      const PasswordHash = await bcrypt.compare(password, user.password);

      if (PasswordHash){
        return res.status(200).json({ 
          message: 'Inicio de sesión exitoso',
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          } 
        });
      }
      else{
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }      
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
};