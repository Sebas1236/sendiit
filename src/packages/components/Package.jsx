import { Link } from "react-router-dom";
import { usePackageStore } from "../../hooks"
import { PackageTable } from "./table/PackageTable";

export const Package = ({ paquete }) => {

    const { setActivePackage } = usePackageStore();

    const onSelect = (paquete) => {
        console.log({ paquete });
        setActivePackage(paquete);
    }

    return (
        // <PackageTable/>
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
                    <p>Estado: {paquete.estadoActual}</p>
                    <p>Origen: {paquete.casilleroOrigen.ubicacion.charAt(0).toUpperCase()+paquete.casilleroOrigen.ubicacion.slice(1)} Destino: {paquete.casilleroDestino.ubicacion.charAt(0).toUpperCase()+paquete.casilleroDestino.ubicacion.slice(1)}
                    </p>
                </div>

                <div className="col-3">
                    <Link 
                        to="/ver-paquete" 
                        className='btn w-75 btn-primary-c text-center mb-4 mt-3'
                        onClick={()=>onSelect(paquete)}
                    >Ver Detalles</Link>
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
