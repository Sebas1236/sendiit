import React from 'react'
import { useEffect } from 'react'
import { useUserStore } from '../../hooks'
import { FooterLanding } from '../FooterLanding'
import { Navbar } from '../Navbar'
import { UserTable } from './tables/UserTable'

export const Inicio = () => {

    const { startLoadingUsers, isLoadingUsers } = useUserStore();

    useEffect(() => {
        const role = 'Cliente';
        startLoadingUsers(role);
    }, [])


    return (
        <>
            <Navbar />
            {!isLoadingUsers && <UserTable/>}
            
            {/* <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Estadísticas</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Gestionar usuarios</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Gestionar lockers</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div> */}
            <FooterLanding />
        </>
    )
}
