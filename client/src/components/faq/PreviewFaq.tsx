import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaqDataType } from "../common/data-types";
import { IoMdDownload } from "react-icons/io";
import { PUBLIC_URL, getFileType } from "../common/utils";
import { ImFilePdf } from "react-icons/im";
import axios from "axios";
import { PiFileJpgFill, PiFilePng } from "react-icons/pi";
import { SiJpeg } from "react-icons/si";
import { FaFileCsv } from "react-icons/fa6";
import { MdOutlineAttachFile } from "react-icons/md";

interface PreviewFaqProps {
  showModal: boolean;
  setShowModal: (isOpen: boolean) => void;
  data: FaqDataType;
}
function PreviewFaq(props: PreviewFaqProps) {
  const { showModal, setShowModal, data } = props;

  const handleDownload = async (filename: string) => {
    try {
      await axios
        .get(PUBLIC_URL + "/faq/download", {
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

  const getAttachmentComponent = (name: string) => {
    const fileName = name?.split("/")[4];
    return (
      <Flex
        mt="3"
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
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>FAQ Information</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Flex direction={"column"}>
            <VStack
              my="4"
              px="6"
              align={"start"}
              bg="#f1f5fa"
              rounded={"md"}
              py="6"
              minH={"80"}
            >
              <Text
                textColor={"purple.800"}
                fontSize={"xl"}
                fontWeight={500}
                mb="0"
              >
                {(data as any)?.title}
              </Text>
              <Text my="2">{data?.description}</Text>
              {data?.files?.length > 0 && (
                <>
                  <Divider borderColor={"gray.300"} />
                  <Text
                    mb="0"
                    fontSize={"lg"}
                    textColor={"purple.800"}
                    fontWeight={"semibold"}
                  >
                    Attachments:
                  </Text>
                </>
              )}

              <Flex gap={3}>
                {data?.files?.map((item) => {
                  return getAttachmentComponent(item);
                })}
              </Flex>
            </VStack>
          </Flex>{" "}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PreviewFaq;
