import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { InicioApp } from "../InicioApp";
import { LoginPage, RegisterPage } from '../auth'

import { useAuthStore } from "../hooks"

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated';
  //Se ejecuta una única vez cuando carga por primera vez el componente la función checkAuthToken
  useEffect(() => {
    checkAuthToken();
  }, []);


  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path='/*' element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<InicioApp />} />
              <Route path='/*' element={<Navigate to="/" />} />
            </>
          )

      }


    </Routes>
  )
}
