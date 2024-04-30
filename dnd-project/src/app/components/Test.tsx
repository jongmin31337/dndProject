import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 각 아이템을 나타내는 컴포넌트
const Item = ({ id, name, type, index, onDrop, isDropped }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  return <div ref={drag}>{name}</div>;
};

const Item2 = ({ id, name, type, index, onDrop, isDropped }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { id, index, sourceTarget: "item" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div
      ref={drag}
      style={{
        opacity,
        cursor: "move",
        border: "1px dashed black",
        padding: "0.5rem",
        margin: "0.5rem",
        backgroundColor: isDropped ? "lightgreen" : "lightgrey",
      }}
    >
      {name}
    </div>
  );
};

// 드랍 영역을 나타내는 컴포넌트
const DropZone = ({ id, onDrop, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ["item"],
    drop: (item, monitor) => {
      console.log("item", item);
      const draggedIndex = item.index;
      const targetIndex = id;

      onDrop(draggedIndex, targetIndex, "items", item.sourceTarget);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "lightblue";
  } else if (canDrop) {
    backgroundColor = "lightgreen";
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor,
        width: "200px",
        minHeight: "100px",
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      {children}
    </div>
  );
};

const DropZone2 = ({ id, onDrop, children, source }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ["item2"],
    drop: (item, monitor) => {
      const draggedIndex = item.index;
      const targetIndex = id;
      onDrop(draggedIndex, targetIndex, "boxItems2", item.sourceTarget);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "lightblue";
  } else if (canDrop) {
    backgroundColor = "lightgreen";
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor,
        width: "200px",
        minHeight: "100px",
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      {children}
    </div>
  );
};

// App 컴포넌트
const App = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "2칸자리 아이템",
      type: "item2",
      droppedZone: null,
      dropType: "dropItem",
    },
    {
      id: 2,
      name: "1칸짜리 아이템(1)",
      type: "item",
      droppedZone: null,
      dropType: "dropItem",
    },
    {
      id: 3,
      name: "1칸짜리 아이템(2)",
      type: "item",
      droppedZone: null,
      dropType: "dropItem",
    },
    {
      id: 4,
      name: "1칸짜리 아이템(3)",
      type: "item",
      droppedZone: null,
      dropType: "dropItem",
    },
    {
      id: 5,
      name: "1칸짜리 아이템(4)",
      type: "item",
      droppedZone: null,
      dropType: "dropItem",
    },
    {
      id: 6,
      name: "1칸짜리 아이템(5)",
      type: "item",
      droppedZone: null,
      dropType: "dropItem",
    },
  ]);

  const [boxItems, setBoxItems] = useState([
    {
      id: 1,
      name: "",
      type: "item2",
      droppedZone: null,
      dropType: "dropZoneItem",
    },
    {
      id: 2,
      name: "",
      type: "item",
      droppedZone: null,
      dropType: "dropZoneItem",
    },
    {
      id: 3,
      name: "",
      type: "item",
      droppedZone: null,
      dropType: "dropZoneItem",
    },
    {
      id: 4,
      name: "",
      type: "item",
      droppedZone: null,
      dropType: "dropZoneItem",
    },
    {
      id: 5,
      name: "",
      type: "item",
      droppedZone: null,
      dropType: "dropZoneItem",
    },
    {
      id: 6,
      name: "",
      type: "item",
      droppedZone: null,
      dropType: "dropZoneItem",
    },
  ]);

  const [boxItems2, setBoxItems2] = useState([
    { id: 1, name: "", type: "item2", droppedZone: null },
  ]);

  const handleDrop = (draggedIndex, targetIndex, itemType, sourceTarget) => {
    console.log("sourceTarget", sourceTarget);
    if (sourceTarget) {
      if (itemType === "boxItems2") {
        const copyBoxItems = [...boxItems2];
        copyBoxItems[targetIndex] = items[draggedIndex];
        setBoxItems2([...copyBoxItems]);
      } else {
        const copyBoxItems = [...boxItems];
        copyBoxItems[targetIndex] = items[draggedIndex];
        setBoxItems([...copyBoxItems]);
      }
    } else {
      console.log(itemType);
      console.log("hello~~");
      if (itemType === "boxItems2") {
      } else {
        const copyBoxItems = [...boxItems];
        const tempItems = boxItems[draggedIndex];
        copyBoxItems[draggedIndex] = copyBoxItems[targetIndex];
        copyBoxItems[targetIndex] = tempItems;
        setBoxItems([...copyBoxItems]);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ display: "flex" }}>
          {boxItems.map((item, index) => (
            <DropZone
              key={index}
              id={index}
              onDrop={handleDrop}
              source="DropZone"
            >
              <Item
                id={item.id}
                name={item.name}
                type={item.type}
                index={index}
              />
            </DropZone>
          ))}
          {boxItems2.map((item, index) => (
            <DropZone2
              key={index}
              id={index}
              onDrop={handleDrop}
              source="DropZone2"
            >
              <Item
                id={item.id}
                name={item.name}
                type={item.type}
                index={index}
              />
            </DropZone2>
          ))}
        </div>
        <div className="flex gap-5">
          {items.map((item, index) => (
            <Item2
              id={item.id}
              name={item.name}
              type={item.type}
              index={index}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
