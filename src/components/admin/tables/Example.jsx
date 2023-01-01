import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { ContentCopy, Delete, Edit, AccountCircle, Send } from '@mui/icons-material';
import { Box, Button, IconButton, ListItemIcon, MenuItem, Tooltip, Typography, } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
//Import Material React Table Translations
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { useUiStore, useUserStore } from '../../../hooks';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';

//TODO: DIVIDIR LÓGICA Y RENDERIZAR AL HACER UNA OPERACIÓN DE ACTUALIZACIÓN O ELIMINACIÓN
export const Example = () => {
    const { users, startStatusChange } = useUserStore();
    const data = users;

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'name',
                header: 'Nombre',
            },
            {
                accessorKey: 'last_name',
                header: 'Apellidos',
            },
            {
                accessorKey: 'email',
                header: 'Correo',
                enableClickToCopy: true,
                muiTableBodyCellCopyButtonProps: {
                    fullWidth: true,
                    startIcon: <ContentCopy />,
                    sx: { justifyContent: 'flex-start' },
                },
            },
            {
                accessorKey: 'phone',
                header: 'Teléfono',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }) => (
                    <span>
                        {
                            cell.getValue() === 'Active'
                                ? <Button variant="contained" size='small' color="success" className='badge badge-success rounded-pill d-inline'>
                                    Activo
                                </Button>
                                :
                                <Button variant="contained" size='small' color="error" className='badge badge-success rounded-pill d-inline'>
                                    Inactivo
                                </Button>
                        }
                    </span>
                ),
            },
        ],
        [], //end
    );

    const [rowSelection, setRowSelection] = useState({});
    const { activeUser, setActiveUser, startDeletingUser, startSavingUser } = useUserStore();
    const { openNewUserModal, closeNewUserModal } = useUiStore();
    const [tableData, setTableData] = useState(() => data);

    const handleSaveRowEdits = (user) => {
        // console.log(user);
        setActiveUser(null);
        openNewUserModal();
    };

    const handleCancelRowEdits = () => {
        console.log('cancelar');
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    const handleStatusChange = async (deliveryManId, status, row) => {
        // console.log(deliveryManId);
        // console.log(status);
        await swalWithBootstrapButtons.fire({
            title: `¿Estás seguro que deseas actualizar el status de este repartidor a
            ${status==='Active' ? 'Inactivo' : 'Activo'}?`,
            icon: 'warning',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar status!',
            // denyButtonText: `No`,
            cancelButtonText: 'No, cancelar!',
            // reverseButtons: true,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                startStatusChange(deliveryManId);
                Swal.fire('Status actualizado!', '', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios', '', 'info')
            }
        });
        // tableData[row.index] = 
    };

    const handleDeleteRow = async (row) => {
        await swalWithBootstrapButtons.fire({
            title: '¿Estás seguro que deseas eliminar este repartidor?',
            text: 'No podrás revertir esta acción!',
            icon: 'warning',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, elimínala!',
            // denyButtonText: `No`,
            cancelButtonText: 'No, cancelar!',
            // reverseButtons: true,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                startDeletingUser(row.original);
                Swal.fire('Repartidor eliminado!', '', 'success');
                closeNewUserModal();
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios', '', 'info')
            }
        });
    };

    const handleEditRow = (row) => {
        setActiveUser(row.original);
        // startSavingUser(row.original);
        openNewUserModal();
    };
    //* csv
    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
    };
    const csvExporter = new ExportToCsv(csvOptions);

    const handleExportRows = (rows) => {
        if (rows) {
            csvExporter.generateCsv(rows.map((row) => row.original));
        }

    };

    const handleExportData = () => {
        csvExporter.generateCsv(data);
    };

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
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
            enableGrouping
            // enableEditing
            enablePinning
            enableRowActions
            // enableRowSelection
            // enableRowNumbers
            // rowNumberMode="static"
            enableSelectAll={false}
            positionToolbarAlertBanner="bottom"
            localization={MRT_Localization_ES}
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderDetailPanel={({ row }) => (
                <Box
                    sx={{
                        display: 'grid',
                        margin: 'auto',
                        gridTemplateColumns: '1fr 1fr',
                        width: '100%',
                    }}
                >
                    <Typography>Nombre: {row.original.name}</Typography>
                    <Typography>Apellidos: {row.original.last_name}</Typography>
                    <Typography>Correo: {row.original.email}</Typography>
                    <Typography>Teléfono: {row.original.phone}</Typography>
                </Box>
            )}
            // positionExpandColumn="last"
            positionActionsColumn='last'
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
            renderTopToolbarCustomActions={({ table }) => (
                <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                    <Button
                        color="secondary"
                        //TODO: ABRIR MODAL
                        onClick={handleSaveRowEdits}
                        variant="contained"
                    >
                        Dar de alta repartidor
                    </Button>
                    <Button
                        color="primary"
                        //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                        onClick={handleExportData}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                    >
                        Exportar Todo
                    </Button>
                    <Button
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        //export all rows, including from the next page, (still respects filtering and sorting)
                        onClick={() =>
                            handleExportRows(table.getPrePaginationRowModel().rows)
                        }
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                    >
                        Exportar filas
                    </Button>
                    <Button
                        disabled={table.getRowModel().rows.length === 0}
                        //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                        onClick={() => handleExportRows(table.getRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                    >
                        Export filas visibles
                    </Button>
                    <Button
                        disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        //only export selected rows
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                        variant="contained"
                    >
                        Exportar filas seleccionadas
                    </Button>
                    {/* <IconButton
                        onClick={() => {
                            window.print();
                        }}
                    >
                        <PrintIcon />
                    </IconButton> */}
                </Box>
            )}
            muiTableBodyCellProps={({ cell, row }) => ({
                onClick: (event) => {
                    if (cell.column.id === 'status') {
                        handleStatusChange(row.original._id, row.original.status, row);
                    }
                },
            })}
            renderRowActionMenuItems={({ closeMenu, row }) => [
                <MenuItem
                    key={0}
                    onClick={() => handleEditRow(row)}
                    sx={{ m: 0 }}
                >
                    <ListItemIcon >
                        <Edit />
                    </ListItemIcon>
                    Editar
                </MenuItem>,
                <MenuItem
                    key={1}
                    onClick={() => {
                        // View profile logic...
                        closeMenu();
                    }}
                    sx={{ m: 0 }}
                >
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    Ver Perfil
                </MenuItem>,
                <MenuItem
                    key={2}
                    onClick={() => {
                        // Send email logic...
                        closeMenu();
                    }}
                    sx={{ m: 0 }}
                >
                    <ListItemIcon>
                        <Send />
                    </ListItemIcon>
                    Enviar email
                </MenuItem>,
                <MenuItem
                    key={0}
                    onClick={() => handleDeleteRow(row)}
                    sx={{ m: 0 }}
                >
                    <ListItemIcon>
                        <Delete color='error'/>
                    </ListItemIcon>
                    Eliminar
                </MenuItem>,
            ]}
        // renderToolbarInternalActions={({ table }) => (
        //     <Box>
        //       {/* add custom button to print table  */}
        //       <IconButton
        //         onClick={() => {
        //           window.print();
        //         }}
        //       >
        //         <PrintIcon />
        //       </IconButton>
        //     </Box>
        //   )}
        />

    );
};


