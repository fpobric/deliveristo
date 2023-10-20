"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type DogList = {
  message: Array<Array<string>>;
};

const BreedImage = () => {
  const [dogs, setDogs] = useState<DogList>({ message: [] });
  const [breed, setBreed] = useState<string | null>(null);
  const [breedKey, setBreedKey] = useState<number | null>(null);
  const DynamicImage = dynamic(() => import("../../components/random-image"), {
    ssr: false,
  });

  const fetchDogs = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/breeds/list/all`
    );
    const data = await res.json();
    setDogs(data);
    return data;
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <main className="">
      <div className="">
        {Object.entries(dogs?.message).map(([name], key) => (
          <h2
            onClick={() => {
              setBreedKey(key);
            }}
            key={key}
          >
            {name}
          </h2>
        ))}
      </div>
      {breedKey
        ? Object.values(dogs?.message)[breedKey].map((item, key) => (
            <h2 key={key}>{item}</h2>
          ))
        : null}
    </main>
  );
};

export default BreedImage;
