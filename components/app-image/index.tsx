"use client";

import config from "@/config";
import DogImage from "@/types/DogImage";
import Image from "next/image";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import GalleryButtons from "../gallery-buttons";
import Loading from "../app-loading.tsx";

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
            Feeling lucky?
          </button>
        </div>
      ) : null}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="image-frame" data-cy="dog-image">
          {/* had to put prop unoptimized to diplay image in cypress test */}
          {dogImage.message !== "" && typeof dogImage.message === "string" ? (
            <div className="d-flex flex-wrap">
              <div className="d-flex justify-content-center w-100">
                <Image
                  src={dogImage?.message}
                  // layout="fill"
                  alt="Picture of the dog"
                  width={300}
                  height={300}
                  unoptimized
                />
              </div>
              <div className="d-flex justify-content-center w-100">
                <button
                  className="btn btn-outline-dark me-3 app-btn -fixed-width mt-4"
                  onClick={() => fetchImage()}
                  data-cy="btn-fetch"
                >
                  Fetch
                </button>
              </div>
            </div>
          ) : null}
          {Array.isArray(dogImage.message) &&
          dogImage.message[currentIndex] !== "" &&
          typeof dogImage.message[currentIndex] === "string" ? (
            <div className="image-wrapper" data-cy="image-wrapper">
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
      )}
    </div>
  );
};

export default AppImage;
