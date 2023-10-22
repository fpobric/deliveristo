"use client";

import config from "@/config";
import Image from "next/image";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";

type DogImage = {
  message: string;
  status: string;
};

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
    return data;
  }, [typeOfImage]);

  useEffect(() => {
    fetchImage();
  }, [breedName, subBreedName, fetchImage]);

  const changeImage = () => {
    const index = 1;
    if (
      Array.isArray(dogImage.message) &&
      dogImage.message.length >= index &&
      index > 0
    )
      setCurrentIndex(currentIndex + index);
    if (Array.isArray(dogImage.message) && currentIndex > 0 && index < 0)
      setCurrentIndex(currentIndex - index);
  };

  return (
    <div>
      {dogImage.message !== "" && typeof dogImage.message === "string" ? (
        <Image src={dogImage?.message} layout="fill" alt="Picture of the dog" />
      ) : null}
      {Array.isArray(dogImage.message) &&
      dogImage.message[currentIndex] !== "" &&
      typeof dogImage.message[currentIndex] === "string" ? (
        <div>
          <div
            className="image"
            style={{
              backgroundImage: `url(${dogImage.message[currentIndex]})`,
            }}
          ></div>
          {dogImage.message.length > 1 ? (
            <>
              <button onClick={() => changeImage()}>up</button>
              <button onClick={() => changeImage()}>down</button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AppImage;
