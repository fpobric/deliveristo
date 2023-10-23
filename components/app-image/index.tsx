"use client";

import config from "@/config";
import DogImage from "@/types/DogImage";
import Image from "next/image";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import GalleryButtons from "../gallery-buttons";

const AppImage = ({
  breedName,
  subBreedName,
}: {
  breedName?: string | undefined | null;
  subBreedName?: string | undefined | null;
}) => {
  const [dogImage, setDogImage] = useState<DogImage>({
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [random, setIsRandom] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const typeOfImage = useCallback(() => {
    if (!!breedName && !!subBreedName && !random) {
      return `${config.BACKEND_API_URL}/breed/${breedName}/${subBreedName}/images`;
    }
    if (!!breedName && !!!subBreedName && random) {
      return `${config.BACKEND_API_URL}/breed/${breedName}/images/random`;
    }
    if (!!breedName && !!subBreedName && random) {
      return `${config.BACKEND_API_URL}/breed/${breedName}/${subBreedName}/images/random`;
    }
    if (!!breedName && !!!subBreedName && !random) {
      return `${config.BACKEND_API_URL}/breed/${breedName}/images`;
    } else {
      return `${config.BACKEND_API_URL}/breeds/image/random`;
    }
  }, [breedName, subBreedName, random]);

  const fetchImage = useCallback(async () => {
    const url = typeOfImage();
    const res = await fetch(url);
    const data = await res.json();
    setDogImage(data);
    setIsLoading(false);
  }, [typeOfImage]);

  useEffect(() => {
    fetchImage();
  }, [breedName, subBreedName, currentIndex, fetchImage]);

  const changeImage = (index: number) => {
    if (
      Array.isArray(dogImage.message) &&
      dogImage.message.length > currentIndex &&
      index > 0
    ) {
      setCurrentIndex(prevValue => prevValue + index);
    }
    if (Array.isArray(dogImage.message) && currentIndex > 0 && index < 0) {
      setCurrentIndex(prevValue => prevValue - Math.abs(index));
    }
  };
  const handleRandomByBreed = (event: SyntheticEvent) => {
    setDogImage({ message: "", status: "" });
    setIsRandom(true);
    event.preventDefault();
    fetchImage();
  };

  return (
    <div className="app-image d-flex justify-content-center align-items-center h-100 flex-wrap">
      {(breedName && !subBreedName) || (breedName && subBreedName) ? (
        <div className="d-flex w-100 justify-content-center mb-4">
          <button
            className="btn btn-outline-dark me-3 app-btn"
            onClick={e => handleRandomByBreed(e)}
          >
            Feeling lucky by breed?
          </button>
        </div>
      ) : null}

      {dogImage.message !== "" && typeof dogImage.message === "string" ? (
        <Image src={dogImage?.message} layout="fill" alt="Picture of the dog" />
      ) : null}
      {Array.isArray(dogImage.message) &&
      dogImage.message[currentIndex] !== "" &&
      typeof dogImage.message[currentIndex] === "string" ? (
        <div className="image-wrapper">
          <div
            className="image"
            style={{
              backgroundImage: `url(${dogImage.message[currentIndex]})`,
            }}
          ></div>
          <GalleryButtons
            dogImage={dogImage}
            count={dogImage.message.length}
            currentIndex={currentIndex}
            changeImage={changeImage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AppImage;
