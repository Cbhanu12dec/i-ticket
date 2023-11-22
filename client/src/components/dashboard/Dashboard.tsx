import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import MobileNav from "../header-sidenav/MobileNav";
import SideNav from "../header-sidenav/SideBar";
import { ReactNode, useEffect, useState } from "react";

interface DashboardProps {
  title?: ReactNode;
  children?: ReactNode;
}

const Dashboard = (props: DashboardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedin = localStorage.getItem("isActive") === "ACTIVE";
    setIsLoggedIn(loggedin);
  }, [localStorage.getItem("isActive")]);

  return isLoggedIn ? (
    <Box minH="100vh" bg={"gray.100"}>
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
  ) : (
    <Flex w={"100%"}>{children}</Flex>
  );
};

export default Dashboard;
