import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import wall from "../assets/wall.png";
import { useState } from "react";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupData, setSignupData] = useState({});
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const prepareSignUpData = () => {
    return {
      ...signupData,
      role: "user",
    };
  };

  const loginClicked = () => {
    axios
      .post(PUBLIC_URL + "/users/login", loginData)
      .then((response) => {
        message.success("User logged in success..!");
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.users[0])
        );
        localStorage.setItem("isActive", "ACTIVE");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        message.error("Failed to login, please try again..!");
        localStorage.setItem("isActive", "INACTIVE");
      });
  };

  const onSignupClicked = () => {
    const payload = prepareSignUpData();
    if (((signupData as any)?.password, (signupData as any)?.confirmPassword)) {
      axios
        .post(PUBLIC_URL + "/users/signup", payload)
        .then((response) => {
          message.success("Account created successfully..!");
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          message.error("Error while creating account..!");
        });
    }
  };

  return (
    <Flex direction={"column"} alignItems={"center"} w={"100%"}>
      <Box h="350px" w="100%" overflow={"hidden"}>
        <Image src={wall} w={"100%"} height={"60vh"} opacity={0.89} />
      </Box>

      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        bg="hsla(0, 0%, 100%, 0.8)"
        rounded={"md"}
        px="12"
        py="10"
        mt={"-48"}
        backdropFilter="auto"
        backdropBlur="2px"
        width={"70%"}
        minH={"70vh"}
        shadow={"lg"}
      >
        <GridItem>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Login</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                borderColor={"gray.500"}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                borderColor={"gray.500"}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"end"}
                alignItems={"end"}
                justify={"space-between"}
              >
                <Text color="purple.800" cursor={"pointer"}>
                  Forgot password?
                </Text>
              </Stack>
              <Button
                bg="purple.800"
                color={"white"}
                _hover={{
                  color: "white",
                  bg: "purple.700",
                }}
                variant={"solid"}
                onClick={loginClicked}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack spacing={4} width={"100%"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                borderColor={"gray.500"}
                onChange={(e) => {
                  setSignupData({ ...signupData, firstName: e.target.value });
                }}
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                borderColor={"gray.500"}
                onChange={(e) => {
                  setSignupData({ ...signupData, lastName: e.target.value });
                }}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                borderColor={"gray.500"}
                onChange={(e) => {
                  setSignupData({ ...signupData, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                borderColor={"gray.500"}
                onChange={(e) => {
                  setSignupData({ ...signupData, password: e.target.value });
                }}
              />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                borderColor={"gray.500"}
                onChange={(e) => {
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  });
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg="purple.800"
                color={"white"}
                _hover={{
                  color: "white",
                  bg: "purple.700",
                }}
                variant={"solid"}
                onClick={onSignupClicked}
              >
                Create Account
              </Button>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Login;
