import { useMemo } from "react";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { useUserStore } from "../../../hooks";
import { COLUMNS } from './columns';
import Badge from 'react-bootstrap/Badge';
import { GlobalFilter } from "../GlobalFilter";
import { EditButton, Checkbox } from "./";
export const UserTable = () => {
    const { users, setActiveUser } = useUserStore();
    const tableColumns = useMemo(() => COLUMNS, []);
    const usersInfo = useMemo(() => users, []);

    //* Pasamos un objeto como referencia especificando columnas y filas
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        rows,
        prepareRow,
        // footerGroups,
        state,
        setGlobalFilter,
        preGlobalFilteredRows,
        selectedFlatRows, //Flat array of rows
        allColumns,
        getToggleHideAllColumnsProps,
    } = useTable(
        {
            columns: tableColumns,
            data: usersInfo
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        // (hooks) => {
        //     hooks.visibleColumns.push((columns) => {
        //         return [
        //             {
        //                 id: 'selection',
        //                 Header: ({ getToggleAllRowsSelectedProps }) => (
        //                     <EditButton {...getToggleAllRowsSelectedProps()} />
        //                 ),
        //                 Cell: ({ row }) => (
        //                     <EditButton {...row.getToggleRowSelectedProps()} />
        //                 )
        //             },
        //             ...columns
        //         ]
        //     });
        // }
    );

    const { globalFilter, pageIndex, pageSize } = state;
    // console.log(selectedFlatRows);
    // const count = preG

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div>
                <div>
                    <Checkbox {...getToggleHideAllColumnsProps()}
                    /> Toggle All
                </div>
                {/* De manera individual */}
                {
                    allColumns.map(column => (
                        <div key={column.id}>
                            <label>
                                <input type='checkbox' {...column.getToggleHiddenProps()} />
                                {column.Header}
                            </label>
                        </div>
                    ))
                }
            </div>
            <table className="table align-middle mb-0 bg-white" {...getTableProps()}>
                <thead className="bg-light">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {/* rows */}
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps({
                                onClick: () => { setActiveUser(row.original); }
                            })}>
                                {row.cells.map(cell => {
                                    // console.log(cell.render('Cell').props.cell.value);
                                    return (
                                        cell.render('Cell').props.cell.value === 'Active' ? <td>
                                            <Badge bg='success' pill className="d-inline badge-success">
                                                Active
                                            </Badge>
                                        </td> :
                                            cell.render('Cell').props.cell.value === undefined ?
                                                <td>
                                                    <EditButton/>
                                                </td>
                                                :
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}

                            </tr>
                        )
                    })}
                </tbody>
                {/* FOOTER */}
                {/* <tfoot>
                    {
                        footerGroups.map(footerGroup => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map(column => (
                                    <td {...column.getFooterProps}>{column.render('Footer')}</td>
                                ))}
                            </tr>
                        ))}
                </tfoot> */}
            </table>
            <div>
                <span>
                    Página {' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Ir a la página: {' '}
                    <input type='number' defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }}
                    />
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Mostrar {pageSize}
                            </option>
                        ))
                    }

                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Siguiente</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>

            </div>
        </>

    )
}
// TODO: AGREGAR STATUS Y ACCIONES
{/* className="badge badge-success rounded-pill d-inline" */ }
{/* <td>
<span>
    <Badge bg='success' pill className="d-inline badge-success">
        Active
    </Badge>
</span>
</td>
<td>
<button
    type="button"
    className="btn btn-link btn-rounded btn-sm fw-bold"
    data-mdb-ripple-color="dark"
>
    EDITAR
</button>
</td> */}
