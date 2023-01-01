import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import sendiitApi from "../api/sendiitApi";
import { onAddNewUser, onDeleteUser, onLoadUsers, onSetActiveUser, onUpdateUser } from "../store";

export const useUserStore = () => {

    const { users, activeUser, isLoadingUsers, checking } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const setActiveUser = (currentUser) => {
        dispatch(onSetActiveUser(currentUser));
    };

    //Crear un nuevo repartidor
    const startSavingUser = async (deliveryMan) => {
        // console.log(deliveryMan);
        // //TODO: LLEGAR AL BACKEND
        try {
            if (deliveryMan._id) {
                //Actualizando
                await sendiitApi.put(`/user/${deliveryMan._id}`, deliveryMan);
                dispatch(onUpdateUser({...deliveryMan}));
                return;
            } else {
                //Creando
                // const { data } = await sendiitApi.post('/user/repartidores', currentUser);
                // // console.log(data.savedUser._id);
                // dispatch(onAddNewUser({ ...currentUser, _id: data.savedUser._id, user }));
                await sendiitApi.post('/user/repartidores/crear/email', deliveryMan);
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }
        // //Todo bien

    };

    const sendDeliveryManEmail = async(deliveryMan) => {
        try {
            // console.log(deliveryMan);
            await sendiitApi.post('/user/repartidores/crear/email', deliveryMan);
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }
    }

    const startDeletingUser = async(deliveryMan) => {
        //TODO: LLEGAR AL BACKEND
        try {
            const { id } = deliveryMan._id;
            console.log(deliveryMan);
            await sendiitApi.delete(`/user/repartidores/${deliveryMan._id}`);
            // dispatch(onDeleteUser());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
        }  
    };

    const startLoadingUsers = async (role='Repartidor') => {
        try {
            const { data } = await sendiitApi.post('/user/usuarios', {role});
            // const { creditUsers } = data;
            const { usuarios } = data;
            dispatch(onLoadUsers(usuarios));
        } catch (error) {
            console.log(error);
            console.log('Error cargando usuarios');
        }
    };

    const startStatusChange = async(deliveryManId) => {
        try {
            const { data } = await sendiitApi.post('user/repartidores/cambiar/status', { deliveryManId });
            console.log(data);
        } catch (error) {
            console.log(error);
            console.log('Error cambiando status del repartidor');
        }
    }

    return {
        //*Propiedades
        activeUser,
        users,
        isLoadingUsers,
        hasUserSelected: !!activeUser,
        checking,

        //*Métodos
        setActiveUser,
        // startDeletingUser,
        startLoadingUsers,
        startSavingUser,
        sendDeliveryManEmail,
        startDeletingUser,
        startStatusChange,
    }
};
