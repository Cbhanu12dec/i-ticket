import React, { useState } from "react";
import TableContainer from "../common/TableContainer";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ColumnsType, TableProps } from "antd/es/table";
import CreatAnnouncement from "./CreateAnnouncement";
import { universityAnnouncements } from "../data/Announcements";

interface DataType {
  key: React.Key;
  title: string;
  description: string;
  status: string;
  startDate: string;
  completeDate: string;
  accessLevel: string;
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
          text: "Upcomming",
          value: "Upcomming",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value as any),
      filterSearch: true,
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

  const announcementStats = () => {
    return (
      <Flex
        px="10"
        py="4"
        direction={"column"}
        bg="white"
        w="100%"
        shadow={"md"}
        rounded={"md"}
      >
        <Text>Total</Text>
        <Text>100</Text>
      </Flex>
    );
  };
  return (
    <Flex direction={"column"} mx="10">
      <Flex justifyContent={"space-between"} alignItems={"center"} my="4">
        <Text fontSize={"lg"} fontWeight={600}>
          {"Announcements Dashboard"}
        </Text>
        <Button
          bg="purple.900"
          color={"white"}
          _hover={{ bg: "purple.800" }}
          onClick={() => setShowModal(true)}
        >
          Create Announcements
        </Button>
      </Flex>
      <HStack width={"100%"} justifyContent={"space-between"} gap={10}>
        {[1, 2, 3, 4]?.map((item) => {
          return announcementStats();
        })}
      </HStack>

      <TableContainer
        columns={columns}
        dataSource={universityAnnouncements as DataType[]}
        onChange={onChange}
      />
      <CreatAnnouncement showModal={showModal} setShowModal={setShowModal} />
    </Flex>
  );
};

export default Announcement;
