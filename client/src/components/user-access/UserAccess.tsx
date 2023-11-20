import {
  Flex,
  Input,
  Text,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Image,
  HStack,
} from "@chakra-ui/react";
import access from "../assets/useraccess.svg";

import React, { useEffect, useState } from "react";
import { PUBLIC_URL } from "../common/utils";
import axios from "axios";
import _ from "lodash";
import { message } from "antd";

function UserAccess() {
  const [showUserAccess, setShowUserAccess] = useState<boolean>(false);
  const [userAccessEmail, setUserAccessEmail] = useState<string>("");
  const [userAccessInfo, setUserAccessInfo] = useState();

  const getUserAccessByEmail = () => {
    axios
      .get(PUBLIC_URL + "/users/get-user-by-email", {
        params: {
          email: userAccessEmail,
        },
      })
      .then((response) => {
        setUserAccessInfo(response.data.userInfo[0]);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  const onSubmitClicked = () => {
    axios
      .put(PUBLIC_URL + "/users/update-user-access", {
        userAccessInfo,
      })
      .then((response) => {
        message.success("User access updated successfully...!");
        setShowUserAccess(false);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        message.error("Error while updating user access...!");
        setShowUserAccess(false);
      });
  };
  return (
    <Flex direction={"column"} alignItems={"start"} w="100%" mx="12" my="6">
      <Text fontSize={"2xl"} fontWeight={"semibold"}>
        User Access Dashboard
      </Text>
      <Flex
        mt="6"
        bg="white"
        rounded={"md"}
        shadow={"md"}
        minW={"90%"}
        px="6"
        py="6"
        direction={"row"}
      >
        <Flex direction={"column"} alignItems={"start"} p="2" minW={"50%"}>
          <Flex
            direction={"column"}
            alignItems={"start"}
            w="100%"
            bg="#f1f5fa"
            p="4"
            rounded={"md"}
          >
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              My Access Details:
            </Text>
            <Divider
              my="3"
              borderColor={"purple.800"}
              opacity={0.2}
              variant={"dashed"}
              borderWidth={0.2}
            />
            <Text>Name: Bhanu Cheryala</Text>
            <Text my="3">Email: bcheryala@albany.edu</Text>
            <Text>My Acccess: ADMIN</Text>
          </Flex>
          <Flex
            mt="6"
            direction={"column"}
            fontSize={"lg"}
            fontWeight={"semibold"}
            bg="#f1f5fa"
            p="4"
            w="100%"
            alignItems={"start"}
            rounded={"md"}
          >
            <Text>Do you want to update access to Anyone?</Text>
            <Divider
              my="3"
              borderColor={"purple.800"}
              opacity={0.2}
              variant={"dashed"}
              borderWidth={0.2}
            />
            <Flex width={"100%"} mt="3">
              <Input
                placeholder="Enter email"
                maxW={"72"}
                borderColor={"gray.400"}
                _placeholder={{ color: "purple.800" }}
                // opacity={0.2}
                onChange={(e) => setUserAccessEmail(e.target.value)}
              />
              <Button
                bg={"purple.800"}
                _hover={{ bg: "purple.700" }}
                color={"white"}
                onClick={() => {
                  setShowUserAccess(true);
                  getUserAccessByEmail();
                }}
                mx="4"
              >
                Get Access
              </Button>
            </Flex>
          </Flex>
        </Flex>{" "}
        <Image src={access} maxW={"96"} ml={"32"} />
      </Flex>

      <Modal
        isOpen={showUserAccess}
        onClose={() => setShowUserAccess(false)}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            User Access - {_.capitalize((userAccessInfo as any)?.lastName)}{" "}
            {_.capitalize((userAccessInfo as any)?.firstName)}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody bg="#f1f5fa" p="4" rounded={"md"} mx="6" my="6">
            <form>
              <HStack my="3">
                <Text>First Name: </Text>
                <Text fontWeight={"semibold"} textColor={"purple.800"}>
                  {_.capitalize((userAccessInfo as any)?.firstName)}
                </Text>
              </HStack>
              <HStack>
                <Text>Last Name:</Text>
                <Text fontWeight={"semibold"} textColor={"purple.800"}>
                  {_.capitalize((userAccessInfo as any)?.lastName)}
                </Text>
              </HStack>
              <HStack my="3">
                <Text>Email: </Text>
                <Text fontWeight={"semibold"} textColor={"purple.800"}>
                  {(userAccessInfo as any)?.email}
                </Text>
              </HStack>

              <Text>Level:</Text>
              <Select
                placeholder="Select access level"
                size={"md"}
                my="3"
                defaultValue={"student"}
                value={(userAccessInfo as any)?.role}
                onChange={(e) =>
                  setUserAccessInfo({
                    ...(userAccessInfo as any),
                    role: e.target.value,
                  })
                }
              >
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </form>
          </ModalBody>
          <Divider />

          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={2}
              onClick={() => setShowUserAccess(false)}
            >
              Close
            </Button>
            <Button
              variant="solid"
              bg={"purple.800"}
              _hover={{ bg: "purple.700" }}
              color={"white"}
              onClick={onSubmitClicked}
            >
              Update Access
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default UserAccess;
