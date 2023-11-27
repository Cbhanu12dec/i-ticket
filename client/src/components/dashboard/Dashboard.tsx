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
import { ReactNode, useEffect, useMemo, useState } from "react";
import { TbInfoTriangle } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import { message } from "antd";
import { prepareAnnouncements } from "../common/prepare-data";

interface DashboardProps {
  title?: ReactNode;
  children?: ReactNode;
}

const Dashboard = (props: DashboardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState([]);

  const getAnnouncements = () => {
    axios
      .get(`${PUBLIC_URL}/announcement/announcements`)
      .then((response) => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        if (user?.role === "user") {
          const data = prepareAnnouncements(response.data.announcements);
          const localAnnouncements = JSON.parse(
            localStorage.getItem("announcements") as string
          );
          const announcementData = data?.filter(
            (item: any) =>
              (item?.assignee === "user" || item?.assignee === "all") &&
              item?.status !== "Published" &&
              localAnnouncements.indexOf(item.key) === -1
          );
          setAnnouncements(announcementData[0] as any);
        } else {
          const localAnnouncements = JSON.parse(
            localStorage.getItem("announcements") as string
          );
          const data = prepareAnnouncements(response.data.announcements);
          const announcementData = data?.filter(
            (item: any) =>
              item?.status !== "Published" &&
              localAnnouncements.indexOf(item.key) === -1
          );
          setAnnouncements(announcementData[0] as any);
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        message.error("Failed to retreive announcements..!");
      });
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  useEffect(() => {
    const loggedin = localStorage.getItem("isActive") === "ACTIVE";
    setIsLoggedIn(loggedin);
  }, [localStorage.getItem("isActive")]);

  const acceptedAnnouncement = () => {
    const localAnnouncements =
      JSON.parse(localStorage.getItem("announcements") as string) || [];
    const newArray = [...localAnnouncements, (announcements as any)?.key];
    localStorage.setItem("announcements", JSON.stringify(newArray));
    getAnnouncements();
  };

  const getBanner = useMemo(() => {
    return announcements !== undefined ? (
      <Flex
        minH={"14"}
        bg="purple.800"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex alignItems={"center"} mx="4">
          <TbInfoTriangle color="#fff" />
          <Text textColor={"white"} mx="2">
            {(announcements as any)?.description}
          </Text>
        </Flex>
        <RxCross2
          color="#fff"
          style={{ margin: "0 20px", cursor: "pointer" }}
          size={22}
          onClick={acceptedAnnouncement}
        />
      </Flex>
    ) : (
      <></>
    );
  }, [announcements]);

  return isLoggedIn ? (
    <Box minH="100vh" bg={"gray.100"}>
      {getBanner}
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
