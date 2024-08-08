
export const ColumnResizer = ({
    header,
}: {
    header: any;
}) => {
    if (header.column.getCanResize() === false) return <></>;

    return (
        <div
            {...{
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
                className: `absolute top-0 right-0 cursor-col-resize w-px top-1.5  h-[80%] bg-background rounded-full hover:bg-background hover:w-2`,
                style: {
                    userSelect: "none",
                    touchAction: "none",
                },
            }}
        />
    );
};