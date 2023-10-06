import {
  Box,
  BoxProps,
  Text,
  Flex,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
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
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, path: "/" },
  { name: "Announcements", icon: TfiAnnouncement, path: "/announcements" },
  { name: "Faq's", icon: FiTrendingUp, path: "/faq" },
  { name: "Tickets", icon: FiCompass, path: "/tickets" },
  { name: "User Access", icon: FiStar, path: "/users" },
  { name: "Upload Data", icon: FiSettings, path: "/upload" },
];

const SideNav = ({ onClose, ...rest }: SideNavProps) => {
  const [activeStep, setActiveStep] = useState(1);
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
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
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
      {LinkItems.map((link, index) => (
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
