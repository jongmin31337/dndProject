import { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export const ItemTypes = {
  CARD: "card",
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

// 드래그 아이템 유형 정의
interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card = memo(function Card({ id, text, moveCard, findCard }: any) {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover(item: { id: any }, monitor) {
        const draggedId = item.id;
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [findCard, moveCard]
  );

  const ref = useRef<HTMLDivElement>(null);
  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {text}
    </div>
  );
});
