import {
  Divider,
  Flex,
  Grid,
  GridItem,
  StackDivider,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Segmented } from "antd";
import data from "./data.json";
import { useState } from "react";

const AdminTicketsDashboard = () => {
  return (
    <Flex direction={"column"} alignItems={"start"} mx="4" my="3">
      <Text fontSize={"2xl"} fontWeight={"semibold"} mb="3">
        Tickets Dashboard
      </Text>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem
          colSpan={2}
          w="100%"
          bg="white"
          p="4"
          rounded={"lg"}
          shadow={"lg"}
        >
          <Flex w="100%" direction={"column"} alignItems={"start"}>
            <Text
              textColor={"purple.800"}
              fontSize={"xl"}
              fontWeight={500}
              mb="4"
            >
              View your Tickets
            </Text>
            <Segmented options={["New", "Opened", "Completed", "Drafts"]} />
          </Flex>
          <VStack
            divider={<StackDivider />}
            mt="5"
            maxH={"xl"}
            overflow={"scroll"}
            alignItems={"start"}
          >
            {data?.map((item, index) => {
              return (
                <Flex
                  direction={"column"}
                  p="2"
                  rounded={"md"}
                  width={"100%"}
                  align={"start"}
                  cursor={"pointer"}
                  bg={index === 0 ? "purple.800" : "white"}
                  color={index === 0 ? "white" : "black"}
                >
                  <Text
                    textColor={index === 0 ? "white" : "purple.800"}
                    fontWeight={"semibold"}
                  >
                    {item.title}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"hairline"}
                    fontStyle={"italic"}
                  >
                    {item.description}
                  </Text>
                </Flex>
              );
            })}
          </VStack>
        </GridItem>
        <GridItem
          w="100%"
          bg="white"
          p="4"
          rounded={"lg"}
          shadow={"lg"}
          colSpan={4}
        >
          <Flex direction={"column"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text
                textColor={"purple.800"}
                fontSize={"xl"}
                fontWeight={500}
                mb="4"
              >
                Detail Information about Ticket
              </Text>
              <Tag size={"sm"} colorScheme="green">
                {" "}
                OPEN
              </Tag>
            </Flex>

            <Divider />

            <VStack
              mt="4"
              px="6"
              align={"start"}
              bg="#f1f5fa"
              rounded={"md"}
              py="6"
              minH={"80"}
            >
              <Flex justifyContent={"space-between"} w="100%">
                <Text
                  textColor={"purple.800"}
                  fontSize={"lg"}
                  fontWeight={"semibold"}
                >
                  {data[0]?.title}
                </Text>
                <Text
                  textColor={"purple.800"}
                  fontSize={"lg"}
                  fontWeight={"semibold"}
                >
                  {"#0012113"}
                </Text>
              </Flex>

              <Text fontSize={"sm"}>PRIORITY: {"LOW"}</Text>
              <Text fontSize={"sm"}> {data[0].description}</Text>
            </VStack>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default AdminTicketsDashboard;
