import { memo } from "react";
import { useDrag } from "react-dnd";

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
  cursor: "move",
};

export const Box = memo(function Box({ name, type, onDrop }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "Test",
      item: { name, type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [name, type]
  );

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      style={{ ...style, opacity }}
      onDrop={(e) => {
        e.preventDefault();
        const itemName = e.dataTransfer.getData("name");
        const itemType = e.dataTransfer.getData("type");
        onDrop({ name: itemName, type: itemType });
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {name}
    </div>
  );
});
