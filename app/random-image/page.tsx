"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const RandomImage = () => {
  const DynamicImage = dynamic(() => import("../../components/app-image"), {
    ssr: false,
  });
  useEffect(() => {}, []);
  return (
    <main
      className="d-flex col-xs-12 h-100 align-items-center justify-content-center"
      data-cy="random-image"
    >
      <DynamicImage />
    </main>
  );
};

export default RandomImage;
