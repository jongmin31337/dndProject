import React, { useCallback, useRef, useState } from "react";
import { Card, ItemTypes } from "./Card";
import { useDrop } from "react-dnd";

export interface Item {
  id: number;
  text: string;
}

const style = {
  display: "flex",
  width: 1000,
  gap: 10,
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

  const findCard = useCallback(
    (id: any) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: number, atIndex: number) => {
      const { card, index } = findCard(id);
      const newCards = [...cards];
      newCards.splice(index, 1);
      newCards.splice(atIndex, 0, card);
      setCards(newCards);
    },
    [findCard, cards]
  );


  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  drop(ref);

  return (
    <div ref={ref} style={style}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  );
}
