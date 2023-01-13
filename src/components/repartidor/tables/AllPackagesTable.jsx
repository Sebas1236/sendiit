import { useMemo, useState } from "react";
import { useAuthStore, usePackageStore } from "../../../hooks";
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const AllPackagesTable = () => {

    const { packages, setActivePackage } = usePackageStore();
    const { status } = useAuthStore();
    console.log(packages);

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'descripcion',
                header: 'Descripcion',
            },
            {
                accessorKey: 'tamano',
                header: 'Tamaño',
            },
            {
                accessorKey: 'estadoActual',
                header: 'Estado Actual',
                Cell: ({ cell }) => (
                    <span>
                        {
                            cell.getValue() === 'Desechado' ?
                                <Button style={{ textTransform: 'none' }} variant="contained" size='small' color="error" className='badge badge-success rounded-pill d-inline'>
                                    Desechado
                                </Button>
                                :
                                cell.getValue() === 'En almacén' ?
                                    <Button style={{ textTransform: 'none' }} variant="contained" size='small' className='badge badge-success rounded-pill d-inline '>
                                        {cell.getValue()}
                                    </Button>
                                    : <Button style={{ textTransform: 'none' }} variant="contained" size='small' color="success" className='badge badge-success rounded-pill d-inline'>
                                        {cell.getValue()}
                                    </Button>
                        }
                    </span>
                ),
            },
            {
                accessorKey: 'casilleroOrigen.ubicacion',
                header: 'Origen',
                Cell: ({ cell }) => (
                    <span>{cell.getValue().charAt(0).toUpperCase() + cell.getValue().slice(1)}</span>
                ),
            },
            {
                accessorKey: 'casilleroDestino.ubicacion',
                header: 'Destino',
                Cell: ({ cell }) => (
                    <span>{cell.getValue().charAt(0).toUpperCase() + cell.getValue().slice(1)}</span>
                ),
            },
            // {
            //     accessorKey: 'estadosFechas.porRecibir',
            //     header: '',
            //     Cell: ({ cell }) => (
            //         <span>Por recibir el {cell.getValue().slice(0, 10)}</span>
            //     ),
            // },
        ],
        [], //end
    );

    const [rowSelection, setRowSelection] = useState({});
    // console.log(packages);

    const onSelect = (paquete) => {
        setActivePackage(paquete);
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={packages}
            getRowId={(row) => row.userId}
            muiTableBodyRowProps={({ row }) => ({
                //implement row selection click events manually
                onClick: () =>
                    setRowSelection((prev) => ({
                        ...prev,
                        [row.id]: !prev[row.id],
                    })),
                selected: rowSelection[row.id],
                sx: {
                    cursor: 'pointer',
                },
            })}
            state={{ rowSelection }}
            enableColumnFilterModes
            enableColumnOrdering
            // enableEditing
            enablePinning
            enableRowActions
            enableColumnResizing
            // enableRowSelection
            // enableRowNumbers
            // rowNumberMode="static"
            enableSelectAll={false}
            localization={MRT_Localization_ES}
            // onEditingRowSave={handleSaveRowEdits}
            // onEditingRowCancel={handleCancelRowEdits}
            // renderRowActions={({ row, table }) => (
            //     <Box sx={{ display: 'flex', gap: '1rem' }}>
            //         <Tooltip arrow placement="left" title="Edit">
            //             {/* <IconButton onClick={() => table.setEditingRow(row)}> */}
            //             <IconButton onClick={() => handleEditRow(row)}>
            //                 <Edit />
            //             </IconButton>
            //         </Tooltip>
            //         <Tooltip arrow placement="right" title="Delete">
            //             <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            //                 <Delete />
            //             </IconButton>
            //         </Tooltip>
            //     </Box>
            // )}
            // renderTopToolbarCustomActions={() => (
            //     <Button
            //         color="secondary"
            //         onClick={handleSaveRowEdits}
            //         variant="contained"
            //     >
            //         Dar de alta repartidor
            //     </Button>
            // )}
            positionActionsColumn='last'
            renderRowActions={({ row }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip arrow placement="right" title="Ver Detalles">
                        <Link
                            to="/editar-paquete"
                            // className='btn w-75 btn-primary-c text-center mb-4 mt-3'
                            onClick={() => onSelect(row.original)}
                        ><VisibilitySharpIcon></VisibilitySharpIcon></Link>
                    </Tooltip>
                </Box>
            )}
            renderDetailPanel={({ row }) => (
                <Box
                    sx={{
                        display: 'flex',
                        // margin: 'auto',
                        // gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center',
                        // textAlign: 'center',
                        justifyContent: 'space-around',
                        // width: '100%',
                    }}
                >
                    <Typography>QR:</Typography>
                    <img
                        alt='codigoQR'
                        // style={{ borderRadius: '50%' }} 
                        src={row.original.qrOrigen} />
                </Box>
            )}
        />
    )
}
