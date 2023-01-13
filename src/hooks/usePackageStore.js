import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import sendiitApi from "../api/sendiitApi";
import { onSetActivePackage, onLoadPackages, onAddNewPackage, onPackageStatusChange } from "../store";

export const usePackageStore = () => {
    const { packages, activePackage, isLoadingPackages } = useSelector(state => state.package);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const setActivePackage = (paquete) => {
        dispatch(onSetActivePackage(paquete));
    };

    //Crear un nuevo paquete
    const startSavingPackage = async (packageInfo) => {
        //TODO: LLEGAR AL BACKEND
        try {
            if (packageInfo._id) {
                //Actualizando
                await sendiitApi.put(`/paquetes/${packageInfo._id}`, packageInfo);
                dispatch(onUpdateCard({ ...packageInfo, user }));
                return;
            } else {
                // console.log(packageInfo);
                // Creando
								console.log('Creando paquete');
								
								console.log(packageInfo);

                const { data } = await sendiitApi.post('/paquetes', packageInfo);
                console.log(data.result._id);
                dispatch(onAddNewPackage({ ...packageInfo, _id: data.result._id, user }));
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }
        //Todo bien

    };

    const startLoadingPackages = async () => {
        try {
            const { data } = await sendiitApi.get('/paquetes/cliente');
            const { paquetes } = data;
            // console.log(paquetes);
            dispatch(onLoadPackages(paquetes));
        } catch (error) {
            console.log(error);
            console.log('Error cargando paquetes');
        }
    };

    const startLoadingAllPackages = async() => {
        try {
            const { data } = await sendiitApi.get('/paquetes/');
            const { paquetes } = data;
            dispatch(onLoadPackages(paquetes));
        } catch (error) {
            console.log(error);
            console.log('Error cargando paquetes - Repartidor');
        }
    }

    const startHandlePackageStatus = async(paqueteID) => {
        try {
            console.log(paqueteID);
            const { data } = await sendiitApi.post('/paquetes/cambiar-status', { paqueteID });
            const { paquete } = data;
            console.log(paquete);
            dispatch( onPackageStatusChange(paquete) );

            return paquete;
        } catch (error) {
            console.log(error);
            console.log('Error cambiando status - Repartidor');
        }
    }

    return {
        //*Propiedades
        packages,
        activePackage,
        isLoadingPackages,
        hasPackageSelected: !!activePackage,
        //*Métodos
        setActivePackage,
        startLoadingPackages,
        startLoadingAllPackages,
        startSavingPackage,
        startHandlePackageStatus
    }

}