import { useAuthStore } from "../hooks/useAuthStore";


export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark mb-4 px-4" style={{ backgroundColor: "#212e46" }}>
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;

      </span>
      <button
        className="btn btn-outline-danger"
        onClick={startLogout}
      >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  )
}