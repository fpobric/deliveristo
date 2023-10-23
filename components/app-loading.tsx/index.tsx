import useSectionState from "@/hooks/useSectionState";
import { Row } from "react-flexbox-grid";

const Loading = () => {
  const { state } = useSectionState();

  return (
    <div className="app-loader" data-cy="app-loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
