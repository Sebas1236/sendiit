import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import sendiitApi from "../api/sendiitApi";
import { onSetActivePackage, onLoadPackages, onAddNewPackage } from "../store";

export const usePackageStore = () => {
    const { packages, activePackage } = useSelector(state => state.package);
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
            console.log('Error cargando tarjetas');
        }
    };

    return {
        //*Propiedades
        packages,
        activePackage,
        hasPackageSelected: !!activePackage,
        //*Métodos
        setActivePackage,
        startLoadingPackages,
        startSavingPackage,
    }

}