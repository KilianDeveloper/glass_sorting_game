import { create } from "zustand";
import { Bottle, isBottleFinished } from "../types/bottle";
import { generateBottles } from "../helper/RandomBottleGenerator";

interface BottleState {
  hasWon: boolean;
  bottles: Bottle[];
  selectedIndex: number | null;
  select: (index: number) => void;
  generateNew: (numberOfBottles: number) => void;
}

export const useBottleStore = create<BottleState>((set) => ({
  hasWon: false,
  bottles: [],
  selectedIndex: null,
  select: (index) => {
    set((state) => {
      const { bottles, selectedIndex } = state;

      if (selectedIndex === index) {
        return { selectedIndex: null };
      } else if (selectedIndex === null) {
        return { selectedIndex: index };
      }

      const swapFromBottle = bottles[selectedIndex];
      const swapToBottle = bottles[index];

      if (swapToBottle.layers.size() >= swapToBottle.capacity) {
        return { selectedIndex: index };
      }

      const transferColor = swapFromBottle.layers.peek();
      const swapToBottleTop = swapToBottle.layers.peek();
      if (swapToBottleTop && swapToBottle.layers.peek() != transferColor) {
        return {};
      }
      while (
        swapFromBottle.layers.peek() == transferColor &&
        swapFromBottle.layers.peek() !== undefined &&
        swapToBottle.layers.size() < swapToBottle.capacity
      ) {
        const currentColor = swapFromBottle.layers.pop();
        swapToBottle.layers.push(currentColor!);
      }

      const transferredBottles = bottles.filter(() => true);
      transferredBottles[selectedIndex] = swapFromBottle;
      transferredBottles[index] = swapToBottle;

      const hasWon = transferredBottles.every((bottle) =>
        isBottleFinished(bottle),
      );
      return {
        selectedIndex: null,
        bottles: transferredBottles,
        hasWon: hasWon,
      };
    });
  },
  generateNew: (numberOfBottles) => {
    set(() => {
      let generatedBottles: Bottle[] = [];
      let hasWon = false;
      do{
        generatedBottles = generateBottles(
          5,
          Math.max(1, Math.floor((2 * numberOfBottles) / 3)),
          Math.max(1, Math.ceil(numberOfBottles / 3)),
        );
        hasWon = generatedBottles.every((bottle) =>
          isBottleFinished(bottle),
        );
      }while(hasWon)
      return { bottles: generatedBottles, hasWon: false };
    });
  },
}));
