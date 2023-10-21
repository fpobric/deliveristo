"use client";
import config from "@/config";
import DogList from "@/interfaces/DogList";
import SelectOptions from "@/interfaces/SelectOptions";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Select from "react-select";

const SubBreedImage = () => {
  const [breed, setBreed] = useState<SelectOptions>();
  const [subBreed, setSubBreed] = useState<SelectOptions>();
  const [responseList, setResponseList] = useState<DogList>({ message: [] });
  const DynamicImage = dynamic(() => import("../../components/random-image"), {
    ssr: false,
  });

  const fetchDogs = async () => {
    const res = await fetch(`${config.BACKEND_API_URL}/breeds/list/all`);
    const data = await res.json();
    const formated = config.formatBreedList(data);
    setBreed(formated);
    setResponseList(data);
    return data;
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleBreed = (breed: any) => {
    const formated = config.formatSubBreedList(
      responseList.message[breed.value]
    );
    setSubBreed(formated);
  };

  const handleSubBreed = (subbreed: any) => {
    console.log(subbreed, "breed");
  };

  return (
    <main className="">
      <div className="">
        <Select instanceId="1" options={breed} onChange={e => handleBreed(e)} />
      </div>
      <Select
        instanceId="2"
        options={subBreed}
        onChange={e => handleSubBreed(e)}
      />
    </main>
  );
};

export default SubBreedImage;
