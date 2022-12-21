import { useAuthStore } from "../hooks/useAuthStore";


export const NavbarLanding = () => {
    const { startLogout, user } = useAuthStore();
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg margen0 navbar-dark ">
              
                    <a className="navbar-brand">
                        <img src="/img/brand/logo_sendiit-light.png" alt="Logo" height="30" className="d-inline-block align-text-top ms-5"/>
                    </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse fs-5" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#nosotros">Nosotros</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#sucursales">Sucursales</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="login">Iniciar Sesión</a>
                    </li>
                </ul>
                
                </div>
            </nav>
        </div>
    )
}