import Image from "next/image";
import React, { useState } from "react";
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
    ? "absolute top-0 w-[360px] h-[180px] left-0 bottom-0 border border-dashed border-black bg-white p-2 rounded-md flex-shrink-0 w-40 font-sans"
    : "absolute top-0 w-[360px] h-[180px] lefts-0 bottom-0 border border-solid border-black bg-white p-2 rounded-md flex-shrink-0 w-40 font-sans";
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
    return (
      <Image
        src="/11.jpeg"
        width={350}
        height={350}
        alt="hi"
        className="w-[180px] h-[180px]"
      />
    );
  } else if (index === 1) {
    return (
      <Image
        src="/22.png"
        width={350}
        height={350}
        alt="hi"
        className="w-[180px] h-[180px]"
      />
    );
  } else if (index === 2) {
    return (
      <Image
        src="/33.png"
        width={350}
        height={350}
        alt="hi"
        className="w-[180px] h-[180px]"
      />
    );
  } else if (index === 3) {
    return (
      <Image
        src="/44.png"
        width={350}
        height={350}
        alt="hi"
        className="w-[180px] h-[180px]"
      />
    );
  } else if (index === 4) {
    return (
      <Image
        src="/55.png"
        width={350}
        height={350}
        alt="hi"
        className="w-[180px] h-[180px]"
      />
    );
  } else if (index === 5) {
    return (
      <Image
        src="/22.png"
        width={350}
        height={350}
        alt="hi"
        className="w-[180px] h-[180px]"
      />
    );
  } else {
    return (
      <Image
        src="/66.png"
        width={360}
        height={350}
        alt="hi"
        className="w-[360px] h-[180px]"
      />
    );
  }
};

const onDragEnd = (result: DropResult) => {
  console.log(result);
};
const onDragUpdate = (result: DragUpdate) => {
  console.log(result);
};

export default function Test() {
  const ITEMS: Item[] = [
    { id: uuidv4(), content: ItemUI(0), isActive: false, xSize: 2, ySize: 1 },
    { id: uuidv4(), content: ItemUI(1), isActive: false, xSize: 1, ySize: 1 },
    { id: uuidv4(), content: ItemUI(2), isActive: false, xSize: 1, ySize: 1 },
    { id: uuidv4(), content: ItemUI(3), isActive: false, xSize: 1, ySize: 1 },
    { id: uuidv4(), content: ItemUI(4), isActive: false, xSize: 1, ySize: 1 },
    { id: uuidv4(), content: ItemUI(6), isActive: false, xSize: 1, ySize: 1 },
  ];

  const [oneItems, setOneItems] = useState<any>([
    <></>,
    <></>,
    <></>,
    <></>,
    <></>,
  ]);

  const [lists, setLists] = useState<any>({
    [0]: [],
    [1]: [],
  });

  const containerClassName = (
    lists: any,
    list: any,
    isDraggingOver: boolean,
    index: number
  ) => {
    switch (index) {
      case 0:
        return "w-[272px] h-[180px] border-[1px] border-solid";
      case 1:
        return "";
    }
  };
  return (
    <div className="m-5">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <div className="flex justify-between">
          <div className="relative">
            <Droppable droppableId="ITEMS2" isDropDisabled={true}>
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
          </div>
          <div className="flex gap-5">
            <div className="flex gap-5 flex-row">
              <Droppable droppableId="double">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="w-[272px] h-[180px] border-[1px] border-solid"
                  ></div>
                )}
              </Droppable>
              <Droppable droppableId="one">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {oneItems.map((oneItem, index) => (
                      <Draggable
                        key={index}
                        draggableId={index + "1"}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-[272px] h-[180px] border-[1px] border-solid"
                          >
                            {oneItem}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
              {/* {Object.keys(lists).map((list, i) => (
                <Droppable droppableId={list}>
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
                      {lists[list].map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <div {...provided.dragHandleProps}>
                                <Item item={item} />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))} */}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
