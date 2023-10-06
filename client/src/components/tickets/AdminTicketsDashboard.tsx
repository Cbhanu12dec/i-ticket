import {
  Divider,
  Flex,
  Grid,
  GridItem,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Segmented } from "antd";
import data from "./data.json";

const AdminTicketsDashboard = () => {
  return (
    <Flex direction={"column"}>
      <Text>Tickets Dashboard</Text>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem
          colSpan={2}
          w="100%"
          bg="white"
          p="4"
          rounded={"lg"}
          shadow={"lg"}
        >
          <Flex w="100%" direction={"column"}>
            <Text
              textColor={"purple.800"}
              fontSize={"xl"}
              fontWeight={500}
              mb="4"
            >
              View your Tickets
            </Text>
            <Segmented
              block
              options={["New", "Opened", "Completed", "Drafts"]}
            />
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
                <Flex direction={"column"} p="2" align={"start"} cursor={"pointer"}>
                  <Text textColor={"purple.800"} fontWeight={"semibold"}>
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
          <Flex direction={"column"} justifyContent={"start"}>
            <Text
              textColor={"purple.800"}
              fontSize={"xl"}
              fontWeight={500}
              mb="4"
            >
              Detail Information about Ticket
            </Text>
            <Divider />

            <VStack mt="6" px="4" align={"start"}>
              <Text textColor={"purple.800"} fontSize={"lg"} fontWeight={"semibold"}>{data[0]?.title}</Text>
              <Text fontSize={"sm"}>PRIORITY: {"LOW"}</Text>
              <Text fontSize={"sm"}>PRIORITY: {"LOW"}</Text>
              <Text fontSize={"sm"}>DESCRIPTION: {data[0].description}</Text>
            </VStack>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default AdminTicketsDashboard;
