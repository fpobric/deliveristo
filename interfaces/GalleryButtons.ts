import DogImage from "@/types/DogImage";

interface GalleryButtons {
  count: number;
  changeImage: (index: number) => void;
  currentIndex: number;
  dogImage: DogImage;
}
export default GalleryButtons;
