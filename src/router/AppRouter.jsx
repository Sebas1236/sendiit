import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { InicioApp } from "../InicioApp";
import { LoginPage, RegisterPage } from '../auth'

import { useAuthStore } from "../hooks"
import { Bienvenida } from "../components/Bienvenida";
import { ForgotPassword } from "../reset/pages/ForgotPassword";
import { ResetPassword } from "../reset/pages/ResetPassword";
import { LandingPage } from "../auth/pages/LandingPage";
import { RecoverMessageEmail } from "../auth/pages/RecoverMessageEmail";


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
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            //Si no estoy autenticado
            <>
              {/* Auth   */}
              
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/landing" element={<LandingPage />} />
              <Route path='/auth/confirm/*' element={<Bienvenida />} />
              {/* Forgot & Reset Password  */}
              <Route path="/auth/recover-email" element={ <RecoverMessageEmail/> }/>
              <Route path="/auth/forgot-password" element={ <ForgotPassword/> }/>
              {/* <Route path="/auth/reset-password/landing" element={ <LandingPage/> }/> */}
              <Route path="/auth/reset-password/*" element={ <ResetPassword/> }/>
              {/* Otras rutas */}
              <Route path='/*' element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<InicioApp />} />
              <Route path='/*' element={<Navigate to="/" />} />
              {/* <Route path='/auth/confirm/*' element={<Bienvenida />} />
              <Route path='/auth/confirm/:confirmationCode' element={<Bienvenida />} /> */}
            </>
          )

      }


    </Routes>
  )
}
