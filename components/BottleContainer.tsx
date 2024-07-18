"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bottle, isBottleFinished } from "../types/bottle";
import BottleComponent from "./Bottle";
import { generateBottles } from "../helper/RandomBottleGenerator";
import { useBottleStore } from "../data/BottleStore";
import { useShallow } from "zustand/react/shallow";
import { count } from "console";
import { z } from "zod";
import ConfigurationForm from "./ConfigurationForm";
import Winner from "./Winner";

export default function BottleContainer() {
  const numberOfBottleRef = useRef<HTMLInputElement>(null);
  const { bottles, hasWon, generateNew } = useBottleStore(
    useShallow((state) => ({
      bottles: state.bottles,
      hasWon: state.hasWon,
      generateNew: state.generateNew,
    })),
  );

  useEffect(() => {
    generateNew(5);
  }, [generateNew]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = z.coerce
      .number()
      .int()
      .safeParse(numberOfBottleRef.current?.value);
    if (!parsed.success) {
      return;
    }
    generateNew(parsed.data);
  };

  return (
    <div className="flex flex-col items-center">
      {hasWon && <Winner />}
      <div className="w-fit flex flex-wrap flex-row gap-4">
        {bottles.map((_, index) => {
          return <BottleComponent key={index} index={index} />;
        })}
      </div>
      <ConfigurationForm />
    </div>
  );
}
