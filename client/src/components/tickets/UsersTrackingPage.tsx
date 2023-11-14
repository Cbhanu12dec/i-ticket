import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Steps } from "antd";
import React from "react";

const UsersTrackingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button bg="purple.800" color={"white"} onClick={onOpen}>
        Create user
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Steps
              direction="vertical"
              current={1}
              items={[
                {
                  title: "Created Ticket",
                  description: "Created At 10/20/2023.",
                },
                {
                  title: "Wating for Accept",
                  description: "Ticket is not yet viewed....",
                },
                {
                  title: "In Progress",
                  description: "Check any commentes are posted..",
                },
                {
                  title: "Completed",
                  description: "Open ticket to view the action.",
                },
              ]}
            />
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UsersTrackingPage;
