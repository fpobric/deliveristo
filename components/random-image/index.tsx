"use client";

import config from "@/config";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

type RandomImage = {
  message: string;
  status: string;
};

const DogImage = ({
  breedName,
  setSelectedBreed,
  subBreedName,
}: {
  breedName?: string | undefined | null;
  setSelectedBreed?: Dispatch<SetStateAction<string>>;
  subBreedName?: string | undefined | null;
}) => {
  const [randomImage, setRandomImage] = useState<RandomImage>({
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [random, setIsRandom] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const typeOfImage = useCallback(() => {
    if (!!breedName && !!subBreedName) {
      return `${config.BACKEND_API_URL}/breeds/image/random`;
    }
    if (!!breedName && random) {
      return `${config.BACKEND_API_URL}/breed/${breedName}/images/random`;
    }
    if (
      (breedName && breedName?.length > 0 && !!!subBreedName) ||
      subBreedName?.length === 0
    ) {
      return `${config.BACKEND_API_URL}/breed/${breedName}/images`;
    } else {
      return `${config.BACKEND_API_URL}/breeds/image/random`;
    }
  }, [breedName, subBreedName, random]);

  const fetchImage = useCallback(async () => {
    const url = typeOfImage();
    const res = await fetch(url);
    const data = await res.json();
    setRandomImage(data);
    setIsLoading(false);
    return data;
  }, [typeOfImage]);

  useEffect(() => {
    fetchImage();
  }, [breedName, subBreedName, fetchImage]);

  const handleClick = (event: SyntheticEvent) => {
    setRandomImage({ message: "", status: "" });
    if (setSelectedBreed) setSelectedBreed("");
    event.preventDefault();
    fetchImage();
  };
  const handleRandomByBreed = (event: SyntheticEvent) => {
    setRandomImage({ message: "", status: "" });
    setIsRandom(true);
    event.preventDefault();
    fetchImage();
  };

  const changeImage = () => {
    const index = 1;
    if (
      Array.isArray(randomImage.message) &&
      randomImage.message.length >= index &&
      index > 0
    )
      setCurrentIndex(currentIndex + index);
    if (Array.isArray(randomImage.message) && currentIndex > 0 && index < 0)
      setCurrentIndex(currentIndex - index);
  };

  return (
    <div>
      <button onClick={e => handleClick(e)}>Feeling lucky?</button>
      <button onClick={e => handleRandomByBreed(e)}>
        Feeling lucky by breed?
      </button>
      {randomImage.message !== "" && typeof randomImage.message === "string" ? (
        <Image
          src={randomImage?.message}
          layout="fill"
          alt="Picture of the dog"
        />
      ) : null}
      {Array.isArray(randomImage.message) &&
      randomImage.message[currentIndex] !== "" &&
      typeof randomImage.message[currentIndex] === "string" ? (
        <div>
          <div
            className="image"
            style={{
              backgroundImage: `url(${randomImage.message[currentIndex]})`,
            }}
          ></div>
          {randomImage.message[currentIndex]} -urlddd
          {randomImage.message.length > 1 ? (
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

export default DogImage;
