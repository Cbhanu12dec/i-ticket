"use client";

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

const Login = () => {
  console.log("show signup");
  return (
    <Flex direction={"column"} alignItems={"center"}>
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
              <Input type="email" borderColor={"gray.500"} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" borderColor={"gray.500"} />
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
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack spacing={4} width={"100%"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" borderColor={"gray.500"} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" borderColor={"gray.500"} />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" borderColor={"gray.500"} />
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
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Login;
