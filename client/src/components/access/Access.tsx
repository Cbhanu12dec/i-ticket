import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { BsPersonExclamation } from "react-icons/bs";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

function Access() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem w="100%">
        <Flex
          p="4"
          bg="white"
          rounded={"md"}
          direction={"column"}
          alignItems={"start"}
        >
          {/* <Text
            fontSize={"xl"}
            fontWeight={"semibold"}
            textColor={"purple.800"}
          >
            User Access
          </Text>
          <Divider my="3" /> */}
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            My Access
          </Text>
          <Divider my="2" />

          <FormControl mt="2">
            <FormLabel>Username:</FormLabel>
            <Input
              placeholder="username"
              value={"Bhanu Cheryala"}
              disabled={true}
            />
          </FormControl>
          <FormControl mt="2">
            <FormLabel>Email:</FormLabel>
            <Input
              placeholder="email"
              value={"bcheryala@albany.edu"}
              disabled={true}
            />
          </FormControl>
          <FormControl mt="2">
            <FormLabel>Access:</FormLabel>
            <Input placeholder="access" value={"Super Admin"} disabled={true} />
          </FormControl>
        </Flex>
        <Flex
          mt="6"
          p="4"
          bg="white"
          rounded={"md"}
          direction={"column"}
          alignItems={"start"}
        >
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Update User Access
          </Text>
          <Divider my="2" />
          <Flex w="full" gap={3} alignItems={"end"}>
            <FormControl mt="2">
              <FormLabel>Username:</FormLabel>
              <Input placeholder="Enter user name" />
            </FormControl>
            <Button
              bg="purple.800"
              color={"white"}
              _hover={{ bg: "purple.700" }}
              leftIcon={<BsPersonExclamation />}
              minW={"52"}
            >
              Get User Details
            </Button>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem w="100%">
        <Flex rounded={"md"} padding={"5"} w={"full"} bg="white">
          {/* <Flex
            width={"full"}
            border={"1px solid"}
            borderStyle={"dashed"}
            borderColor={"gray.500"}
            justifyContent={"center"}
            alignItems={"center"}
            minH={"64"}
            rounded={"md"}
          >
            <Text> No user data..!</Text>
          </Flex> */}
          <Flex direction={"column"} w="full" alignItems={"start"}>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Retreived User Info :
            </Text>
            <Divider my="2" />
            <FormControl mt="2">
              <FormLabel>Username:</FormLabel>
              <Input placeholder="username" value={"Bhanu Cheryala"} />
            </FormControl>
            <FormControl mt="2">
              <FormLabel>Email:</FormLabel>
              <Input placeholder="email" value={"bcheryala@albany.edu"} />
            </FormControl>
            <FormControl mt="2">
              <FormLabel>Access:</FormLabel>
              <Select placeholder="Select option">
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </Select>
            </FormControl>
            <Button
              bg="purple.800"
              color={"white"}
              mt="4"
              _hover={{ bg: "purple.700" }}
              leftIcon={<AiOutlineCheck />}
              minW={"52"}
            >
             Update user access
            </Button>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default Access;
