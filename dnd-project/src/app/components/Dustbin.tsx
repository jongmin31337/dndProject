import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};
export const Dustbin = memo(function Dustbin({
  accept,
  lastDroppedItem,
  onDrop,
  key,
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "Test",
      item: { lastDroppedItem },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        console.log(item);
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          //moveCard(droppedId, originalIndex);
        }
      },
    }),
    [lastDroppedItem]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ ...style, backgroundColor }}
      data-testid="dustbin"
    >
      {isActive
        ? "Release to drop"
        : `This dustbin accepts: ${accept.join(", ")}`}

      {lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )}
    </div>
  );
});
