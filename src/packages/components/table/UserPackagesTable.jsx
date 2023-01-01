import { useMemo, useState } from "react";
import { usePackageStore } from "../../../hooks";
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';

export const UserPackagesTable = () => {

    const { packages, setActivePackage } = usePackageStore();

    const onSelect = (rowOriginal) => {
        const newPackage = {
            ...rowOriginal
        }
        setActivePackage(newPackage);
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'descripcion',
                header: 'Descripcion',
                Cell: ({ cell }) => (
                    <>
                        <img src="../../../public/img/package.jfif" alt="paquete" className="w-50"/>
                        <br />
                        <br/>
                        <span><strong>
                            {cell.getValue().charAt(0).toUpperCase() + cell.getValue().slice(1)}
                        </strong></span>
                    </>
                ),
            },
            // {
            //     accessorKey: 'tamano',
            //     header: 'Tamaño',
            // },
            {
                accessorKey: 'estadoActual',
                header: 'Estado Actual',
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
            // },
        ],
        [], //end
    );

    const [rowSelection, setRowSelection] = useState({});

    return (
        <MaterialReactTable
            columns={columns}
            data={packages}
            getRowId={(row) => row.userId}
            state={{ rowSelection }}
            enableColumnFilterModes
            enableColumnOrdering
            enableEditing
            enablePinning
            enableRowActions
            enableColumnResizing
            enableSelectAll={false}
            localization={MRT_Localization_ES}
            positionActionsColumn='last'
            renderRowActions={({ row }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip arrow placement="right" title="Ver Detalles">
                        <Link
                            to="/ver-paquete"
                            // className='btn w-75 btn-primary-c text-center mb-4 mt-3'
                            onClick={() => onSelect(row.original)}
                        ><VisibilitySharpIcon></VisibilitySharpIcon></Link>
                    </Tooltip>
                </Box>
            )}
        />
    )
}
