import React, { useCallback, useState } from "react";
import { Card } from "./Card";

export interface Item {
  id: number;
  text: string;
}

const style = {
  width: 400,
};

export default function TestComponent() {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Write a cool JS library",
    },
    {
      id: 2,
      text: "Make it generic enough",
    },
    {
      id: 3,
      text: "Write README",
    },
    {
      id: 4,
      text: "Create some examples",
    },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
    },
    {
      id: 6,
      text: "???",
    },
    {
      id: 7,
      text: "PROFIT",
    },
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) => {
      const updatedCards = [...prevCards]; // 카드 배열의 복사본을 만듭니다.

      // 드래그된 카드를 현재 위치에서 제거합니다.
      const [draggedCard] = updatedCards.splice(dragIndex, 1);

      // 드래그된 카드를 hoverIndex에 삽입합니다.
      updatedCards.splice(hoverIndex, 0, draggedCard);

      return updatedCards; // 업데이트된 배열을 반환합니다.
    });
  }, []);

  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    },
    []
  );

  return <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>;
}
