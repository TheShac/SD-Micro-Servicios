import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const raw = localStorage.getItem("user");
  let user = "Usuario";
  try { user = raw && JSON.parse(raw).email ? JSON.parse(raw).email : (raw || "Usuario") } catch(e){ user = raw||'Usuario' }
  const [gradient, setGradient] = useState("from-blue-50 via-white to-blue-100");

  useEffect(() => {
    const gradients = [
      "from-blue-50 via-white to-blue-100",
      "from-purple-50 via-pink-100 to-indigo-100",
      "from-cyan-50 via-white to-teal-100",
      "from-yellow-50 via-white to-orange-100",
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % gradients.length;
      setGradient(gradients[index]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center transition-all duration-1000 ease-in-out bg-gradient-to-br ${gradient}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="w-full flex justify-between items-center p-6 bg-white/80 backdrop-blur-md shadow-sm">
        <h1 className="text-xl font-semibold text-blue-700">
          Microservicio Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mt-20 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 text-center"
      >
        <div className="bg-blue-100 text-blue-700 rounded-full p-4 mb-4">
          <User size={42} />
        </div>

        <h2 className="text-2xl font-semibold mb-2">¡Bienvenido!</h2>
        <p className="text-gray-600 mb-6">
          Has iniciado sesión correctamente en el sistema de autenticación.
        </p>

        <div className="flex flex-col gap-4 w-full text-left">
          <div className="flex items-center gap-3 border-b pb-3">
            <Mail className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Correo registrado</p>
              <p className="font-medium text-gray-800">{user}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b pb-3">
            <User className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Rol del usuario</p>
              <p className="font-medium text-gray-800">Administrador</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              Sesión activa
            </span>
          </div>
        </div>
      </motion.div>

      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 - Sistema de Autenticación | Desarrollado por tu equipo 🚀
      </footer>
    </motion.div>
