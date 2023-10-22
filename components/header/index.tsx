import useSectionState from "@/hooks/useSectionState";
import { Row } from "react-flexbox-grid";

const Header = () => {
  const { state } = useSectionState();

  return <Row around="xs">Dogs dash - {state.selectedSection}</Row>;
};

export default Header;
