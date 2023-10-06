import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import MobileNav from "../header-sidenav/MobileNav";
import SideNav from "../header-sidenav/SideBar";
import { ReactNode } from "react";

interface DashboardProps{
  title?:ReactNode;
  children?:ReactNode;

}

const Dashboard = (props:DashboardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {title, children} = props

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SideNav
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SideNav onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
