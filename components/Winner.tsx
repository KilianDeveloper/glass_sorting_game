import { useShallow } from "zustand/react/shallow";
import { useBottleStore } from "../data/BottleStore";

export default function Winner() {
  const { generateNew, bottles, hasWon } = useBottleStore(
    useShallow((state) => ({
      bottles: state.bottles,
      hasWon: state.hasWon,
      generateNew: state.generateNew,
    })),
  );

  return (
    <div className="flex flex-col items-center mb-12 w-fit bg-black p-4 border-2 border-scyan rounded-xl">
      <h1 className="text-xl text-white mb-2">You won!</h1>
      <button
        onClick={() => generateNew(bottles.length)}
        className="px-4 bg-white text-slate-900 rounded-md h-10 active:bg-slate-200 hover:bg-slate-100 transition-all"
      >
        Play again!
      </button>
    </div>
  );
}
