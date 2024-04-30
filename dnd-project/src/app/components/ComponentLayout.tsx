import { memo, useCallback, useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";

const ItemTypes = {
  One: "one",
  Two: "two",
  PAPER: "paper",
};

export const ComponentLayout = memo(function Container() {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.One], lastDroppedItem: null },
    { accepts: [ItemTypes.One], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.Two, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ]);

  const [boxes, setBoxes] = useState([
    { name: "ONE1", type: ItemTypes.One },
    { name: "ONE2", type: ItemTypes.One },
    { name: "TWO", type: ItemTypes.Two },
  ]);

  const handleDrop = useCallback((index, item) => {
    setDustbins((prevDustbins) => {
      const newDustbins = [...prevDustbins];
      newDustbins[index].lastDroppedItem = item;
      return newDustbins;
    });

    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes];
      const droppedBox = newBoxes.find((box) => box.name === item.name);
      const droppedBoxIndex = newBoxes.indexOf(droppedBox);
      const prevDroppedItem = newBoxes[index];
      newBoxes[index] = droppedBox;
      newBoxes[droppedBoxIndex] = prevDroppedItem;
      return newBoxes;
    });
  }, []);

  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: "hidden", clear: "both" }}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            key={index}
            onDrop={(item) => handleDrop(index, item)}
          />
        ))}
      </div>
    </div>
  );
});
