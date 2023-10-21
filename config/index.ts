import DogList from "@/interfaces/DogType";
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
  dogList.map((name: string, key: number) => {
    if (name) options.push({ value: name, label: capitalizeFLetter(name) });
  });
  return options as SelectOptions;
};
const config = {
  BACKEND_API_URL,
  formatBreedList,
  formatSubBreedList,
};

export default config;
