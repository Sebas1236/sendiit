import { FooterLanding } from "../../components/FooterLanding"
import '../../css/FirstStepPage.css'
import '../../css/bienvenido.css'
import '../../css/colores.css'
import { Navbar } from "../../components";
import { useEffect } from "react";
import { usePackageStore } from "../../hooks";
import { Package } from "./Package";
import { PackageTable } from "./table/PackageTable";

export const MyPackages = () => {
    const { startLoadingPackages, packages, setActivePackage } = usePackageStore();
    useEffect(() => {
        console.log(packages);
        startLoadingPackages();
    }, []);

//TODO: ACTUALIZAR RUTA (SACAR DEL BACKEND)
    return (

        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            <div className="row text-center mt-5">
                <h1>Mis paquetes</h1>
            </div>
            
            <div className='row p-2 mt-3 mb-5 blanc anchox m-auto rounded-3'>
                {
                    packages.map(paquete => (
                        <Package key={paquete._id} paquete={paquete}/>
                    ))
                }

            </div>
            {/* <div className='row p-2 mt-3 mb-5 blanc anchox m-auto rounded-3'>
                <PackageTable/>
            </div> */}
            
            {/* <div className='row p-2 mt-3 mb-5 blanc anchox m-auto rounded-3'>
                <Package estado="En locker origen" descripcion="Guirnalda navidad" ruta="Origen: Santa Fe. Destino: Satélite"/>
                <Package estado="Por recibir" descripcion="Documentos de oficina" ruta="Origen: Coyoacán. Destino: Del Valle"/>
            </div> */}
            <div className="alturax"></div>
            <div className='row mt-5s'>
                <FooterLanding />
            </div>

        </div>


    )
}