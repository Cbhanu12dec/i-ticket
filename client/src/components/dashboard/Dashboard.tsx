import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Flex,
  Text,
} from "@chakra-ui/react";
import MobileNav from "../header-sidenav/MobileNav";
import SideNav from "../header-sidenav/SideBar";
import { ReactNode, useEffect, useState } from "react";
import { TbInfoTriangle } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

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
      <Flex
        minH={"14"}
        bg="purple.800"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex alignItems={"center"} mx="4">
          <TbInfoTriangle color="#fff" />
          <Text textColor={"white"} mx="2">
            Testing annoucement...!
          </Text>
        </Flex>
        <RxCross2
          color="#fff"
          style={{ margin: "0 20px", cursor: "pointer" }}
          size={22}
        />
      </Flex>
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
