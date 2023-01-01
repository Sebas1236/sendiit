import { useAuthStore, usePackageStore, usePlacesStore } from '../../hooks'
import { FooterLanding, Navbar } from '../';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import RouteIcon from '@mui/icons-material/Route';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export const MenuRepartidor = () => {

    const { user } = useAuthStore();

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            <h3>Bienvenido {user.name}</h3>
            <Stack direction="row" spacing={2}>
                <NavLink
                    exact="true"
                    to="/ver-rutas"
                    className="nav-link"
                    children={({ isActive }) => (
                        isActive
                            ?
                            <Button variant="outlined" startIcon={<RouteIcon />}>
                                Ver rutas
                            </Button>
                            :
                            <Button variant="outlined" startIcon={<RouteIcon />}>
                                Ver rutas
                            </Button>
                    )}
                />
                <NavLink
                    exact="true"
                    to="/ver-paquetes"
                    className="nav-link"
                    children={({ isActive }) => (
                        isActive
                            ?
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Ver paquetes
                            </Button>
                            :
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Ver paquetes
                            </Button>
                    )}
                />
            </Stack>
            <div className='row'>
                <FooterLanding />
            </div>

        </div>
    )
}
