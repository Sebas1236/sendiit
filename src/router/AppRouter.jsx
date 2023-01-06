import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { InicioApp } from "../InicioApp";
import { LoginPage, RegisterPage } from '../auth'
import { GestionarUsuarios, MenuAdmin } from "../components/admin";

import { useAuthStore } from "../hooks"
import { Bienvenida } from "../components/Bienvenida";
import { ForgotPassword } from "../reset/pages/ForgotPassword";
import { ResetPassword } from "../reset/pages/ResetPassword";
import { LandingPage } from "../auth/pages/LandingPage";
import { RecoverMessageEmail } from "../auth/pages/RecoverMessageEmail";
import { CreditCardPage } from "../CreditCard/components/CreditCardPage";
import { AddPaymentMet } from '../auth/pages/AddPaymentMet';
import { LoadingPage } from "../LoadingPage";
import { Bienvenidaa } from '../components/Bienvenidaa';
import { MyPackages } from "../packages/components/MyPackages";
import { FirstStep } from "../packages/components/FirstStep";
import { TrackSteps } from "../packages/components/TrackSteps";
import { TrackPackage } from "../packages/components";
import { Inicio } from "../components/admin/Inicio";
import { EditStatusRep, MenuRepartidor, MyPackagesDeliveryMan } from "../components/repartidor";

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated';
  //Se ejecuta una única vez cuando carga por primera vez el componente la función checkAuthToken
  useEffect(() => {
    checkAuthToken();
  }, []);


  if (status === 'checking') {
    return (
      //TODO: ANIMACIÓN DE CARGA
      // <h3>Cargando...</h3>
      <LoadingPage />
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
        && (
          //Si no estoy autenticado
          <>
            {/* Auth   */}

            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/landing" element={<LandingPage />} />
            <Route path='/auth/confirm/*' element={<Bienvenida />} />
            {/* Forgot & Reset Password  */}
            <Route path="/auth/recover-email" element={<RecoverMessageEmail />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            {/* <Route path="/auth/reset-password/landing" element={ <LandingPage/> }/> */}
            <Route path="/auth/reset-password/*" element={<ResetPassword />} />

            {/* Otras rutas */}
            <Route path='/*' element={<Navigate to="/auth/login" />} />
          </>
        )
      }
      {
        (status === 'Cliente')
        && (
          <>
            <Route path="auth/pages/AddPaymentMet" element={<AddPaymentMet />} />
            <Route path="/" element={<Bienvenidaa />} />
            <Route path="/editar" element={<InicioApp />} />
            <Route path="/enviar-paquete" element={<TrackSteps />} />
            <Route path="/ver-paquete" element={<TrackPackage />} />
            <Route path="/mis-paquetes" element={<MyPackages />} />
            <Route path="/pago" element={<CreditCardPage />} />
            <Route path='/*' element={<Navigate to="/" />} />
            {/* <Route path='/auth/confirm/*' element={<Bienvenida />} />
              <Route path='/auth/confirm/:confirmationCode' element={<Bienvenida />} /> */}
          </>
        )
      }
      {
        (status === 'Administrador')
        &&
        (
          <>
            <Route path="/" element={<MenuAdmin />} />
            <Route path="/gestionUsuarios" element={<GestionarUsuarios />}  />
            <Route path="/*" element={<Navigate to="/" />} />
            
          </>
        )
      }
      {
        (status === 'Repartidor')
        &&
        (
          <>
            <Route path="/" element={<MenuRepartidor />} />
            <Route path="/gestionUsuarios" element={<GestionarUsuarios />}  />
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/myPackages" element={<MyPackagesDeliveryMan />} />
            <Route path="/editStatus" element={<EditStatusRep/>} />
          </>
        )
      }
      //TODO: AÑADIR PÁGINAS DEL ADMINISTRADOR Y DEL REPARTIDOR
    </Routes>
  )
}
