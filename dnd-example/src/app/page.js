"use client";
import Image from "next/image";
import Knight from "./components/Knight";
import Square from "./components/Square";
import NemoParent from "./components/NemoParent";

export default function Home() {
  return (
    <main className="w-full h-full">
      <NemoParent />,
    </main>
  );
}
