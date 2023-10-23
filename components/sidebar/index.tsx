import config from "@/config";
import useSectionState from "@/hooks/useSectionState";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Col } from "react-flexbox-grid";

const Sidebar = () => {
  const activeSegment = useSelectedLayoutSegment();
  const { state, onSectionChange } = useSectionState();
  return (
    <>
      <Col xs={12}>
        <div className="container-fluid p-0">
          <div className="row flex-nowrap">
            <div className="col-auto col-md-12 px-sm-2 px-0 bg-light">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a
                  href="/"
                  className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                  <span className="fs-5 d-none d-sm-inline text-dark">
                    Menu
                  </span>
                </a>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  {config.links.map((l, i) => {
                    return (
                      <div key={i}>
                        <hr />
                        <li className="nav-item">
                          <Link
                            href={l.path}
                            onClick={() => onSectionChange(l.title)}
                            style={{
                              textDecoration:
                                activeSegment === l.targetSegment
                                  ? "underline"
                                  : "none",
                            }}
                          >
                            {l.label}
                          </Link>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};
export default Sidebar;
