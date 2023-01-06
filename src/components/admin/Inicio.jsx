import React from 'react'
import { useEffect } from 'react'
import { useUserStore } from '../../hooks'
import { FooterLanding } from '../FooterLanding'
import { Navbar } from '../Navbar'
import { NewUserModal } from './NewUserModal'
import { Example } from './tables/Example'
import { UserTable } from './tables/UserTable'

export const Inicio = ({userRole}) => {

    const { startLoadingUsers, isLoadingUsers } = useUserStore();
    console.log(userRole);

    useEffect(() => {
        startLoadingUsers(userRole);
    }, []);

    return (
        <>
            <Navbar />
            {/* {!isLoadingUsers && <UserTable/>} */}
            {!isLoadingUsers && userRole==='Repartidor' ? <Example/> : <UserTable/>}
            <NewUserModal/>
            <FooterLanding />
        </>
    )
}
