import { randomInt } from "crypto";
import { Bottle } from "../types/bottle";
import { allColors, Color } from "../types/color";
import { Stack } from "./Stack";

export function generateBottles(
  bottleCapacity: number,
  amountOfBottles: number,
  amountOfEmptyBottles: number,
): Bottle[] {
  function generateEmptyBottle(): Bottle {
    return { layers: new Stack(), capacity: bottleCapacity };
  }
  function getRandomColor() {
    return { color: allColors[randomInt(0, 6)], amount: bottleCapacity };
  }

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const bottles: Bottle[] = [];

  let colors: { color: Color; amount: number }[] = [];

  for (let i: number = 0; i < amountOfBottles; i++) {
    bottles.push(generateEmptyBottle());
    colors.push(getRandomColor());
  }

  for (let i: number = 0; i < bottles.length; i++) {
    for (let layer: number = 0; layer < bottleCapacity; layer++) {
      const colorIndex =
        colors.length == 1 ? 0 : randomInt(0, colors.length - 1);
      const color = colors[colorIndex].color;
      bottles[i].layers.push(color);
      colors[colorIndex].amount = colors[colorIndex].amount - 1;
      if (colors[colorIndex].amount == 0) {
        colors = colors.filter((_, index) => index !== colorIndex);
      }
    }
  }

  for (let i: number = 0; i < amountOfEmptyBottles; i++) {
    bottles.push(generateEmptyBottle());
  }

  return bottles;
}
