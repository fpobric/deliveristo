"use client";
import "../styles/application.scss";
import { Col, Row } from "react-flexbox-grid";
import SelectedSectionProvider from "@/providers/sectionstate";
import Header from "@/components/header";
import { useEffect } from "react";
import useSectionState from "@/hooks/useSectionState";
import Sidebar from "@/components/sidebar";
import SidebarProvider from "@/providers/sidebar";

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
          <SidebarProvider>
            <Row className="p-0">
              <Header />
              <Row around="xs">
                <Col xs={12}>
                  <Row>
                    <Sidebar />

                    <div className="content h-100">{children}</div>
                  </Row>
                </Col>
              </Row>
              <Row></Row>
            </Row>
          </SidebarProvider>
        </SelectedSectionProvider>
      </body>
    </html>
  );
}
