import { NavLink } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import RouteIcon from '@mui/icons-material/Route';
import Button from '@mui/material/Button';
import { Icon } from "@mui/material";

export const Navbar = () => {
    const { startLogout, user, status } = useAuthStore();
    const styles = "active";
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg margen0 navbar-dark ">
                <a className="navbar-brand" href="/auth/landing">
                    <img src="/img/brand/logo_sendiit-light.png" alt="Logo" height="35" className="d-inline-block align-text-top ms-5" />
                    {/* <img src="/img/brand/logoblanco.png" alt="Logo" width="150" height="50" className="d-inline-block align-text-top ms-5" /> */}
                </a>
                <button className="navbar-toggler me-3 mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse fs-5" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {
                            status === 'Repartidor' &&
                            (
                                <>
                                    <li className="nav-item text-end">

                                        <NavLink
                                            exact="true"
                                            to="/ver-rutas"
                                            className="nav-link"
                                            children={({ isActive }) => (
                                                isActive
                                                    ?
                                                    <>
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i class="fa-solid fa-route" data-title="Ver rutas"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i class="fa-solid fa-route" data-title="Ver rutas"></i>
                                            )}
                                        />

                                    </li>

                                    <li className="nav-item text-end">

                                        <NavLink
                                            exact="true"
                                            to="/ver-paquetes"
                                            className="nav-link"
                                            children={({ isActive }) => (
                                                isActive
                                                    ?
                                                    <>
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i class="fa-solid fa-box" data-title="Ver paquetes"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i class="fa-solid fa-box" data-title="Ver paquetes"></i>
                                            )}
                                        />

                                    </li>
                                </>
                            )
                        }
                        {
                            status === 'Cliente'
                            && (
                                <>
                                    <li className="nav-item text-end">
                                        <NavLink
                                            exact="true"
                                            to="/enviar-paquete"
                                            className="nav-link"
                                            children={({ isActive }) => (
                                                isActive
                                                    ?
                                                    <>
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i className="fa-regular fa-paper-plane"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i className="fa-regular fa-paper-plane"></i>
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
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i className="fa-solid fa-boxes-packing"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i className="fa-solid fa-boxes-packing"></i>
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
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i className="fa-regular fa-credit-card"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i className="fa-regular fa-credit-card"></i>
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
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i className="fa-regular fa-user"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i className="fa-regular fa-user"></i>
                                            )}
                                        />

                                    </li>
                                </>
                            )
                        }
                        {
                            status === 'Administrador'
                            && (
                                <>
                                    <li className="nav-item text-end">

                                        <NavLink
                                            // exact="true"
                                            to="/gestionUsuarios"
                                            className="nav-link"
                                            children={({ isActive }) => (
                                                isActive
                                                    ?
                                                    <>
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i className="fa-solid fa-users" data-title="Gestionar usuarios"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i className="fa-solid fa-users" data-title="Gestionar usuarios"></i>
                                            )}
                                        />

                                    </li>

                                    <li className="nav-item text-end">
                                        <NavLink
                                            exact="true"
                                            className="nav-link"
                                            children={() => (
                                                <i className="fa-solid fa-chart-pie" data-title="Estadisticas"></i>
                                            )}
                                        />

                                    </li>
                                    <li className="nav-item text-end">
                                        <NavLink
                                            exact="true"
                                            className="nav-link"
                                            children={() => (
                                                <i className="fa-solid fa-building" data-title="Gestionar lockers"></i>
                                            )}
                                        />

                                    </li>
                                    <li className="nav-item text-end">

                                        <NavLink
                                            exact="true"
                                            to="/ver-paquetes"
                                            className="nav-link"
                                            children={({ isActive }) => (
                                                isActive
                                                    ?
                                                    <>
                                                        <div style={{ color: "#f9d950" }}>
                                                            <i class="fa-solid fa-box" data-title="Ver paquetes"></i>
                                                        </div>
                                                    </>
                                                    :
                                                    <i class="fa-solid fa-box" data-title="Ver paquetes"></i>
                                            )}
                                        />

                                    </li>
                                </>
                            )
                        }
                        <li className="nav-item text-end">
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

