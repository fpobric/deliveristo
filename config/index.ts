import DogList from "@/interfaces/DogType";
import SelectOption from "@/interfaces/SelectOption";
import SelectOptions from "@/interfaces/SelectOptions";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("incorrect environment configuration");
}

const capitalizeFLetter = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

const formatBreedList = (dogList: DogList) => {
  let options: SelectOptions = [];
  Object.entries(dogList?.message).map(([name], key) => {
    if (name) options.push({ value: name, label: capitalizeFLetter(name) });
  });
  return options as SelectOptions;
};
const formatSubBreedList = (dogList: any) => {
  let options: SelectOptions = [];
  dogList.map((item: string) => {
    if (item && item !== "")
      options.push({ value: item, label: capitalizeFLetter(item) });
  });
  return options as SelectOptions;
};

const reducerActions = {
  selectedSection: "",
};

const links = [
  {
    label: "Images by breed",
    path: "/",
    title: "Breed section",
    targetSegment: "breed",
  },
  {
    label: "Random images",
    path: "/random-image",
    title: "Random section",
    targetSegment: "random",
  },
  {
    label: "Images by sub breed",
    path: "/sub-breed-image",
    title: "Breed and sub-breed section",
    targetSegment: "sub-breed",
  },
];

const config = {
  BACKEND_API_URL,
  formatBreedList,
  formatSubBreedList,
  reducerActions,
  links,
};

export default config;
