import useSectionState from "@/hooks/useSectionState";
import { Col, Row } from "react-flexbox-grid";

const Header = () => {
  const { state } = useSectionState();

  return (
    <Row around="xs" className="bg-light">
      <Col xsOffset={3} xs={9} className="d-flex justify-content-center">
        Dogs dash - {state.selectedSection}
      </Col>
    </Row>
  );
};

export default Header;
