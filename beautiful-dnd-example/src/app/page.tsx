"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragUpdate,
} from "react-beautiful-dnd";
import Test from "./components/Test";

type Item = {
  id: string;
  content: string;
  isActive: boolean;
  xSize: number;
  ySize: number;
};

type Lists = {
  [key: string]: Item[];
};

const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const copy = (
  source: Item[],
  destination: Item[],
  droppableSource: any,
  droppableDestination: any
): Item[] => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];
  destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
  return destClone;
};

const move = (
  source: Item[],
  destination: Item[],
  droppableSource: any,
  droppableDestination: any
): Lists => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result: Lists = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const Item: React.FC<Item> = ({ item }: any) => {
  return (
    <div
      style={{
        background: item.isActive ? "#f0f0f0" : "#fff",
        userSelect: item.isActive ? "none" : "auto",
        width: `${item.xSize * 240}px`,
        height: "40px",
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
        background: item.isActive ? "#f0f0f0" : "#fff",
        userSelect: item.isActive ? "none" : "auto",
        width: `${item.xSize * 240}px`,
        height: "40px",
        display: "block !important",
      }}
    >
      {item.content}
    </div>
  );
};

const KioskClassName = (isDraggingOver: boolean) => {
  return isDraggingOver
    ? "absolute top-0 right-0 bottom-0 w-[500px] border border-dashed border-black bg-white p-2 rounded-md flex-shrink-0 w-40 font-sans"
    : "absolute top-0 right-0 bottom-0 w-[500px] border border-solid border-black bg-white p-2 rounded-md flex-shrink-0 w-40 font-sans";
};

const containerClassName = (
  lists: any,
  list: any,
  isDraggingOver: boolean,
  index: number
) => {
  switch (index) {
    case 0:
      return lists[list][0]?.xSize === 2
        ? "col-span-2 bg-red-800 h-[250px] w-[500px]"
        : "col-span-1 bg-red-800 h-[250px]";
    case 1:
      return lists[list][0]?.xSize === 2
        ? "col-span-2 bg-purple-300 h-[250px] w-[500px]"
        : "col-span-1 bg-purple-300 h-[250px]";
    case 2:
      return lists[list][0]?.xSize === 2
        ? "col-span-2 bg-red-200 h-[250px] w-[500px]"
        : "col-span-1 bg-red-200 h-[250px]";
    case 3:
      return "col-start-3 bg-yellow-800 h-[250px]";
    case 4:
      return "col-start-3 bg-purple-800 h-[250px]";
    case 5:
      return "col-start-3 bg-purple-500 h-[250px]";
  }
};

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const ITEMS: Item[] = [
  { id: uuidv4(), content: "Headline", isActive: false, xSize: 2, ySize: 1 },
  { id: uuidv4(), content: "Copy", isActive: false, xSize: 1, ySize: 2 },
  { id: uuidv4(), content: "Image", isActive: false, xSize: 1, ySize: 1 },
  { id: uuidv4(), content: "Slideshow", isActive: false, xSize: 1, ySize: 1 },
  { id: uuidv4(), content: "Quote", isActive: false, xSize: 1, ySize: 1 },
];

export default function TodoLibraryExample() {
  const [lists, setLists] = useState<Lists>({
    [0]: [],
    [1]: [],
    [2]: [],
    [3]: [],
    [4]: [],
    [5]: [],
  });

  const className = [];

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    switch (source.droppableId) {
      case destination.droppableId:
        const newLists = {
          ...lists,
          [destination.droppableId]: reorder(
            lists[source.droppableId],
            source.index,
            destination.index
          ),
        };

        setLists(newLists);
        break;
      case "ITEMS":
        const sourceClone = Array.from(ITEMS);
        const item = sourceClone[source.index];

        const newLists2 = {
          ...lists,
          [destination.droppableId]: copy(
            ITEMS,
            lists[destination.droppableId],
            source,
            destination
          ),
        };

        let i = 0;

        for (let listTest in newLists2) {
          if (newLists2[listTest].length > 1) {
            console.log(newLists2[listTest].length);
            return false;
          } else {
            const item = newLists2[listTest][0];

            if (item) {
            } else {
            }
            className.push("col-span-2 bg-red-800 h-[250px] w-[500px]");
          }

          i++;
        }

        ITEMS.forEach((test) => {
          if (test.id === item.id) {
            test.isActive = true;
          }
        });

        setLists(newLists2);
        break;
      default:
        const newLists4 = {
          ...lists,
          ...move(
            lists[source.droppableId],
            lists[destination.droppableId],
            source,
            destination
          ),
        };

        for (let listTest in newLists4) {
          if (newLists4[listTest].length > 1) {
            console.log(newLists4[listTest].length);
            return false;
          } else {
            const item = newLists4[listTest][0];

            if (item) {
            } else {
            }
            className.push("col-span-2 bg-red-800 h-[250px] w-[500px]");
          }
        }

        setLists(newLists4);
        // setLists({
        //   ...lists,
        //   ...move(
        //     lists[source.droppableId],
        //     lists[destination.droppableId],
        //     source,
        //     destination
        //   ),
        // });
        break;
    }
  };

  const onDragUpdate = (result: DragUpdate) => {
    const destination = result.destination?.droppableId;
    const source = result.source?.droppableId;

    if (source && destination && source !== "ITEMS") {
      const sourceList = lists[source];
      const destinationList = lists[destination];

      setLists({
        ...lists,
        [source]: destinationList,
        [destination]: sourceList,
      });
    }

    // console.log("result.destination", result.destination);
    // console.log("destination", destination);

    // console.log("lists", lists);

    // let index = 0;

    // for (let list in lists) {
    //   if (list === destination) {
    //     if (index === 0 || index === 1) {
    //       // y축으로 2개짜리 못옴
    //       if (test?.ySize === 2) {
    //       } else {
    //         if (test?.xSize === 2) {
    //           if (index === 0) {
    //           }
    //         } else {
    //         }
    //       }
    //     } else if (index === 3 || index === 4 || index === 5) {
    //       if (test?.xSize === 2) {
    //         alert("어허 이것도 안되융");
    //       }
    //     }
    //   }
    //   index++;
    // }
  };

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Test />
    // <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
    //   <Droppable droppableId="ITEMS" isDropDisabled={true}>
    //     {(provided, snapshot) => (
    //       <div
    //         className={KioskClassName(snapshot.isDraggingOver)}
    //         ref={provided.innerRef}
    //       >
    //         {ITEMS.map((item, index) => (
    //           <Draggable
    //             key={item.id}
    //             draggableId={item.id}
    //             index={index}
    //             isDragDisabled={item.isActive === true}
    //           >
    //             {(provided, snapshot) => (
    //               <>
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                   style={{
    //                     ...provided.draggableProps.style,
    //                   }}
    //                 >
    //                   <Item item={item} />
    //                 </div>
    //                 {snapshot.isDragging && <Clone item={item} />}
    //               </>
    //             )}
    //           </Draggable>
    //         ))}
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    //   <div className="grid grid-cols-3 gap-x-10 gap-y-10 w-[800px] h-[600px]">
    //     {Object.keys(lists).map((list, i) => (
    //       <Droppable key={list} droppableId={list}>
    //         {(provided, snapshot) => (
    //           <div
    //             ref={provided.innerRef}
    //             className={containerClassName(
    //               lists,
    //               list,
    //               snapshot.isDraggingOver,
    //               i
    //             )}
    //           >
    //             {lists[list].length
    //               ? lists[list].map((item, index) => (
    //                   <Draggable
    //                     key={item.id}
    //                     draggableId={item.id}
    //                     index={index}
    //                   >
    //                     {(provided, snapshot) => (
    //                       <div
    //                         ref={provided.innerRef}
    //                         {...provided.draggableProps}
    //                         // isDragging={snapshot.isDragging}
    //                       >
    //                         <div {...provided.dragHandleProps}>
    //                           <Item item={item} />
    //                         </div>
    //                       </div>
    //                     )}
    //                   </Draggable>
    //                 ))
    //               : !provided.placeholder && <Notice>Drop items here</Notice>}
    //             {provided.placeholder}
    //           </div>
    //         )}
    //       </Droppable>
    //     ))}
    //   </div>
    // </DragDropContext>
  );
}
