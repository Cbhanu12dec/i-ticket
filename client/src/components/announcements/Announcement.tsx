import React, { useState } from "react";
import TableContainer from "../common/TableContainer";
import { Button, Flex, HStack, Text, Divider } from "@chakra-ui/react";
import { ColumnsType, TableProps } from "antd/es/table";
import CreatAnnouncement from "./CreateAnnouncement";
import { universityAnnouncements } from "../data/Announcements";
import { TbClockExclamation } from "react-icons/tb";
import { TfiAlarmClock, TfiAnnouncement } from "react-icons/tfi";
import { AiOutlineCodeSandbox } from "react-icons/ai";
interface DataType {
  key: React.Key;
  title: string;
  description: string;
  status: string;
  startDate: string;
  completeDate: string;
  accessLevel: string;
}
interface AnnouncementMetrics {
  TOTAL: "Total";
  PUBLISHED: "Published";
  UPCOMING: "Upcoming";
}

const Announcement = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.title.startsWith(value as any),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Published",
          value: "Published",
        },
        {
          text: "Upcoming",
          value: "Upcoming",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value as any),
      filterSearch: true,
      render: (text, record) =>
        text === "Published" ? (
          <Flex
            bg="green"
            py="2"
            px="3"
            textColor={"white"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
          >
            <TfiAlarmClock size={16} />
            <Text mx="1">{text}</Text>
          </Flex>
        ) : (
          <Flex
            bg="red"
            py="2"
            px="3"
            textColor={"white"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
          >
            <TbClockExclamation size={18} />
            <Text mx="1">{text}</Text>
          </Flex>
        ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "complete Date",
      dataIndex: "completeDate",
    },
    {
      title: "Access Level",
      dataIndex: "accessLevel",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const getIcons = (name: string) => {
    if (name === "Total") {
      return (
        <Flex bg="orange.400" rounded={"full"} p="4">
          <AiOutlineCodeSandbox size={40} />
        </Flex>
      );
    } else if (name === "Published") {
      return (
        <Flex bg="green.400" rounded={"full"} p="4">
          <TfiAlarmClock size={40} />
        </Flex>
      );
    } else {
      return (
        <Flex bg="purple.500" rounded={"full"} p="4">
          <TbClockExclamation size={40} />
        </Flex>
      );
    }
  };

  const announcementStats = (name: string) => {
    return (
      <Flex
        px="10"
        py="4"
        minH={"32"}
        w="100%"
        rounded={"md"}
        alignItems={"center"}
      >
        {getIcons(name)}
        <Flex direction={"column"} alignItems={"start"} mx="4">
          <Text textColor={"gray.300"}>{name}</Text>
          <Text textColor={"gray.100"} fontSize={"5xl"} fontWeight={"bold"}>
            100
          </Text>
        </Flex>
      </Flex>
    );
  };
  return (
    <Flex direction={"column"} mx="6">
      <Flex justifyContent={"space-between"} alignItems={"center"} my="4">
        <Text
          fontSize={"2xl"}
          fontWeight={600}
          fontFamily={"Questrial', sans-serif"}
        >
          {"Announcements Dashboard"}
        </Text>
        <Button
          bg="purple.900"
          color={"white"}
          _hover={{ bg: "purple.800" }}
          onClick={() => setShowModal(true)}
          leftIcon={<TfiAnnouncement />}
        >
          Create Announcements
        </Button>
      </Flex>
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        bg="white"
        rounded={"lg"}
        // border="1.5px solid"
        // borderColor={"gray.200"}
        px="6"
        direction={"column"}
        alignItems={"start"}
        py="4"
        // bgGradient="linear(to top, #09203f 0%, #537895 100%)"
        // bgGradient="linear(to-br, #243949 10%, #517fa4 80%)"
        bgGradient="linear(to top, #868f96 0%, #596164 100%);"
      >
        <Text
          // textColor={"white"}
          textColor={"gray.300"}
          fontSize={"lg"}
          letterSpacing={"wide"}
          fontWeight={"semibold"}
          lineHeight={"tall"}
        >
          Announcement Metrics
        </Text>
        <Divider my="2" borderColor={"gray.200"} />
        <HStack w="full">
          {["Total", "Published", "Upcoming"]?.map((item) => {
            return announcementStats(item);
          })}
        </HStack>
      </Flex>

      <TableContainer
        columns={columns}
        dataSource={universityAnnouncements as DataType[]}
        onChange={onChange}
        pagination={{ pageSize: 5 }}
      />
      <CreatAnnouncement showModal={showModal} setShowModal={setShowModal} />
    </Flex>
  );
};

export default Announcement;
