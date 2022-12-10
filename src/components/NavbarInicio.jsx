import { useAuthStore } from "../hooks/useAuthStore";


export const NavbarInicio = () => {
    const { startLogout, user } = useAuthStore();
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg margen0 navbar-dark ">
              
                    <a className="navbar-brand" href="/auth/landing"> 
                        <img src="/img/brand/logoblanco.png" alt="Logo" width="150" height="50" className="d-inline-block align-text-top ms-5"/>
                    </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse fs-5" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/auth/landing">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/auth/login">Iniciar Sesión</a>
                    </li>
                </ul>
                
                </div>
            </nav>
        </div>
    )
}