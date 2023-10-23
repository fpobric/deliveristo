import { SidebarContext } from "@/providers/sidebar";
import { useContext } from "react";

const useSidebar = () => useContext(SidebarContext);

export default useSidebar;
