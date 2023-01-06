import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import '../css/navbar.css'

export const Navbar = () => {
    const { startLogout, user } = useAuthStore();
    const styles = "active";
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg margen0 navbar-dark ">
                <a className="navbar-brand" href="/auth/landing">
                    {/* <img src="/img/brand/logo_sendiit-light.png" alt="Logo" height="30" className="d-inline-block align-text-top ms-5" /> */}
                    <img src="/img/brand/logoblanco.png" alt="Logo" width="150" height="50" className="d-inline-block align-text-top ms-5" />
                </a>
                <button className="navbar-toggler me-3 mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse fs-5" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item text-end">
                            <NavLink
                                exact="true"
                                to="/enviar-paquete"
                                className="nav-link"
                                children={({ isActive }) => (
                                    isActive
                                        ?
                                        <>
                                            <div className="active">
                                                <i className="fa-regular fa-paper-plane" data-title="Enviar paquete"></i>
                                            </div>
                                        </>
                                        :
                                        <i className="fa-regular fa-paper-plane" data-title="Enviar paquete"></i>
                                )}
                            />
                        </li>
                        <li className="nav-item text-end">
                            <NavLink
                                exact="true"
                                to="/mis-paquetes"
                                className="nav-link"
                                children={({ isActive }) => (
                                    isActive
                                        ?
                                        <>
                                            <div className="active">
                                                <i className="fa-solid fa-boxes-packing" data-title="Ver mis paquetes"></i>
                                            </div>
                                        </>
                                        :
                                        <i className="fa-solid fa-boxes-packing" data-title="Ver mis paquetes"></i>
                                )}
                            />
                        </li>
                        <li className="nav-item text-end">

                            <NavLink
                                exact="true"
                                to="/pago"
                                className="nav-link"
                                children={({ isActive }) => (
                                    isActive
                                        ?
                                        <>
                                            <div className="active">
                                                <i className="fa-regular fa-credit-card" data-title="Administrar metodos de pago"></i>
                                            </div>
                                        </>
                                        :
                                        <i className="fa-regular fa-credit-card" data-title="Administrar metodos de pago"></i>
                                )}
                            />
                        </li>
                        <li className="nav-item text-end">
                            {/* <a className="nav-link" href="/editar"><i className="fa-regular fa-user"></i></a> */}
                            <NavLink
                                exact="true"
                                to="/editar"
                                className="nav-link"
                                children={({ isActive }) => (
                                    isActive
                                        ?
                                        <>
                                            <div className="active">
                                                <i className="fa-regular fa-user"  data-title="Ver mi cuenta"></i>
                                            </div>
                                        </>
                                        :
                                        <i className="fa-regular fa-user" data-title="Ver mi cuenta"></i>
                                )}
                            />

                        </li>
                        <li className="nav-item ">
                            <button
                                className="nav-link blue float-end"
                                style={{ color: '#212e46' }}
                                onClick={startLogout}
                            ><i className="fa-solid fa-right-from-bracket rojo" data-title="Salir"></i></button>
                        </li>


                    </ul>

                </div>
            </nav>
        </div>
    )
}

