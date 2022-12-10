// import './css/LoadingPage.css'
import './LoadingPage.css'

export const LoadingPage = () => {
    return(
        <div className="cuerpo">
             <div className="contenedor">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <p>Loading...</p>
            </div>
        </div>
    )
}