import { Stack } from "../helper/Stack";
import { Color } from "./color";

export type Bottle = {
  layers: Stack<Color | null>;
  capacity: number;
};

export function isBottleFinished(bottle: Bottle) {
  return (
    bottle.layers.storage.every((e) => e === bottle.layers.storage[0]) &&
    (bottle.layers.size() === bottle.capacity || bottle.layers.size() === 0)
  );
}
