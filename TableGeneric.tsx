"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";

type TableProps<T> = {
    columns: ColumnDef<T>[];
    data: T[];
    title?: string
};

export function TableGeneric<T>({ columns, data, title }: TableProps<T>) {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="w-full border-collapse">
                        <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-left border-b px-2 py-1 font-semibold"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>

                        <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-b font-light">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-2 py-1">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </>
    );
}