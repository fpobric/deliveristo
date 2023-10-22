"use client";
import config from "@/config";
import SelectOption from "@/interfaces/SelectOption";
import SelectOptions from "@/interfaces/SelectOptions";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Select, { GroupBase, SelectInstance } from "react-select";

const SubBreedImage = () => {
  const DynamicImage = dynamic(() => import("../../components/app-image"), {
    ssr: false,
  });
  const [response, setResponse] = useState<any>();
  const [breed, setBreed] = useState<SelectOptions>();
  const [selectedBreed, setSelectedBreed] = useState<SelectOption>({
    value: "",
    label: "",
  });
  const [subBreed, setSubBreed] = useState<SelectOptions>();
  const [selectedSubBreed, setSelectedSubBreed] = useState<SelectOption>({
    value: "",
    label: "",
  });
  const selectBreedRef =
    useRef<SelectInstance<Object, false, GroupBase<Object>>>();
  const selectSubBreedRef =
    useRef<SelectInstance<Object, false, GroupBase<Object>>>();

  const fetchDogs = async () => {
    const res = await fetch(`${config.BACKEND_API_URL}/breeds/list/all`);
    const data = await res.json();
    const formated = config.formatBreedList(data);
    setBreed(formated);
    setResponse(data);
    return formated;
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleBreed = (selectedBreed: any) => {
    setSelectedSubBreed({ value: "", label: "" });
    setSelectedBreed({
      value: selectedBreed.value,
      label: selectedBreed.label,
    });
    if (response) {
      const subBreed = response.message[selectedBreed.value];
      const formatedValues = config.formatSubBreedList(subBreed);
      setSubBreed(formatedValues);
    }
  };

  const handleSubBreed = (breed: any) => {
    setSelectedSubBreed({ value: breed.value, label: breed.label });
  };

  return (
    <main className="">
      <div className="">
        <Select
          instanceId="1"
          options={breed}
          value={selectedBreed}
          onChange={e => handleBreed(e)}
          ref={
            selectBreedRef as React.RefObject<
              SelectInstance<Object, false, GroupBase<Object>>
            >
          }
        />
        <Select
          instanceId="2"
          options={subBreed}
          value={selectedSubBreed}
          onChange={e => handleSubBreed(e)}
          ref={
            selectSubBreedRef as React.RefObject<
              SelectInstance<Object, false, GroupBase<Object>>
            >
          }
        />
      </div>
      <div>
        <DynamicImage
          breedName={selectedBreed?.value}
          subBreedName={selectedSubBreed?.value}
        />
      </div>
    </main>
  );
};

export default SubBreedImage;
