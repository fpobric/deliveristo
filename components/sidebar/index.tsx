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
      {config.links.map((l, i) => {
        return (
          <Col key={i} xs={12}>
            <Link
              href={l.path}
              onClick={() => onSectionChange(l.title)}
              style={{
                textDecoration:
                  activeSegment === l.targetSegment ? "underline" : "none",
              }}
            >
              {l.label}
            </Link>
          </Col>
        );
      })}
    </>
  );
};
export default Sidebar;
