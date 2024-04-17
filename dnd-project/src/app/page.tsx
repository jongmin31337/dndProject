"use client";
import Image from "next/image";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TestComponent from "./TestComponent";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TestComponent />
    </DndProvider>
  );
}
