import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const raw = localStorage.getItem("user");
  let user = "Usuario";
  
  try {
    user = raw && JSON.parse(raw).email ? JSON.parse(raw).email : (raw || "Usuario");
  } catch(e){
    user = raw || "Usuario";
  }

  // Nuevo efecto de gradientes oscuros
  const [gradient, setGradient] = useState("from-gray-900 via-black to-gray-950");

  useEffect(() => {
    const gradients = [
      "from-gray-900 via-black to-gray-950",
      "from-blue-950 via-black to-gray-900",
      "from-indigo-950 via-black to-gray-900",
      "from-purple-950 via-black to-gray-900",
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
      className={`min-h-screen flex flex-col items-center transition-all duration-1000 ease-in-out bg-gradient-to-br ${gradient} text-gray-200`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* NAVBAR OSCURA */}
      <nav className="w-full flex justify-between items-center p-6 bg-neutral-950/70 backdrop-blur-md border-b border-neutral-800 shadow-lg">
        <h1 className="text-xl font-semibold text-gray-100">
          Microservicio Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition shadow-lg"
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </nav>

      {/* CARD PRINCIPAL OSCURA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mt-20 w-full max-w-lg bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-10 text-center"
      >
        <div className="bg-blue-900/40 text-blue-300 rounded-full p-4 mb-4 border border-blue-800 shadow-lg">
          <User size={42} />
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-gray-100">¡Bienvenido!</h2>
        <p className="text-gray-400 mb-6">
          Has iniciado sesión correctamente en el sistema de autenticación.
        </p>

        <div className="flex flex-col gap-4 w-full text-left">
          
          <div className="flex items-center gap-3 border-b border-neutral-700 pb-3">
            <Mail className="text-blue-400" />
            <div>
              <p className="text-sm text-gray-500">Correo registrado</p>
              <p className="font-medium text-gray-200">{user}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-neutral-700 pb-3">
            <User className="text-blue-400" />
            <div>
              <p className="text-sm text-gray-500">Rol del usuario</p>
              <p className="font-medium text-gray-200">Administrador</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm font-semibold border border-green-700">
              Sesión activa
            </span>
          </div>

        </div>
      </motion.div>

      <footer className="mt-10 text-gray-600 text-sm">
        © 2025 - Sistema de Autenticación | Desarrollado por tu equipo 🚀
      </footer>
    </motion.div>
  );
}
