import BottleContainer from "../components/BottleContainer";
import { generateBottles } from "../helper/RandomBottleGenerator";

export default function Home() {
  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full flex flex-col mt-8 mx-16 items-center">
        <h1 className="text-5xl mb-8">Bottle Sorting Game</h1>
        <BottleContainer />
      </section>
    </main>
  );
}
