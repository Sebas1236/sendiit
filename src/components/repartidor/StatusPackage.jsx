import { FooterLanding, Navbar, } from '../../components';
import './EditStatusRep.css'
import { usePackageStore } from '../../hooks';
import { EditStatusRep } from './EditStatusRep';
import { useEffect } from 'react';
export const StatusPackage = () => {
    const { activePackage, setActivePackage } = usePackageStore();
    useEffect(() => {
        if (!activePackage) {
            setActivePackage(JSON.parse(window.localStorage.getItem('paqueteActivo')));
        }
    }, [activePackage])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            {activePackage && <EditStatusRep paquete={activePackage} />}
            <div className='row alturax'></div>
            <div className='row'>
                <FooterLanding />
            </div>
        </div>

    )
}
