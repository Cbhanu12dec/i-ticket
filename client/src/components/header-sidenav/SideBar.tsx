import {
  Box,
  BoxProps,
  Text,
  Flex,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { TfiAnnouncement } from "react-icons/tfi";
import NavItem from "./NavItem";

interface SideNavProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const SideNav = ({ onClose, ...rest }: SideNavProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [navItems, setNavItems] = useState([]);

  console.log("******* active step", activeStep);
  const [userInfo, setUserInfo] = useState({});
  const AdminLinks = [
    { name: "Dashboard", icon: FiHome, path: "/dashboard" },
    { name: "Announcements", icon: TfiAnnouncement, path: "/announcements" },
    { name: "FAQs", icon: FiTrendingUp, path: "/faq" },
    { name: "Tickets", icon: FiCompass, path: "/tickets" },
    { name: "User Access", icon: FiStar, path: "/users" },
    { name: "Upload Data", icon: FiSettings, path: "/upload" },
  ];

  const UserItems: Array<LinkItemProps> = [
    { name: "Tickets", icon: FiCompass, path: "/tickets" },
    { name: "FAQ's", icon: FiTrendingUp, path: "/user-faq" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo") as string);
    setUserInfo(user);
    const nav = user?.role === "user" ? UserItems : AdminLinks;
    setNavItems(nav as any);
  }, []);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mt="6"
      >
        <Text
          fontSize="3xl"
          fontFamily="'Great Vibes', cursive"
          fontWeight="bold"
          textColor={"purple.900"}
        >
          I-Ticket.
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {navItems.map((link: any, index) => (
        <NavItem
          key={link.name}
          index={index}
          icon={link.icon}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          path={link.path}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SideNav;
