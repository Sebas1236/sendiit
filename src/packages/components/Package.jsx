import { Link } from "react-router-dom";
import { usePackageStore } from "../../hooks"

export const Package = ({ paquete }) => {

    const { setActivePackage } = usePackageStore();

    const onSelect = (paquete) => {
        console.log({ paquete });
        setActivePackage(paquete);
    }

    return (
        <div className="container-fluid">
            <div className="row mt-4 mb-1">
                <div className="col-3">
                    <div className="w-50 m-auto">
                        <img src="../../public/img/package.jfif" alt="paquete" className="w-100" />
                    </div>

                </div>
                <div className="col-6">
                    <p>
                        <span className="fw-bold">Descripción: {paquete.descripcion}</span>
                    </p>
                    <p>{paquete.estado}</p>
                    <p>"Santa Fe - Satélite"</p>
                </div>

                <div className="col-3">
                    <Link 
                        to="/ver-paquete" 
                        className='btn w-75 btn-primary-c text-center mb-4 mt-3'
                        onClick={()=>onSelect(paquete)}
                    >Ver estado</Link>
                    {/* <button
                        className="btn w-75 btn-primary-c text-center mb-4 mt-3"
                        onClick={()=>onSelect(paquete)}

                    >
                        Ver Estado
                    </button> */}
                </div>


            </div>
        </div>
    )
}
