import { FooterLanding } from "../../components/FooterLanding"
import '../../css/FirstStepPage.css'
import '../../css/bienvenido.css'
import '../../css/colores.css'
import { Navbar } from "../../components";
import { useEffect } from "react";
import { usePackageStore } from "../../hooks";
import { Package } from "./Package";
import { PackageTable } from "./table/PackageTable";
import { UserPackagesTable } from "./table/UserPackagesTable";

export const MyPackages = () => {
    const { startLoadingPackages, packages, isLoadingPackages } = usePackageStore();
    useEffect(() => {
        // console.log(packages);
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
                {
                    !isLoadingPackages && <UserPackagesTable/>
                }
            </div>
            <div className="alturax"></div>
            <div className='row mt-5s'>
                <FooterLanding />
            </div>

        </div>


    )
}