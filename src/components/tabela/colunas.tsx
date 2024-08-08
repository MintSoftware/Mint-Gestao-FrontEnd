import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { Header, flexRender, Column, ColumnDef } from "@tanstack/react-table";
import { TableHead, TableCell } from "../ui/table"; // Importações dos seus componentes de UI
import { ColumnResizer } from './resizer';

interface DraggableColProps<TData, TValue> {
    col: Column<TData, unknown>;
    header: Header<TData, unknown>;
    columnOrder: { id: string; index: number }[];
    columns: ColumnDef<TData, TValue>[];
    setColumns: (newColumns: ColumnDef<TData, TValue>[]) => void;
}

const DraggableCol = <TData, TValue>({ col, header, columnOrder, columns, setColumns }: DraggableColProps<TData, TValue>) => {
    const reorderCol = (draggedColIndex: number, targetColIndex: number) => {
        const newColumns = [...columns];
        const [draggedCol] = newColumns.splice(draggedColIndex, 1);
        newColumns.splice(targetColIndex, 0, draggedCol);
        setColumns(newColumns);
    };

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedCol: { id: string }) => {
            const draggedColIndex = columnOrder.findIndex((x) => x.id === draggedCol.id);
            const targetColIndex = columnOrder.findIndex((x) => x.id === col.id);
            reorderCol(draggedColIndex, targetColIndex);
        },
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        type: 'column',
        item: { id: col.id },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <TableHead
            ref={previewRef}
            className={`relative ${isDragging ? 'opacity-50' : 'opacity-100'}`}
            style={{ width: header.getSize() }}
        >
            <TableCell ref={dropRef}>
                <div ref={dragRef} className="cursor-move">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
            </TableCell>
            <ColumnResizer header={header} />
        </TableHead>
    );
};

export { DraggableCol };