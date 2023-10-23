import useSectionState from "@/hooks/useSectionState";
import useSidebar from "@/hooks/useSidebar";
import { Col, Row } from "react-flexbox-grid";

const Header = () => {
  const { state } = useSectionState();
  const { toggle } = useSidebar();
  return (
    <Row around="xs" className="bg-light">
      <div className="mobile-icon" onClick={() => toggle()}>
        Icon
      </div>
      <Col xsOffset={3} xs={9} className="d-flex justify-content-center">
        Dogs dash - {state.selectedSection}
      </Col>
    </Row>
  );
};

export default Header;
