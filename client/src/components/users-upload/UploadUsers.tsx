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
import { message } from "antd";
import { useEffect, useState } from "react";
import {
  AiFillEye,
  AiOutlineCloudUpload,
  AiOutlineInbox,
} from "react-icons/ai";
import Upload from "../assets/upload.svg";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Table } from "antd";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import Dashboard from "../dashboard/Dashboard";

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
  const onSubmitClicked = () => {
    axios
      .post(`${PUBLIC_URL}/users/upload-users`, usersData)
      .then((response) => {
        message.success("Users data uploaded successfully..!");
        setShowModal(false);
        setUsersData([]);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        message.error("Error while data uploading..!");
      });
  };
  const downloadTemplateFile = async () => {
    try {
      await axios
        .get(PUBLIC_URL + "/users/download-template", {
          responseType: "blob",
          params: {
            fileName: "users-template.csv",
          },
        })
        .then((response: any) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "users-template.csv";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <Dashboard>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem w="100%" bg={"white"} px="10" py="6" borderRadius={"lg"}>
          <Flex direction={"column"} alignItems={"start"}>
            <Text
              mb="4"
              textColor={"purple.900"}
              fontWeight={"semibold"}
              fontSize={"2xl"}
            >
              Upload Users Data
            </Text>
            <Flex direction={"column"} alignItems={"end"} w="full">
              <section className="container" style={{ width: "100%" }}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  {...getRootProps({ className: "dropzone" })}
                  border={"1px dashed"}
                  borderColor={"gray.400"}
                  px="6"
                  py="4"
                  w="full"
                  rounded={"md"}
                  cursor={"pointer"}
                  _hover={{ borderColor: "purple.800" }}
                >
                  <VStack gap={1}>
                    <input {...getInputProps()} />
                    <AiOutlineInbox size={"40px"} />
                    <Text mb="0">
                      Click or drag file to this area to upload
                    </Text>
                    <Text
                      fontWeight={"thin"}
                      textColor={"gray.700"}
                      fontSize={"xs"}
                      fontStyle={"italic"}
                    >
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </Text>
                  </VStack>
                </Flex>
                <VStack mt="4">
                  {acceptedFiles?.map((file) => {
                    return (
                      <Flex
                        py="1"
                        px="4"
                        border="1px solid"
                        borderColor={"gray.100"}
                        w={"full"}
                        rounded={"md"}
                      >
                        <Text>File Name: {file.name}</Text>
                      </Flex>
                    );
                  })}
                </VStack>
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
                  onClick={onSubmitClicked}
                >
                  Submit
                </Button>
              </HStack>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem w="100%" bg={"white"} px="10" py="6" borderRadius={"lg"}>
          <Flex direction={"column"} alignItems={"start"} w="100%">
            <Text
              mb="2"
              textColor={"purple.800"}
              fontWeight={"semibold"}
              fontSize={"2xl"}
            >
              Instructions
            </Text>
            <Divider />
            <Flex justifyContent={"space-between"} w="100%" mt="3">
              <Flex
                gap={1}
                direction={"column"}
                textColor={"gray.700"}
                // fontWeight={"thin"}
                fontSize={"sm"}
                fontStyle={"italic"}
                alignItems={"start"}
                justifyContent={"start"}
                mt="2"
              >
                <Text mb="1" fontSize={"md"}>
                  1){" "}
                  <b
                    style={{
                      cursor: "pointer",
                      color: "#322659",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                    onClick={downloadTemplateFile}
                  >
                    Click here
                  </b>{" "}
                  to download the template.{" "}
                </Text>
                <Text mb="1" fontSize={"md"}>
                  2) Template contains set of instructions which need to be
                  followed in order to create users accounts.
                </Text>
                <Text fontSize={"md"}>3) Specify role as user or admin.</Text>
              </Flex>
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
            <Table dataSource={usersData} columns={tableColumns} />
          </ModalBody>
          <Divider />
        </ModalContent>
      </Modal>
    </Dashboard>
  );
};

export default UploadUsers;
