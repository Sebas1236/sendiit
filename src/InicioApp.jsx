import { Footer, Navbar } from "./components";
import { useAuthStore } from "./hooks";


export const InicioApp = () => {

    const { user } = useAuthStore();

    return (
        <>
            <Navbar />
            <h1>Bienvenido { user.name }</h1>
            <Footer />
        </>
    )
}
