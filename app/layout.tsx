"use client";
import "./globals.css";
import { Col, Grid, Row } from "react-flexbox-grid";
import SelectedSectionProvider from "@/providers/sectionstate";
import Header from "@/components/header";
import { use, useEffect } from "react";
import useSectionState from "@/hooks/useSectionState";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useSectionState();

  useEffect(() => {}, [state]);
  return (
    <html lang="en">
      <body className={`app-body`}>
        <SelectedSectionProvider>
          <Grid>
            <Header />
            <Row around="xs">
              <Col xs={3}>
                <Sidebar />
              </Col>
              <Col xs={9}>
                <div className="content">{children}</div>
              </Col>
            </Row>
            <Row></Row>
          </Grid>
        </SelectedSectionProvider>
      </body>
    </html>
  );
}
