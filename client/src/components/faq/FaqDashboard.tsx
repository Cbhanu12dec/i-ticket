import { Flex, HStack, Tooltip, Text } from "@chakra-ui/react";
import { TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import TableContainer from "../common/TableContainer";
import CreateFaqForm from "./CreateFaqForm";
import { AiFillEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import { prepareFaqs } from "../common/prepare-data";
import { FaqDataType } from "../common/data-types";
import PreviewFaq from "./PreviewFaq";
import Dashboard from "../dashboard/Dashboard";
import { BsPersonFillGear } from "react-icons/bs";
import _ from "lodash";

export interface EditType {
  forEdit: boolean;
  data: Partial<FaqDataType>;
}

function FaqDashboard() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [faq, setFaq] = useState([]);
  const [edit, setEdit] = useState<EditType>();
  const [previewFaq, setPreviewFaq] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<FaqDataType>();

  const columns: ColumnsType<FaqDataType> = [
    {
      title: "Title",
      dataIndex: "title",
      filterSearch: true,
      onFilter: (value, record) => record.title.startsWith(value as any),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Active",
      dataIndex: "isHidden",
      render: (text, record) =>
        text === false ? (
          <Text fontWeight={"semibold"} textColor={"red.500"}>
            {"NOT ACTIVE"}
          </Text>
        ) : (
          <Text fontWeight={"semibold"} textColor={"green.500"}>
            {"ACTIVE"}
          </Text>
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Access",
      dataIndex: "assignee",
      filters: [
        {
          text: "All",
          value: "all",
        },
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
      onFilter: (value, record) => record.assignee.startsWith(value as any),
      filterSearch: true,
      render: (text, record) =>
        text === "all" ? (
          <Flex
            border={"1.5px solid"}
            borderColor={"green.800"}
            py="1"
            textColor={"green.800"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontWeight={"semibold"}>{_.upperCase(text)}</Text>
          </Flex>
        ) : text === "admin" ? (
          <Flex
            border={"1.5px solid"}
            borderColor={"orange.800"}
            py="1"
            textColor={"orange.800"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontWeight={"semibold"}>{_.upperCase(text)}</Text>
          </Flex>
        ) : (
          <Flex
            border={"1.5px solid"}
            borderColor={"purple.800"}
            py="1"
            textColor={"purple.800"}
            rounded={"full"}
            fontSize={"xs"}
            fontWeight={"semibold"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontWeight={"semibold"}>{_.upperCase(text)}</Text>
          </Flex>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <HStack gap={2}>
          <AiFillEye
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPreviewFaq(true);
              setPreviewData(record);
            }}
          />
          <FiEdit
            size={18}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEdit({
                forEdit: true,
                data: record,
              });
              setShowModal(true);
            }}
          />
          <MdDeleteOutline
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => {
              onDeleteClicked(record?.faqNumber);
            }}
          />
        </HStack>
      ),
    },
  ];

  const onChange: TableProps<FaqDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  useEffect(() => {
    axios
      .get(PUBLIC_URL + "/faq/faq-list")
      .then((response) => {
        setFaq(response.data.faq);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, []);

  const onDeleteClicked = (faqID: string) => {
    axios
      .delete(PUBLIC_URL + "/faq/delete-faq", {
        params: {
          id: faqID,
        },
      })
      .then((response) => {
        setFaq(response.data.faq);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  return (
    <Dashboard>
      <Flex mx="4">
        <TableContainer
          columns={columns as any}
          dataSource={prepareFaqs(faq) as any}
          onChange={onChange}
          titleButtons={{
            name: "Create Faq",
            showTitleButton: true,
            onButtonClicked: () => setShowModal(true),
          }}
          titleName="Faq Dashboard"
        />
        <CreateFaqForm
          showModal={showModal}
          setShowModal={setShowModal}
          edit={edit}
          setEdit={setEdit}
        />
        <PreviewFaq
          setShowModal={setPreviewFaq}
          showModal={previewFaq}
          data={previewData as FaqDataType}
        />
      </Flex>
    </Dashboard>
  );
}

export default FaqDashboard;
