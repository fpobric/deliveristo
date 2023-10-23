import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SidebarContext = createContext({
  isSidebarOpen: false,
  toggle: () => {},
});

const SidebarProvider = ({ children }: { children: any }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarState = {
    isSidebarOpen,
    toggle,
  };

  return (
    <SidebarContext.Provider value={sidebarState}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SidebarProvider;
