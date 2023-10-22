"use client";
import dynamic from "next/dynamic";

const RandomImage = () => {
  const DynamicImage = dynamic(() => import("../../components/app-image"), {
    ssr: false,
  });

  return (
    <main className="">
      <div className=""></div>
      <div>
        <DynamicImage />
      </div>
    </main>
  );
};

export default RandomImage;
