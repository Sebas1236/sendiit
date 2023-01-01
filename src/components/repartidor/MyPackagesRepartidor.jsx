import { useEffect } from "react";
import { FooterLanding, Navbar } from "../";
import { usePackageStore } from "../../hooks";
import { AllPackagesTable } from "./";

export const MyPackagesRepartidor = () => {

    const { startLoadingAllPackages, isLoadingPackages,  } = usePackageStore();
    useEffect(() => {
        startLoadingAllPackages();
    }, []);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            <div>
                {
                    !isLoadingPackages && <AllPackagesTable/>
                }
            </div>
            <div className='row'>
                <FooterLanding />
            </div>

        </div>
    )
}
