"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type DogList = {
  message: Array<string>;
};

const Home = () => {
  const [dogs, setDogs] = useState<DogList>({ message: [] });
  const [breed, setBreed] = useState<string | null>(null);
  const DynamicImage = dynamic(() => import("../components/random-image"), {
    ssr: false,
  });

  useEffect(() => {
    // fetchDogs();
  });

  return (
    <main className="">
      <div className="random-image">
        <DynamicImage />
      </div>
    </main>
  );
};

export default Home;
