import Image from "next/image";
import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragUpdate,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

type Item = {
  id: string;
  content: React.FC;
  isActive: boolean;
  xSize: number;
  ySize: number;
};

const KioskClassName = (isDraggingOver: boolean) => {
  return isDraggingOver
    ? "absolute top-0 right-0 bottom-0 w-[500px] border border-dashed border-black bg-white p-2 rounded-md flex-shrink-0 w-40 font-sans"
    : "absolute top-0 right-0 bottom-0 w-[500px] border border-solid border-black bg-white p-2 rounded-md flex-shrink-0 w-40 font-sans";
};

const Item: React.FC<Item> = ({ item }: any) => {
  return (
    <div
      style={{
        background: item.isActive ? "#f0f0f0" : "#fff",
        userSelect: item.isActive ? "none" : "auto",
      }}
    >
      {item.content}
    </div>
  );
};

const Clone: React.FC<Item> = ({ item }: any) => {
  return (
    <div
      style={{
        userSelect: item.isActive ? "none" : "auto",
        display: "block !important",
      }}
    >
      {item.content}
    </div>
  );
};

const ItemUI: React.FC<any> = (index: number) => {
  if (index === 0) {
    return <Image src="/11.jpeg" width={350} height={350} alt="hi" />;
  } else if (index === 1) {
    return <Image src="/22.png" width={350} height={350} alt="hi" />;
  } else if (index === 2) {
    return <Image src="/33.png" width={350} height={350} alt="hi" />;
  } else if (index === 3) {
    return <Image src="/44.png" width={350} height={350} alt="hi" />;
  } else if (index === 4) {
    return <Image src="/55.png" width={350} height={350} alt="hi" />;
  } else {
    return <Image src="/22.png" width={350} height={350} alt="hi" />;
  }
};

const onDragEnd = (result: DropResult) => {};
const onDragUpdate = (result: DragUpdate) => {};

export default function Test() {
  const ITEMS: Item[] = [
    { id: uuidv4(), content: ItemUI(0), isActive: false, xSize: 2, ySize: 1 },
    { id: uuidv4(), content: ItemUI(1), isActive: false, xSize: 1, ySize: 2 },
    { id: uuidv4(), content: ItemUI(2), isActive: false, xSize: 1, ySize: 1 },
    { id: uuidv4(), content: ItemUI(3), isActive: false, xSize: 1, ySize: 1 },
    { id: uuidv4(), content: ItemUI(4), isActive: false, xSize: 1, ySize: 1 },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            className={KioskClassName(snapshot.isDraggingOver)}
            ref={provided.innerRef}
          >
            {ITEMS.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
                isDragDisabled={item.isActive === true}
              >
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      <Item item={item} />
                    </div>
                    {snapshot.isDragging && <Clone item={item} />}
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* <Droppable key={list} droppableId={list}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={containerClassName(
              lists,
              list,
              snapshot.isDraggingOver,
              i
            )}
          >
            {lists[list].length
              ? lists[list].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        // isDragging={snapshot.isDragging}
                      >
                        <div {...provided.dragHandleProps}>
                          <Item item={item} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              : !provided.placeholder && <Notice>Drop items here</Notice>}
            {provided.placeholder}
          </div>
        )}
      </Droppable> */}
    </DragDropContext>
  );
}
