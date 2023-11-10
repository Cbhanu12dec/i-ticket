import { Flex, HStack, Tooltip } from "@chakra-ui/react";
import { TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import TableContainer from "../common/TableContainer";
import CreateFaqForm from "./CreateFaqForm";
import { AiFillEye } from "react-icons/ai";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
function FaqDashboard() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "name",
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
      onFilter: (value, record) => record.name.startsWith(value as any),
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Category",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value as any),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <HStack>
          <Tooltip label="Click to hide faq" hasArrow>
            <AiFillEye size={24} style={{ cursor: "pointer" }} />
          </Tooltip>
        </HStack>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
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
  return (
    <Flex>
      <TableContainer
        columns={columns}
        dataSource={data}
        onChange={onChange}
        titleButtons={{
          name: "Create Faq",
          showTitleButton: true,
          onButtonClicked: () => setShowModal(true),
        }}
        titleName="Faq Dashboard"
      />
      <CreateFaqForm showModal={showModal} setShowModal={setShowModal} />
    </Flex>
  );
}

export default FaqDashboard;
