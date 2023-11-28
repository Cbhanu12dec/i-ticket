import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  StackDivider,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Segmented, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { PUBLIC_URL, getFileType, shortternText } from "../common/utils";
import Dashboard from "../dashboard/Dashboard";
import { ImFilePdf } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import NoData from "../common/NoData";
import { PiFileJpgFill, PiFilePng } from "react-icons/pi";
import { FaFileCsv } from "react-icons/fa6";
import { MdOutlineAttachFile } from "react-icons/md";
import { SiJpeg } from "react-icons/si";
// import data from "./data.json";

const UserFaq = () => {
  const [faq, setFaq] = useState([]);
  const [info, setInfo] = useState({});
  useEffect(() => {
    axios
      .get(PUBLIC_URL + "/faq/faq-list")
      .then((response) => {
        const filteredData = response.data.faq?.filter(
          (item: any) => item?.isHidden !== false && item.assignee !== "admin"
        );
        setFaq(filteredData);
        setInfo(filteredData[0]);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, []);
  const getIcons = (type: string) => {
    if (type?.toLowerCase() === "pdf") {
      return ImFilePdf;
    } else if (type?.toLocaleLowerCase() === "png") {
      return PiFilePng;
    } else if (type?.toLocaleLowerCase() === "jpg") {
      return PiFileJpgFill;
    } else if (type?.toLocaleLowerCase() === "jpeg") {
      return SiJpeg;
    } else if (type?.toLocaleLowerCase() === "csv") {
      return FaFileCsv;
    } else {
      return MdOutlineAttachFile;
    }
  };
  const handleDownload = async (filename: string) => {
    try {
      await axios
        .get(PUBLIC_URL + "/ticket/download", {
          responseType: "blob",
          params: {
            fileName: filename,
          },
        })
        .then((response: any) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
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
  const getAttachmentComponent = (name: string) => {
    const fileName = name?.split("/")[4];
    return (
      <Flex
        mt="2"
        mb="4"
        border={"1px solid"}
        borderColor={"gray.300"}
        rounded={"md"}
        py="3"
        px="4"
        textColor={"gray.700"}
        alignItems={"center"}
        cursor={"pointer"}
        _hover={{
          color: "purple.800",
          borderColor: "purple.800",
          textColor: "purple.800",
        }}
      >
        <Icon as={getIcons(getFileType(fileName))} />
        <Text ml="2" mr="4" fontSize={"sm"} mb="0">
          {fileName}
        </Text>
        <IoMdDownload size={20} onClick={() => handleDownload(fileName)} />
      </Flex>
    );
  };
  return (
    <Dashboard>
      <Flex direction={"column"} alignItems={"start"} mx="4" my="2" w="full">
        <Text fontSize={"2xl"} fontWeight={"semibold"} mb="3">
          Faq's Dashboard
        </Text>
        <Grid templateColumns="repeat(6, 1fr)" gap={4} w="95%">
          <GridItem
            colSpan={2}
            w="100%"
            bg="white"
            p="4"
            rounded={"lg"}
            // shadow={"lg"}
          >
            <Flex w="100%" direction={"column"} alignItems={"start"}>
              <Text
                textColor={"purple.800"}
                fontSize={"lg"}
                fontWeight={500}
                mb="2"
              >
                View your Faq's
              </Text>
              <Divider />
            </Flex>
            <VStack
              divider={<StackDivider />}
              mt="5"
              maxH={"xl"}
              overflowY={"scroll"}
              alignItems={"start"}
            >
              {faq?.map((item, index) => {
                return (
                  <Flex
                    direction={"column"}
                    p="2"
                    rounded={"md"}
                    width={"100%"}
                    align={"start"}
                    cursor={"pointer"}
                    bg={index === 0 ? "purple.800" : "white"}
                    color={index === 0 ? "white" : "black"}
                    onClick={() => setInfo(item)}
                  >
                    <Text
                      textColor={index === 0 ? "white" : "purple.800"}
                      fontWeight={"semibold"}
                    >
                      {(item as any).title}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"hairline"}
                      fontStyle={"italic"}
                    >
                      <Tooltip title={(item as any).description}>
                        {shortternText((item as any).description)}
                      </Tooltip>
                    </Text>
                  </Flex>
                );
              })}
            </VStack>
          </GridItem>
          <GridItem
            w="100%"
            bg="white"
            p="6"
            rounded={"lg"}
            // shadow={"lg"}
            colSpan={4}
          >
            <Flex direction={"column"}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text
                  textColor={"purple.800"}
                  fontSize={"xl"}
                  fontWeight={500}
                  mb="4"
                >
                  Detail Information about FAQ
                </Text>
              </Flex>

              <Divider />

              {faq.length > 0 ? (
                <VStack
                  mt="4"
                  px="6"
                  align={"start"}
                  bg="#f1f5fa"
                  rounded={"md"}
                  py="6"
                  minH={"80"}
                >
                  <Flex justifyContent={"space-between"} w="100%">
                    <Text
                      textColor={"purple.800"}
                      fontSize={"lg"}
                      fontWeight={"semibold"}
                    >
                      {(info as any)?.title}
                    </Text>
                  </Flex>

                  <Text fontSize={"sm"}> {(info as any)?.description}</Text>
                  {(info as any)?.files?.length > 0 && (
                    <>
                      {" "}
                      <Divider mt="4" />
                      <Text fontSize={"md"} mb="0">
                        Attachments:
                      </Text>
                    </>
                  )}
                  <Flex gap={3}>
                    {(info as any)?.files?.map((item: any) => {
                      return getAttachmentComponent(item);
                    })}
                  </Flex>
                </VStack>
              ) : (
                <VStack
                  mt="4"
                  px="6"
                  align={"center"}
                  bg="#f1f5fa"
                  rounded={"md"}
                  py="6"
                  minH={"80"}
                  justify={"center"}
                >
                  <NoData />
                </VStack>
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </Dashboard>
  );
};

export default UserFaq;
