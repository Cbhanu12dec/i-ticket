import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { statsChartData } from "./test-data";
import { IoIosStats } from "react-icons/io";
import Dashboard from "./Dashboard";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import { message } from "antd";
import _ from "lodash";
import { FaCubes, FaInbox, FaUsers } from "react-icons/fa6";
import { prepareAnnouncements } from "../common/prepare-data";
import { BsDatabaseX } from "react-icons/bs";

function AdminDashboard() {
  const [statsData, setStatsData] = useState<{
    total: number;
    active: number;
    completed: number;
    deleted: number;
  }>({
    total: 0,
    active: 0,
    completed: 0,
    deleted: 0,
  });

  const [userStats, setUsersStats] = useState<{
    total: number;
    admin: number;
    users: number;
  }>({ total: 0, admin: 0, users: 0 });

  const [faqStats, setFaqStats] = useState<{
    total: number;
    active: number;
    inActive: number;
  }>({
    total: 0,
    active: 0,
    inActive: 0,
  });

  const [announcements, setAnnoucements] = useState([]);

  const StatusProps = (prop: string) => {
    if (prop === "total") return "Total";
    else if (prop === "active") return "Active";
    else if (prop === "completed") return "Completed";
    else if (prop === "deleted") return "Discard";
  };

  const gradientColor = [
    "linear-gradient(to top, #30c7ec 47%, #46aef7 70%)",
    "linear-gradient(to top, #2b5876 -30%, #4e4376 70%)",
    "linear-gradient(to top, #0ba360 0%, #3cba92 40%)",
    "linear-gradient(to top, #ff0844 -30%, #ffb199 90%)",
  ];

  const getStatusComponent = () => {
    return Object.entries(statsData || {}).map((item: any, index) => {
      return (
        <GridItem colSpan={1} rowSpan={1} key={index}>
          <Flex
            bg="white"
            shadow="sm"
            px="8"
            py="5"
            rounded="md"
            alignItems={"center"}
            bgGradient={gradientColor[index]}
            textColor={"white"}
            minH="32"
            maxW={{ base: "full" }}
            position={"relative"}
            backdropFilter="brightness(50%)"
          >
            <LineChart
              width={270}
              height={130}
              data={statsChartData}
              margin={{ top: 5, bottom: 5 }}
            >
              <XAxis dataKey="name" hide={true} />
              <YAxis hide={true} />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#cccdc6"
                strokeWidth={2}
                strokeOpacity={0.3}
                dot={{ r: 2 }}
                opacity={50}
              />
            </LineChart>
            <HStack position={"absolute"} mx={10} gap={3}>
              <Icon as={IoIosStats} boxSize={24} textShadow="0 0 10px black" />
              <Stat>
                <StatLabel
                  fontSize={"2xl"}
                  textShadow="0 0 10px black"
                  mb={"0"}
                >
                  {StatusProps(item[0])}
                </StatLabel>
                <StatNumber fontSize={"7xl"} textShadow="0 0 10px black">
                  {item[1]}
                </StatNumber>
              </Stat>
            </HStack>
          </Flex>
        </GridItem>
      );
    });
  };

  useEffect(() => {
    axios
      .get(PUBLIC_URL + "/users/get-all-users")
      .then((response) => {
        const users = response.data.users;
        const statsData = users?.reduce(
          (accumulator: any, currentValue: any) => {
            if (currentValue.role === "admin") {
              accumulator.admin += 1;
            } else if (currentValue.role === "user") {
              accumulator.user += 1;
            }
            accumulator.total += 1;
            return accumulator;
          },
          { total: 0, admin: 0, user: 0 }
        );
        setUsersStats(statsData);
        // message.success("User access updated successfully...!");
        // setShowUserAccess(false);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        message.error("Error while updating user access...!");
        // setShowUserAccess(false);
      });

    axios
      .get(PUBLIC_URL + "/faq/faq-list")
      .then((response) => {
        const faqs = response.data.faq;
        const statsData = faqs?.reduce(
          (accumulator: any, currentValue: any) => {
            if (currentValue.isHidden === true) {
              accumulator.active += 1;
            } else if (currentValue.isHidden === false) {
              accumulator.inActive += 1;
            }
            accumulator.total += 1;
            return accumulator;
          },
          { total: 0, active: 0, inActive: 0 }
        );
        setFaqStats(statsData);
        // message.success("User access updated successfully...!");
        // setShowUserAccess(false);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        message.error("Error while updating user access...!");
        // setShowUserAccess(false);
      });

    axios
      .get(PUBLIC_URL + "/announcement/announcements")
      .then((response) => {
        const predata = (
          prepareAnnouncements(response.data.announcements) as any
        )?.filter((item: any) => item?.status === "Upcoming");
        setAnnoucements(prepareAnnouncements(predata) as any);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });

    axios
      .get(PUBLIC_URL + "/ticket/get-all-tickets")
      .then((response) => {
        const statsData = response.data?.ticketInfo?.reduce(
          (accumulator: any, currentValue: any) => {
            if (
              currentValue.status === "open" ||
              currentValue.status === "pending"
            ) {
              accumulator.active += 1;
            } else if (currentValue.status === "deleted") {
              accumulator.deleted += 1;
            } else if (currentValue.status === "completed") {
              accumulator.completed += 1;
            }
            accumulator.total += 1;
            return accumulator;
          },
          { total: 0, active: 0, completed: 0, deleted: 0 }
        );
        setStatsData(statsData);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <Dashboard>
      <Flex direction={"column"} alignItems={"start"} mx="2">
        <Text fontSize={"2xl"} textColor={"purple.800"} fontWeight={"semibold"}>
          Ticket Metrics
        </Text>
        <Flex w="100%" gap={6}>
          {getStatusComponent()}
        </Flex>
      </Flex>

      <Grid templateColumns="repeat(2, 2fr)" gap={4} w="95%" mt="6">
        <GridItem
          colSpan={1}
          rowSpan={2}
          w="100%"
          bg="white"
          p="4"
          mx="3"
          rounded={"lg"}
        >
          <Flex
            direction={"column"}
            alignItems={"start"}
            px="4"
            py="2"
            w="full"
          >
            <Text
              textColor={"purple.800"}
              fontWeight={"semibold"}
              fontSize={"2xl"}
              mb="0"
            >
              Upcoming Announcements
            </Text>
            <Divider my="2" />
            {announcements?.length > 0 ? (
              <VStack divider={<StackDivider />} mt="2" w="full">
                {announcements?.map((item: any) => {
                  return (
                    <Flex w="full">
                      <Text mb="0" fontSize={"lg"}>
                        {_.capitalize(item?.title)}
                      </Text>
                      <Box mx="6">
                        <div className="ui orange basic label mini">
                          Upcoming
                        </div>
                      </Box>
                    </Flex>
                  );
                })}
              </VStack>
            ) : (
              <Flex
                direction={"column"}
                w="full"
                justifyContent={"center"}
                alignItems={"center"}
                mt="10"
              >
                <BsDatabaseX size={42} />
                <Text mt="2">No Announcements scheduled...!</Text>
              </Flex>
            )}
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          w="100%"
          bg="white"
          p="4"
          rounded={"lg"}
          mx="3"
          // shadow={"lg"}
        >
          <Flex direction={"column"} alignItems={"start"} px="4" py="2">
            <Text
              textColor={"purple.800"}
              fontWeight={"semibold"}
              fontSize={"2xl"}
              mb="0"
            >
              FAQ's Metrics
            </Text>
            <Divider my="2" />
            <Flex mt="2" justifyContent={"space-between"} w="full">
              {Object.entries(faqStats)?.map(([key, value]) => {
                return (
                  <HStack mx="3">
                    <FaCubes size={40} />
                    <Flex direction={"column"}>
                      <Text
                        fontSize={"lg"}
                        letterSpacing={"wide"}
                        mb="0"
                        fontWeight={"semibold"}
                        textColor={
                          key === "active"
                            ? "green.500"
                            : key === "inActive"
                            ? "red.500"
                            : "purple.800"
                        }
                      >
                        {_.upperCase(key)}
                      </Text>
                      <Text
                        fontSize={"5xl"}
                        fontWeight={"bold"}
                        textColor={"gray.700"}
                      >
                        {value}
                      </Text>
                    </Flex>
                  </HStack>
                );
              })}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          w="100%"
          bg="white"
          p="4"
          mx="3"
          rounded={"lg"}
          // shadow={"lg"}
        >
          <Flex direction={"column"} alignItems={"start"} px="4" py="2">
            <Text
              textColor={"purple.800"}
              fontWeight={"semibold"}
              fontSize={"2xl"}
              mb="0"
            >
              Users Metrics
            </Text>
            <Divider my="2" />

            <Flex mt="2" justifyContent={"space-between"} w="full">
              {Object.entries(userStats)?.map(([key, value]) => {
                return (
                  <HStack mx="3">
                    <FaUsers size={40} />
                    <Flex direction={"column"}>
                      <Text fontSize={"lg"} letterSpacing={"wide"} mb="0">
                        {_.upperCase(key)}
                      </Text>
                      <Text
                        fontSize={"5xl"}
                        fontWeight={"bold"}
                        textColor={"gray.700"}
                      >
                        {value}
                      </Text>
                    </Flex>
                  </HStack>
                );
              })}
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Dashboard>
  );
}

export default AdminDashboard;
