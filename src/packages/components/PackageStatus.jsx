import { usePackageStore } from '../../hooks';

export const PackageStatus = () => {
    const { activePackage } = usePackageStore();
    const estadosSize = Object.keys(activePackage.estadosFechas).length;
    console.log(activePackage);
    return (
        <ul>
            {
                estadosSize === 7 &&
                (
                    <>
                        <li>
                            <p className='title active'>Por recibir</p>
                            <p>{activePackage.estadosFechas.porRecibir.slice(0, 10)}</p>
                            {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'> En espera</p>
                            {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En camino</p>
                            {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En locker</p>
                            <p>{activePackage.estadosFechas.enLockerDeDestino.slice(0, 10)}</p>
                        </li>
                        <li>
                            <p className='title inactive'>Recogido</p>
                            <p>El paquete no fue recogido</p>
                            {/* <p>{activePackage.estadosFechas.recogido.slice(0, 10)}</p> */}
                        </li>
                        <li>
                            <p className='title active'>En almacén</p>
                            <p>{activePackage.estadosFechas.enAlmacen.slice(0, 10)}</p>
                        </li>
                        <li>
                            <p className='title active'>Desechado</p>
                        </li>
                    </>
                )
            }
            {
                estadosSize === 1 &&
                (
                    <>
                        <li>
                            <p className='title active'>Por recibir</p>
                            <p>{activePackage.estadosFechas.porRecibir.slice(0, 10)}</p>
                            {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title'> En espera</p>
                            {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title'>En camino</p>
                            {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title'>En locker</p>
                        </li>
                        <li>
                            <p className='title'>Recogido</p>
                        </li>
                    </>
                )
            }
            {
                estadosSize == 2 &&
                (
                    <>
                        <li>
                            <p className='title active'>Por recibir</p>
                            <p>{activePackage.estadosFechas.porRecibir.slice(0, 10)}</p>
                            {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'> En espera de recolección</p>
                            {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title'>En camino</p>
                            {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title'>En locker</p>
                            {/* <p>{activePackage.estadosFechas.enLockerDeDestino.slice(0, 10)}</p> */}
                        </li>
                        <li>
                            <p className='title'>Recogido</p>
                            {/* <p>{activePackage.estadosFechas.recogido.slice(0, 10)}</p> */}
                        </li>
                    </>
                )
            }
            {
                estadosSize == 3 &&
                (
                    <>
                        <li>
                            <p className='title active'>Por recibir</p>
                            <p>{activePackage.estadosFechas.porRecibir.slice(0, 10)}</p>
                            {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'> En espera</p>
                            {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En camino</p>
                            {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title'>En locker</p>
                        </li>
                        <li>
                            <p className='title'>Recogido</p>
                        </li>
                    </>
                )
            }
            {
                estadosSize == 4 &&
                (
                    <>
                        <li>
                            <p className='title active'>Por recibir</p>
                            <p>{activePackage.estadosFechas.porRecibir.slice(0, 10)}</p>
                            {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'> En espera</p>
                            {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En camino</p>
                            {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En locker</p>
                            <p>{activePackage.estadosFechas.enLockerDeDestino.slice(0, 10)}</p>
                        </li>
                        <li>
                            <p className='title'>Recogido</p>
                        </li>
                    </>
                )
            }
            {
                estadosSize == 5 &&
                (
                    <>
                        <li>
                            <p className='title active'>Por recibir</p>
                            <p>{activePackage.estadosFechas.porRecibir.slice(0, 10)}</p>
                            {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'> En espera</p>
                            {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En camino</p>
                            {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En locker</p>
                            <p>{activePackage.estadosFechas.enLockerDeDestino.slice(0, 10)}</p>
                        </li>
                        <li>
                            <p>{activePackage.estadosFechas.recogido.slice(0, 10)}</p>
                            <p className='title active'>Recogido</p>
                        </li>
                    </>
                )
            }
            {
                estadosSize == 6 &&
                (
                    <>
                        <li>
                            <p className='title active'>Por recibir</p>
                            <p>{activePackage.estadosFechas.porRecibir.slice(0, 10)}</p>
                            {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'> En espera</p>
                            {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En camino</p>
                            {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                        </li>
                        <li>
                            <p className='title active'>En locker</p>
                            <p>{activePackage.estadosFechas.enLockerDeDestino.slice(0, 10)}</p>
                        </li>
                        <li>
                            <p className='title active'>Recogido</p>
                            <p>{activePackage.estadosFechas.recogido.slice(0, 10)}</p>
                        </li>
                        <li>
                            <p className='title active'>En almacén</p>
                            <p>{activePackage.estadosFechas.enAlmacen.slice(0, 10)}</p>
                        </li>
                        <li>
                            <p className='title'>Desechado</p>
                        </li>
                    </>
                )
            }
        </ul>
    )
}
