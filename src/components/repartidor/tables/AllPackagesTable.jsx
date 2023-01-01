import { useMemo, useState } from "react";
import { usePackageStore } from "../../../hooks";
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

export const AllPackagesTable = () => {

    const { packages } = usePackageStore();

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
                // enableClickToCopy: true,
                // muiTableBodyCellCopyButtonProps: {
                //     fullWidth: true,
                //     startIcon: <ContentCopy />,
                //     sx: { justifyContent: 'flex-start' },
                // },
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
            {
                accessorKey: 'estadosFechas.porRecibir',
                header: '',
            },
        ],
        [], //end
    );

    const [rowSelection, setRowSelection] = useState({});
    // console.log(packages);

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
            enableEditing
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
        />
    )
}
