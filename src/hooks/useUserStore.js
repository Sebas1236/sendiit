import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import sendiitApi from "../api/sendiitApi";
import { onAddNewUser, onDeleteUser, onLoadUsers, onSetActiveUser, onUpdateUser } from "../store";

export const useUserStore = () => {

    const { users, activeUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    // const setActiveUser = (paymentUser) => {
    //     dispatch(onSetActiveUser(paymentUser));
    // };

    //Crear una nueva tarjeta
    // const startSavingUser = async (paymentUser) => {
    //     //TODO: LLEGAR AL BACKEND
    //     try {
    //         if (paymentUser._id) {
    //             //Actualizando
    //             await sendiitApi.put(`/users/${paymentUser._id}`, paymentUser);
    //             dispatch(onUpdateUser({ ...paymentUser, user }));
    //             return;
    //         } else {
    //             //Creando
    //             const { data } = await sendiitApi.post('/users', paymentUser);
    //             // console.log(data.savedUser._id);
    //             dispatch(onAddNewUser({ ...paymentUser, _id: data.savedUser._id, user }));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    //     }
    //     //Todo bien

    // };

    // const startDeletingUser = async() => {
    //     //TODO: LLEGAR AL BACKEND
    //     try {
    //         await sendiitApi.delete(`/users/${activeUser._id}`);
    //         dispatch(onDeleteUser());
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    //     }
        
    // };

    const startLoadingUsers = async () => {
        try {
            const { data } = await sendiitApi.get('/users');
            const { creditUsers } = data;
            dispatch(onLoadUsers(creditUsers));
        } catch (error) {
            console.log(error);
            console.log('Error cargando tarjetas');
        }
    };

    return {
        //*Propiedades
        activeUser,
        users,
        hasUserSelected: !!activeUser,

        //*Métodos
        // setActiveUser,
        // startDeletingUser,
        startLoadingUsers,
        // startSavingUser,
    }
};
