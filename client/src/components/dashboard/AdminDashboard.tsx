import { Flex, GridItem, HStack, Icon, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { statsChartData } from "./test-data";
import { IoIosStats } from "react-icons/io";

function AdminDashboard() {
    const [statsData, setStatsData] = useState(  {
        total: 100,
        active: 63,
        inactive: 30,
        scheduled: 7,
      });

  const StatsCard = () => {
    return (
      <Flex direction={"column"} bg="white" p="6" rounded={"lg"} minW={"72"} minH={"32"}>
        <Text> Title</Text>
      </Flex>
    );
  };

  const StatusProps = (prop: string) => {
    if (prop === "total") return "Total";
    else if (prop === "active") return "Active";
    else if (prop === "inactive") return "In Active";
    else if (prop === "scheduled") return "Scheduled";
  }

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
              width={280}
              height={150}
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
              <Icon as={IoIosStats} boxSize={14} textShadow="0 0 10px black" />
              <Stat>
                <StatLabel fontSize={"xl"} textShadow="0 0 10px black">
                  {StatusProps(item[0])}
                </StatLabel>
                <StatNumber fontSize={"4xl"} textShadow="0 0 10px black">
                  {item[1]}
                </StatNumber>
              </Stat>
            </HStack>
          </Flex>
        </GridItem>
      );
    });
  };
  return <Flex w="full" gap={6}>
   {getStatusComponent()}
  </Flex>
}

export default AdminDashboard;
