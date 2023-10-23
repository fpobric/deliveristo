import useSectionState from "@/hooks/useSectionState";
import useSidebar from "@/hooks/useSidebar";
import { Col, Row } from "react-flexbox-grid";

const Header = () => {
  const { state } = useSectionState();
  const { toggle } = useSidebar();
  return (
    <div className="bg-light d-flex w-100">
      <div className="mobile-icon" onClick={() => toggle()}></div>
      <div className="d-flex justify-content-center align-items-center w-100">
        Dogs dash - {state.selectedSection}
      </div>
    </div>
  );
};

export default Header;
