import {
  Flex,
  HStack,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { TableProps, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import TableContainer from "../common/TableContainer";
import CreateFaqForm from "./CreateFaqForm";
import { AiFillEye, AiOutlineSync, AiTwotoneBulb } from "react-icons/ai";
import { FaEllipsisV, FaRegEyeSlash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { PUBLIC_URL, shortternText } from "../common/utils";
import { prepareFaqs } from "../common/prepare-data";
import { FaqDataType } from "../common/data-types";
import PreviewFaq from "./PreviewFaq";
import Dashboard from "../dashboard/Dashboard";
import { LuFileBox } from "react-icons/lu";
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
      render: (value) => {
        return (
          <Tooltip title={value} style={{ minWidth: "200px" }}>
            <Text>{shortternText(value)}</Text>
          </Tooltip>
        );
      },
    },
    {
      title: "Active",
      dataIndex: "isHidden",
      width: "160px",
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
      width: "200px",
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
            maxW="16"
          >
            <AiOutlineSync />
            <Text fontWeight={"semibold"} letterSpacing={"wide"} mx="1">
              {_.upperCase(text)}
            </Text>
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
            maxW="24"
          >
            <AiOutlineSync style={{ fontWeight: 800 }} />
            <Text fontWeight={"semibold"} mx="1">
              {_.upperCase(text)}
            </Text>
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
            maxW="20"
          >
            <AiOutlineSync />
            <Text fontWeight={"semibold"} mx="1">
              {_.upperCase(text)}
            </Text>
          </Flex>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <HStack gap={1}>
          <Tooltip title="Preview faq" placement="left">
            <LuFileBox
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setPreviewFaq(true);
                setPreviewData(record);
              }}
            />
          </Tooltip>

          <Menu>
            <MenuButton
              as={IconButton}
              colorScheme="white"
              aria-label="Options"
              color={"black"}
              size={"sm"}
              icon={<FaEllipsisV />}
            />
            <MenuList>
              <MenuItem
                onClick={() => {
                  setEdit({
                    forEdit: true,
                    data: record,
                  });
                  setShowModal(true);
                }}
                mt="2"
                mx="2"
              >
                <FiEdit style={{ margin: "0 2px" }} />
                <Text mx="2" fontSize={"md"}>
                  Edit
                </Text>
              </MenuItem>
              <Divider mt="1" />
              <MenuItem
                onClick={() => {
                  onDeleteClicked(record?.faqNumber);
                }}
                mt="2"
                mx="2"
              >
                <MdDeleteOutline size={20} />
                <Text mx="1">Delete</Text>
              </MenuItem>
              <Divider mt="1" />

              <MenuItem
                onClick={() => {
                  onHideClicked(record);
                }}
                mt="2"
                mx="2"
              >
                {record?.isHidden ? (
                  <>
                    <FaRegEyeSlash size={20} style={{ margin: "0 2px" }} />
                    <Text mx="1">In Active</Text>
                  </>
                ) : (
                  <>
                    <AiFillEye size={20} style={{ margin: "0 2px" }} />
                    <Text mx="1">Active</Text>
                  </>
                )}
              </MenuItem>
            </MenuList>
          </Menu>
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
  const getFaqs = () => {
    axios
      .get(PUBLIC_URL + "/faq/faq-list")
      .then((response) => {
        setFaq(response.data.faq);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  useEffect(() => {
    getFaqs();
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

  const onHideClicked = (faqData: any) => {
    const payload = {
      faqId: faqData.faqNumber,
      isHidden: !faqData.isHidden,
    };
    axios
      .put(PUBLIC_URL + "/faq/hide", payload)
      .then((response) => {
        setFaq(response.data.faqs);
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
            leftIcons: <AiTwotoneBulb />,
          }}
          titleName="Faq Dashboard"
        />
        <CreateFaqForm
          showModal={showModal}
          setShowModal={setShowModal}
          edit={edit}
          setEdit={setEdit}
          setFaqs={setFaq}
          getFaqs={getFaqs}
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
