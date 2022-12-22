import { useMemo } from "react";
import { useTable } from "react-table";
import { usePackageStore } from "../../../hooks";
import { COLUMNS } from './columns';

export const PackageTable = () => {
    const { packages } = usePackageStore();
    const tableColumns = useMemo(() => COLUMNS, []);
    const packageInfo = useMemo(() => packages, []);

    //* Pasamos un objeto como referencia especificando columnas y filas
    const tableInstance = useTable({
        columns: tableColumns,
        data: packageInfo,
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance;
    // console.log(packageInfo);
    return (
        <table {...getTableProps()}>
            <thead >
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
            </tfoot>
        </table>
    )
}
