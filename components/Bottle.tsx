"use client";
import { useEffect, useMemo, useState } from "react";
import { Bottle } from "../types/bottle";
import { Color } from "../types/color";
import { useBottleStore } from "../data/BottleStore";
import { useShallow } from "zustand/react/shallow";

export default function BottleComponent({ index }: { index: number }) {
  const { bottles, selectedIndex, select } = useBottleStore(
    useShallow((state) => ({
      bottles: state.bottles,
      selectedIndex: state.selectedIndex,
      select: state.select,
    })),
  );
  const layers = useMemo(() => {
    const bottle = bottles[index];
    let currentLayers = [...bottle.layers.storage];
    for (let i = currentLayers.length; i <= bottle.capacity - 1; i++) {
      currentLayers.push(null);
    }
    return currentLayers;
  }, [bottles, index]);
  return (
    <button
      onClick={() => select(index)}
      className={`flex flex-col-reverse flex-nowrap min-w-6 border-2 border-white rounded-md transition-all ${
        selectedIndex === index ? "scale-125" : "scale-100"
      }`}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className="w-6 h-4 "
          style={{ backgroundColor: layer ? layer : "transparent" }}
        />
      ))}
    </button>
  );
}
