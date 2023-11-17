import { Flex, HStack, Tooltip } from "@chakra-ui/react";
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

interface DataType {
  key: React.Key;
  title: string;
  description: string;
  files: Array<{ fileName: string; filePath: string }>;
}
function FaqDashboard() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [faq, setFaq] = useState([]);

  const columns: ColumnsType<FaqDataType> = [
    {
      title: "Title",
      dataIndex: "title",
      filterSearch: true,
      onFilter: (value, record) => record.title.startsWith(value as any),
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Active",
      dataIndex: "isHidden",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title:"Access",
      dataIndex:"assignee"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <HStack gap={2}>
          <AiFillEye size={24} style={{ cursor: "pointer" }} />
          <FiEdit size={18} style={{ cursor: "pointer" }} />
          <MdDeleteOutline size={22} style={{ cursor: "pointer" }} />
        </HStack>
      ),
    },
  ];

  const universityFAQs: DataType[] = [
    {
      key: "1",
      title: "Admissions",
      description: "Information about the admission process",
      files: [
        {
          fileName: "Admission Guide",
          filePath: "/path/to/admission_guide.pdf",
        },
        {
          fileName: "Application Form",
          filePath: "/path/to/application_form.pdf",
        },
      ],
    },
    {
      key: "2",
      title: "Courses",
      description: "Details about the available courses",
      files: [
        { fileName: "Course Catalog", filePath: "/path/to/course_catalog.pdf" },
        {
          fileName: "Course Schedule",
          filePath: "/path/to/course_schedule.pdf",
        },
      ],
    },
    {
      key: "3",
      title: "Housing",
      description: "Information about on-campus housing options",
      files: [
        { fileName: "Housing Guide", filePath: "/path/to/housing_guide.pdf" },
        {
          fileName: "Room Assignment",
          filePath: "/path/to/room_assignment.pdf",
        },
      ],
    },
    {
      key: "4",
      title: "Financial Aid",
      description: "Details about available financial aid programs",
      files: [
        {
          fileName: "Financial Aid FAQs",
          filePath: "/path/to/financial_aid_faqs.pdf",
        },
        {
          fileName: "Scholarship Opportunities",
          filePath: "/path/to/scholarship_opportunities.pdf",
        },
      ],
    },
    {
      key: "5",
      title: "Student Life",
      description: "Information about campus activities and organizations",
      files: [
        { fileName: "Student Clubs", filePath: "/path/to/student_clubs.pdf" },
        {
          fileName: "Events Calendar",
          filePath: "/path/to/events_calendar.pdf",
        },
      ],
    },
    {
      key: "6",
      title: "Academic Support",
      description: "Resources available for academic assistance",
      files: [
        {
          fileName: "Tutoring Services",
          filePath: "/path/to/tutoring_services.pdf",
        },
        {
          fileName: "Library Resources",
          filePath: "/path/to/library_resources.pdf",
        },
      ],
    },
    {
      key: "7",
      title: "Health Services",
      description: "Information about on-campus health services",
      files: [
        {
          fileName: "Health Center Hours",
          filePath: "/path/to/health_center_hours.pdf",
        },
        {
          fileName: "Medical Services",
          filePath: "/path/to/medical_services.pdf",
        },
      ],
    },
    {
      key: "8",
      title: "Technology",
      description: "Details about campus technology resources",
      files: [
        { fileName: "IT Support", filePath: "/path/to/it_support.pdf" },
        { fileName: "Computer Labs", filePath: "/path/to/computer_labs.pdf" },
      ],
    },
    {
      key: "9",
      title: "Dining Options",
      description: "Information about on-campus dining facilities",
      files: [
        { fileName: "Dining Menus", filePath: "/path/to/dining_menus.pdf" },
        { fileName: "Meal Plans", filePath: "/path/to/meal_plans.pdf" },
      ],
    },
    {
      key: "10",
      title: "Transportation",
      description: "Details about campus transportation services",
      files: [
        {
          fileName: "Shuttle Schedule",
          filePath: "/path/to/shuttle_schedule.pdf",
        },
        {
          fileName: "Parking Information",
          filePath: "/path/to/parking_information.pdf",
        },
      ],
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

  return (
    <Flex>
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
      <CreateFaqForm showModal={showModal} setShowModal={setShowModal} />
    </Flex>
  );
}

export default FaqDashboard;
