import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';


const TOAST_ID = "login-required-toast"; 

export default function RutaProtegida() {
  const { user, token } = useAuthContext();

  if (!user || !token) {
    if (!toast.isActive(TOAST_ID)) { 
      toast.error("Debes iniciar sesión para acceder a esta página.", { 
        position: "top-center",
        toastId: TOAST_ID 
      });
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}