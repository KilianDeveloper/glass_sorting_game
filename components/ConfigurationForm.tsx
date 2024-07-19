"use client";

import { useShallow } from "zustand/react/shallow";
import { useBottleStore } from "../data/BottleStore";
import { FormEvent, useRef } from "react";
import { z } from "zod";

export default function ConfigurationForm() {
  const numberOfBottleRef = useRef<HTMLInputElement>(null);

  const { generateNew } = useBottleStore(
    useShallow((state) => ({
      bottles: state.bottles,
      hasWon: state.hasWon,
      generateNew: state.generateNew,
    })),
  );

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
    <form
      action=""
      className="mt-12 flex flex-row items-end gap-4"
      onSubmit={handleSubmit}
    >
      <label className="text-sm block text-white text-opacity-50">
        Number of Bottles
        <input
          name="number_of_bottles"
          type="number"
          ref={numberOfBottleRef}
          defaultValue={5}
          className="px-4 rounded-md h-10 bg-transparent border-2 border-slate-400 text-white block text-lg outline-none focus:border-white"
        />
      </label>

      <input
        type="submit"
        value="Generate new"
        className="px-4 bg-white text-slate-900 rounded-md h-10 active:bg-slate-200 hover:bg-slate-100 transition-all"
      />
    </form>
  );
}
