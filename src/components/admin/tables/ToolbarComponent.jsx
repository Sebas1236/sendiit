import React, { useReducer, useRef, useState } from 'react';
import MaterialReactTable, {
    MRT_FullScreenToggleButton,
    MRT_GlobalFilterTextField,
    MRT_ShowHideColumnsButton,
    MRT_TablePagination,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFiltersButton,
    MRT_ToolbarAlertBanner,
} from 'material-react-table';
import {
    alpha,
    Box,
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

export const ToolbarComponent = () => {
    return (
        <Toolbar
            sx={(theme) => ({
                backgroundColor: alpha(theme.palette.secondary.light, 0.2),
                borderRadius: '4px',
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    lg: 'row',
                },
                gap: '1rem',
                justifyContent: 'space-between',
                p: '1.5rem 0',
            })}
        >
            <Box>
                <Button
                    color="primary"
                    onClick={() => {
                        alert('Add User');
                    }}
                    variant="contained"
                >
                    Crete New Account
                </Button>
            </Box>
            <MRT_GlobalFilterTextField table={tableInstanceRef.current} />
            <Box>
                <MRT_ToggleFiltersButton table={tableInstanceRef.current} />
                <MRT_ShowHideColumnsButton table={tableInstanceRef.current} />
                <MRT_ToggleDensePaddingButton table={tableInstanceRef.current} />
                <Tooltip arrow title="Print">
                    <IconButton onClick={() => window.print()}>
                        <PrintIcon />
                    </IconButton>
                </Tooltip>
                <MRT_FullScreenToggleButton table={tableInstanceRef.current} />
            </Box>
        </Toolbar>
    )
}
