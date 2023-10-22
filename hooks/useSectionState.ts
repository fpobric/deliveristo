import { SectionContext } from "@/providers/sectionstate";
import { useContext } from "react";

const useSectionState = () => useContext(SectionContext);

export default useSectionState;
