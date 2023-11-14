import {
  Flex,
  VStack,
  Text,
  HStack,
  Button,
  Grid,
  Image,
  GridItem,
} from "@chakra-ui/react";
import { UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
import {
  AiFillEye,
  AiOutlineCloudUpload,
  AiOutlineInbox,
} from "react-icons/ai";
import Upload from "../assets/upload.svg";

const UploadUsers = () => {
  const fileProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
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
            <Dragger {...fileProps} style={{ padding: "40px" }}>
              <VStack gap={1}>
                <AiOutlineInbox size={"40px"} />
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </VStack>
            </Dragger>
            <HStack mt={"3"} float={"right"}>
              <Button
                colorScheme="gray"
                variant={"outline"}
                leftIcon={<AiFillEye size={"20px"} />}
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
  );
};

export default UploadUsers;
