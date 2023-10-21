"use client";
import config from "@/config";
import SelectOptions from "@/interfaces/SelectOptions";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Select from "react-select";

const BreedImage = () => {
  const DynamicImage = dynamic(() => import("../components/random-image"), {
    ssr: false,
  });
  const [breed, setBreed] = useState<SelectOptions>();

  const fetchDogs = async () => {
    const res = await fetch(`${config.BACKEND_API_URL}/breeds/list/all`);
    const data = await res.json();
    const formated = config.formatBreedList(data);
    setBreed(formated);
    return data;
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleBreed = (breed: any) => {
    console.log(breed, "breed");
  };

  return (
    <main className="">
      <div className="">
        <Select instanceId="1" options={breed} onChange={e => handleBreed(e)} />
      </div>
      <div>
        <DynamicImage />
      </div>
    </main>
  );
};

export default BreedImage;
