"use client";

import Image from "next/image";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";

type RandomImage = {
  message: string;
  status: string;
};

const DogImage = ({ breedName }: { breedName?: string | undefined | null }) => {
  const [randomImage, setRandomImage] = useState<RandomImage>({
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchImage = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/breeds/image/random`
    );
    const data = await res.json();
    setRandomImage(data);
    setIsLoading(false);
    return data;
  };
  useEffect(() => {
    isLoading;
  });
  const handleClick = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    fetchImage();
  }, []);

  return (
    <div>
      <button onClick={e => handleClick(e)}>Fetch Image</button>
      {randomImage.message !== "" ? (
        <Image
          src={randomImage?.message}
          layout="fill"
          alt="Picture of the dog"
        />
      ) : null}
    </div>
  );
};

export default DogImage;
