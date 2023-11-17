import {
  Flex,
  VStack,
  Text,
  HStack,
  Button,
  Grid,
  Image,
  GridItem,
  ModalContent,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";
import { UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import {
  AiFillEye,
  AiOutlineCloudUpload,
  AiOutlineInbox,
} from "react-icons/ai";
import Upload from "../assets/upload.svg";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Table } from "antd";

const UploadUsers = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const prepareColumns = (data: any) => {
    const restructuredColumns = data?.map((item: string) => {
      return {
        title: item,
        dataIndex: item,
        key: item,
      };
    });
    setTableColumns(restructuredColumns);
  };

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      Papa.parse(acceptedFiles[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          prepareColumns(results.meta.fields);
          setUsersData(results.data as any);
          console.log(results);
        },
      });
    }
  }, [acceptedFiles]);
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem
          w="100%"
          bg={"white"}
          shadow={"lg"}
          px="10"
          py="6"
          borderRadius={"lg"}
        >
          <Flex direction={"column"} alignItems={"start"}>
            <Text
              mb="4"
              textColor={"purple.800"}
              fontWeight={"semibold"}
              fontSize={"lg"}
            >
              Upload Users Data
            </Text>
            <Flex direction={"column"} alignItems={"end"}>
              {/* <Dragger {...fileProps} style={{ padding: "40px" }}>
              <VStack gap={1}>
                <AiOutlineInbox size={"40px"} />
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                text
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </VStack>
            </Dragger> */}
              <section className="container">
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  {...getRootProps({ className: "dropzone" })}
                  border={"1px dashed"}
                  borderColor={"gray.400"}
                  px="6"
                  py="4"
                  _hover={{ borderColor: "purple.800" }}
                >
                  <VStack gap={1}>
                    <input {...getInputProps()} />
                    <AiOutlineInbox size={"40px"} />
                    <Text>Click or drag file to this area to upload</Text>
                    <Text fontWeight={"hairline"} textColor={"gray.700"} fontSize={"xs"} fontStyle={"italic"}>
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </Text>
                  </VStack>
                </Flex>
              </section>
              <HStack mt={"3"} float={"right"}>
                <Button
                  colorScheme="gray"
                  variant={"outline"}
                  leftIcon={<AiFillEye size={"20px"} />}
                  onClick={() => setShowModal(true)}
                >
                  Preview
                </Button>
                <Button
                  bg="purple.900"
                  color={"white"}
                  _hover={{ bg: "purple.800" }}
                  leftIcon={<AiOutlineCloudUpload size={"20px"} />}
                >
                  Submit
                </Button>
              </HStack>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          w="100%"
          bg={"white"}
          shadow={"lg"}
          px="10"
          py="6"
          borderRadius={"lg"}
        >
          <Flex direction={"column"} alignItems={"start"} w="100%">
            <Text
              mb="4"
              textColor={"purple.800"}
              fontWeight={"semibold"}
              fontSize={"lg"}
            >
              Instructions
            </Text>
            <Flex justifyContent={"space-between"} w="100%">
              <VStack
                gap={1}
                textColor={"gray"}
                fontWeight={"hairline"}
                fontSize={"sm"}
                fontStyle={"italic"}
              >
                <Text>
                  Files should contains with fields firstName, lastname...
                </Text>
                <Text>
                  Files should contains with fields firstName, lastname...
                </Text>

                <Text>
                  Files should contains with fields firstName, lastname...
                </Text>

                <Text>
                  Files should contains with fields firstName, lastname...
                </Text>
              </VStack>
              <Image src={Upload} maxW={"52"} mr="10" />
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size={"4xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Users Data</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody py={"4"}>
            <Table dataSource={usersData} columns={tableColumns} />;
          </ModalBody>
          <Divider />
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadUsers;
