import { Routes, Route} from 'react-router-dom';
import AuthLayout from "./layouts/auth/AuthLayout";

// pages
import Login from './pages/auth/Login';
import Registro from './pages/auth/Registro';
import Error404 from "./pages/404";
import Problemas from './pages/auth/Problemas';
import Admin from './pages/auth/Admin';
import Home from './pages/auth/Home';
import Ajustes from './pages/auth/Ajustes';
import Asesora from './pages/auth/Asesora';
import {RutaPrivadaAdmin, RutaPrivadaAsesora, RutaPrivadaAsociado} from './pages/auth/RutaPrivadaAdmin';
import VerSaldo from './pages/auth/VerSaldo';
import Asociados from './pages/auth/Asociados';
import MenuAsesora from './pages/auth/MenuAsesora';
import Beneficios from './pages/auth/Beneficios';
import Movimientos from './pages/auth/Movimientos'

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index  element={<Login/>}/>
        <Route path="Home" element={<RutaPrivadaAdmin element={<Home />} />} />
        <Route path="Ajustes" element={<RutaPrivadaAdmin element={<Ajustes />} />} />
        <Route path="problemas" element={<Problemas />} />
        <Route path='verSaldo' element={<RutaPrivadaAsociado element={<VerSaldo />} />} />
        <Route path='registro' element={<Registro />} />
        <Route path='menuasesora' element={<RutaPrivadaAsesora element={<MenuAsesora />} />} />
        <Route path='asociado' element={<RutaPrivadaAsesora element={<Asociados />} />} />
        <Route path='asesora' element={<RutaPrivadaAsesora element={<Asesora />} />} />
        <Route path='movimientos' element={<RutaPrivadaAsesora element={<Movimientos />} />} />
        <Route path='beneficios' element={<RutaPrivadaAsesora element={<Beneficios />} />} />
        <Route path="admin" element={<RutaPrivadaAdmin element={<Admin />} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;