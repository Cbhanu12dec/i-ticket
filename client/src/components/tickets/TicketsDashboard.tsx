import { Button, Flex, Text } from "@chakra-ui/react";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import TableContainer from "../common/TableContainer";
import CreateTicketsForm from "./CreateTicketsForm";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
function TicketsDashboard() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
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
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
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
          name: "Create Ticket",
          showTitleButton: true,
          onButtonClicked: () => setShowModal(true),
        }}
        titleName="Tickets Dashboard"
      />
      {/* <CreateTicketsForm
        showModal={showModal}
        setShowModal={setShowModal}
        setTickets={setTickets}
      /> */}
    </Flex>
  );
}

export default TicketsDashboard;
