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

  const [boxes] = useState([
    { name: "ONE1", type: ItemTypes.One },
    { name: "ONE2", type: ItemTypes.One },
    { name: "TWO", type: ItemTypes.Two },
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames((prevDroppedBoxNames) => {
        if (name) {
          return [...prevDroppedBoxNames, name];
        } else {
          return prevDroppedBoxNames;
        }
      });

      setDustbins((prevDustbins) => {
        return prevDustbins.map((dustbin, idx) => {
          if (idx === index) {
            return {
              ...dustbin,
              lastDroppedItem: item,
            };
          }
          return dustbin;
        });
      });
    },
    [droppedBoxNames, dustbins]
  );
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
          <Box name={name} type={type} key={index} />
        ))}
      </div>
    </div>
  );
});
