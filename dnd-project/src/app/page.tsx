"use client";
import Image from "next/image";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ComponentLayout } from "./components/ComponentLayout";
import Test from "./components/Test";

export const ItemTypes = {
  BOX: "box",
};

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-12">
        {/* <ComponentLayout /> */}
        <Test />
      </div>
    </DndProvider>
  );
}
