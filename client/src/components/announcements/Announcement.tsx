import React, { useEffect, useState } from "react";
import TableContainer from "../common/TableContainer";
import { Button, Flex, HStack, Text, Divider } from "@chakra-ui/react";
import { ColumnsType, TableProps } from "antd/es/table";
import CreatAnnouncement from "./CreateAnnouncement";
import { TbClockExclamation } from "react-icons/tb";
import { TfiAlarmClock, TfiAnnouncement } from "react-icons/tfi";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import {
  prepareAnnouncements,
  prepareAnnouncementsStats,
} from "../common/prepare-data";
import { AnnouncementDataType, AnnouncementsStats } from "../common/data-types";
import _ from "lodash";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Dashboard from "../dashboard/Dashboard";
import { message } from "antd";
import dayjs from "dayjs";
export interface EditType {
  forEdit: boolean;
  data: Partial<AnnouncementDataType>;
}
const Announcement = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState([]);
  const [editAnnouncement, setEditAnnoucement] = useState<EditType>({
    forEdit: false,
    data: {},
  });
  const [announcementsStatsData, setAnnouncementsStats] =
    useState<AnnouncementsStats>({
      total: 0,
      running: 0,
      published: 0,
      upcomming: 0,
    });

  const columns: ColumnsType<AnnouncementDataType> = [
    {
      title: "Title",
      dataIndex: "title",
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
        {
          text: "Running",
          value: "Running",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value as any),
      filterSearch: true,
      render: (text, record) =>
        text === "Published" ? (
          <Flex
            bg="green"
            py="2"
            px="2"
            textColor={"white"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TfiAlarmClock size={16} />
            <Text mx="1">{text}</Text>
          </Flex>
        ) : text === "Running" ? (
          <Flex
            bg="orange"
            py="2"
            px="2"
            textColor={"white"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TfiAlarmClock size={16} />
            <Text mx="1">{text}</Text>
          </Flex>
        ) : (
          <Flex
            bg="red"
            py="2"
            px="2"
            textColor={"white"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TbClockExclamation size={18} />
            <Text mx="1">{text}</Text>
          </Flex>
        ),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (text, record) => (
        <Text>{dayjs(text).format("MM-DD-YYYY hh:MMA")}</Text>
      ),
    },
    {
      title: "End time",
      dataIndex: "endTime",
      render: (text, record) => (
        <Text>{dayjs(text).format("MM-DD-YYYY hh:MMA")}</Text>
      ),
    },
    {
      title: "Published To",
      dataIndex: "assignee",
      render: (text, record) => (
        <Text textColor={"purple.800"} fontWeight={"semibold"}>
          {_.capitalize(text)}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <HStack gap={2}>
          <FiEdit
            size={18}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowModal(true);
              setEditAnnoucement({
                forEdit: true,
                data: record,
              });
            }}
          />
          <MdDeleteOutline
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => onDeleteClicked(record.id)}
          />
        </HStack>
      ),
    },
  ];

  const onChange: TableProps<AnnouncementDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const getIcons = (name: string) => {
    if (name === "total") {
      return (
        <Flex bg="orange.400" rounded={"full"} p="4">
          <AiOutlineCodeSandbox size={40} />
        </Flex>
      );
    } else if (name === "running") {
      return (
        <Flex bg="green.400" rounded={"full"} p="4">
          <TfiAlarmClock size={40} />
        </Flex>
      );
    } else if (name === "published") {
      return (
        <Flex bg="#3182ce" rounded={"full"} p="4">
          <TbClockExclamation size={40} />
        </Flex>
      );
    } else {
      return (
        <Flex bg="orange.500" rounded={"full"} p="4">
          <TbClockExclamation size={40} />
        </Flex>
      );
    }
  };

  const announcementStats = (name: string, value: number) => {
    return (
      <Flex
        key={name}
        px="10"
        py="4"
        minH={"32"}
        w="100%"
        rounded={"md"}
        alignItems={"center"}
      >
        {getIcons(name)}
        <Flex direction={"column"} alignItems={"start"} mx="4">
          <Text textColor={"gray.800"}>{_.capitalize(name)}</Text>
          <Text textColor={"gray.600"} fontSize={"5xl"} fontWeight={"bold"}>
            {value}
          </Text>
        </Flex>
      </Flex>
    );
  };

  const onDeleteClicked = (id: string) => {
    axios
      .delete(PUBLIC_URL + "/announcement/delete-announcement", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setAnnouncements(response.data.announcements);
        setAnnouncementsStats(
          prepareAnnouncementsStats(
            prepareAnnouncements(response.data.announcements)
          ) as AnnouncementsStats
        );
        message.success("Deleted Announcement successfully..!");
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        message.error("Failed to delete Announcement..!");
      });
  };

  useEffect(() => {
    axios
      .get(PUBLIC_URL + "/announcement/announcements")
      .then((response) => {
        setAnnouncements(response.data.announcements);
        setAnnouncementsStats(
          prepareAnnouncementsStats(
            prepareAnnouncements(response.data.announcements)
          ) as AnnouncementsStats
        );
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <Dashboard>
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
          px="6"
          direction={"column"}
          alignItems={"start"}
          py="4"
          // bgGradient="linear(to top, #09203f 0%, #537895 100%)"
          // bgGradient="linear(to-br, #243949 10%, #517fa4 80%)"
          bgGradient="linear(to bottom, #cfd9df 0%, #e2ebf0 100%);"
        >
          <Text
            // textColor={"white"}
            textColor={"gray.900"}
            fontSize={"lg"}
            letterSpacing={"wide"}
            fontWeight={"semibold"}
            lineHeight={"tall"}
          >
            Announcement Metrics
          </Text>
          <Divider my="2" borderColor={"gray.400"} />
          <HStack w="full">
            {Object.entries(announcementsStatsData).map(([key, value]) => {
              return announcementStats(key, value);
            })}
          </HStack>
        </Flex>

        <TableContainer
          columns={columns}
          dataSource={prepareAnnouncements(announcements)}
          onChange={onChange}
          pagination={{ pageSize: 5 }}
        />
        <CreatAnnouncement
          showModal={showModal}
          setShowModal={setShowModal}
          edit={editAnnouncement}
          setEdit={setEditAnnoucement}
          setAnnouncements={setAnnouncements}
          setAnnouncementsStats={setAnnouncementsStats}
          setEditAnnoucement={setEditAnnoucement}
        />
      </Flex>
    </Dashboard>
  );
};

export default Announcement;
