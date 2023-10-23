"use client";
import config from "@/config";
import useSectionState from "@/hooks/useSectionState";
import SelectOption from "@/interfaces/SelectOption";
import SelectOptions from "@/interfaces/SelectOptions";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Select, { GroupBase, SelectInstance } from "react-select";

const BreedImage = () => {
  const DynamicImage = dynamic(() => import("../components/app-image"), {
    ssr: false,
  });
  const [breed, setBreed] = useState<SelectOptions>();
  const [selectedBreed, setSelectedBreed] = useState<SelectOption>({
    value: "",
    label: "",
  });
  const selectRef = useRef<SelectInstance<Object, false, GroupBase<Object>>>();
  const { state } = useSectionState();
  const fetchDogs = async () => {
    const res = await fetch(`${config.BACKEND_API_URL}/breeds/list/all`);
    const data = await res.json();
    const formated = config.formatBreedList(data);
    setBreed(formated);
    return formated;
  };

  useEffect(() => {
    fetchDogs();
    console.log(state, "state");
  }, [state]);

  const handleBreed = (breed: any) => {
    setSelectedBreed({ value: breed.value, label: breed.label });
  };

  return (
    <main className="breed-page">
      <div className="col-6 offset-3 mb-4 mt-5">
        <Select
          instanceId="1"
          options={breed}
          value={selectedBreed}
          onChange={e => handleBreed(e)}
          ref={
            selectRef as React.RefObject<
              SelectInstance<Object, false, GroupBase<Object>>
            >
          }
        />
      </div>
      {selectedBreed?.value ? (
        <DynamicImage breedName={selectedBreed?.value} />
      ) : null}
    </main>
  );
};

export default BreedImage;
