"use client";
import "./globals.css";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Col, Grid, Row } from "react-flexbox-grid";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeSegment = useSelectedLayoutSegment();

  const links = [
    { label: "Images by breed", path: "/", targetSegment: null },
    {
      label: "Images by sub breed",
      path: "/sub-breed-image",
      targetSegment: "breed image",
    },
  ];

  return (
    <html lang="en">
      <body className={`app-body`}>
        <Grid>
          <Row around="xs">Dogs dash</Row>
          <Row around="xs">
            <Col xs={3}>
              {links.map((l, i) => {
                return (
                  <Col key={i} xs={12}>
                    <Link
                      href={l.path}
                      style={{
                        textDecoration:
                          activeSegment === l.targetSegment
                            ? "underline"
                            : "none",
                      }}
                    >
                      {l.label}
                    </Link>
                  </Col>
                );
              })}
            </Col>
            <Col xs={9}>
              <div className="content">{children}</div>
            </Col>
          </Row>
          <Row></Row>
        </Grid>
      </body>
    </html>
  );
}
