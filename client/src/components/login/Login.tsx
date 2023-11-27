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
  FormErrorMessage,
} from "@chakra-ui/react";
import wall from "../assets/wall.png";
import { useState } from "react";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupData, setSignupData] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const prepareSignUpData = () => {
    return {
      ...signupData,
      role: "user",
    };
  };

  const loginClicked = () => {
    if (
      (loginData as any)?.email?.length > 0 &&
      (loginData as any)?.password?.length > 0
    )
      axios
        .post(PUBLIC_URL + "/users/login", loginData)
        .then((response) => {
          message.success("User logged in success..!");
          localStorage.setItem(
            "userInfo",
            JSON.stringify(response.data.users[0])
          );
          localStorage.setItem("isActive", "ACTIVE");
          localStorage.setItem("announcements", JSON.stringify([]));

          if (response.data.users[0]?.role === "user") {
            navigate("/tickets");
          } else {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          message.error("Failed to login, please try again..!");
          localStorage.setItem("isActive", "INACTIVE");
        });
  };

  const onSignupClicked = () => {
    const payload = prepareSignUpData();
    if (
      (signupData as any)?.password?.length > 0 &&
      (signupData as any)?.email?.length > 0 &&
      (signupData as any)?.firstName?.length > 0 &&
      (signupData as any)?.lastName?.length > 0 &&
      (signupData as any)?.confirmPassword?.length > 0
    )
      if (
        ((signupData as any)?.password, (signupData as any)?.confirmPassword)
      ) {
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

  console.log("********** from data:", signupData);

  return (
    <Flex direction={"column"} alignItems={"center"} w={"100%"}>
      <Box h="350px" w="100%" overflow={"hidden"}>
        <Image src={wall} w={"100%"} height={"65vh"} opacity={0.89} />
      </Box>

      <Flex
        direction={"column"}
        bg="hsla(0, 0%, 100%, 0.8)"
        rounded={"md"}
        px="12"
        py="10"
        mt={"-52"}
        backdropFilter="auto"
        backdropBlur="2px"
        width={"70%"}
        minH={"70vh"}
        shadow={"lg"}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          mb="6"
          fontSize={"3xl"}
        >
          {" "}
          <Text>Welcome to</Text>
          <Text
            mx="2"
            fontSize="3xl"
            fontFamily="'Great Vibes', cursive"
            fontWeight="bold"
            textColor={"purple.900"}
          >
            I-Ticket
          </Text>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={6} mt="2">
          <GridItem>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading fontSize={"2xl"}>Login</Heading>
              <FormControl
                id="email"
                isRequired={true}
                isInvalid={(loginData as any)?.email?.length === 0}
              >
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  borderColor={"gray.500"}
                  onChange={(e) => {
                    setLoginData({ ...loginData, email: e.target.value });
                  }}
                />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isRequired={true}
                isInvalid={(loginData as any)?.password?.length === 0}
              >
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  Password
                </FormLabel>
                <Input
                  type="password"
                  borderColor={"gray.500"}
                  onChange={(e) => {
                    setLoginData({ ...loginData, password: e.target.value });
                  }}
                />
                <FormErrorMessage>Password is required.</FormErrorMessage>
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
              <FormControl
                id="firstName"
                isRequired={true}
                isInvalid={(signupData as any)?.firstName?.length === 0}
              >
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  borderColor={"gray.500"}
                  onChange={(e) => {
                    setSignupData({ ...signupData, firstName: e.target.value });
                  }}
                />
                <FormErrorMessage>First Name is required.</FormErrorMessage>
              </FormControl>
              <FormControl
                id="lastName"
                isRequired={true}
                isInvalid={(signupData as any)?.lastName?.length === 0}
              >
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  borderColor={"gray.500"}
                  onChange={(e) => {
                    setSignupData({ ...signupData, lastName: e.target.value });
                  }}
                />
                <FormErrorMessage>Last Name is required.</FormErrorMessage>
              </FormControl>
              <FormControl
                id="email"
                isRequired={true}
                isInvalid={(signupData as any)?.email?.length === 0}
              >
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  borderColor={"gray.500"}
                  onChange={(e) => {
                    setSignupData({ ...signupData, email: e.target.value });
                  }}
                />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isRequired={true}
                isInvalid={(signupData as any)?.password?.length === 0}
              >
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  Password
                </FormLabel>
                <Input
                  type="password"
                  borderColor={"gray.500"}
                  onChange={(e) => {
                    setSignupData({ ...signupData, password: e.target.value });
                  }}
                />
                <FormErrorMessage>Password is required.</FormErrorMessage>
              </FormControl>
              <FormControl
                id="confirmPassword"
                isRequired={true}
                isInvalid={(signupData as any)?.confirmPassword?.length === 0}
              >
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  Confirm Password
                </FormLabel>
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
                <FormErrorMessage>
                  Confirm Password is required.
                </FormErrorMessage>
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
    </Flex>
  );
};

export default Login;
