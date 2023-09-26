import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  activeStep: number;
  index: number;
  setActiveStep: (step: number) => void;
  children: React.ReactNode;
}

const NavItem = ({
  icon,
  activeStep,
  setActiveStep,
  index,
  children,
  ...rest
}: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      shadow={activeStep === index ? "xl" : "none"}
      onClick={() => setActiveStep(index)}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={activeStep === index ? "purple.900" : "white"}
        shadow={activeStep === index ? "xl" : "none"}
        textColor={activeStep === index ? "white" : "purple.900"}
        _hover={{
          bg: "purple.900",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default NavItem;
