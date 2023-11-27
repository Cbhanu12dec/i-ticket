import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { getDefaultFaq } from "../common/default-values";
import { PUBLIC_URL, getFileType } from "../common/utils";
import axios from "axios";
import { message } from "antd";
import { EditType } from "./FaqDashboard";
import { AiOutlineCheck, AiOutlineInbox } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { ImFilePdf } from "react-icons/im";
import { MdDelete, MdOutlineAttachFile } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PiFileJpgFill, PiFilePng } from "react-icons/pi";
import { SiJpeg } from "react-icons/si";
import { FaFileCsv } from "react-icons/fa6";
interface CreateFaqFormProps {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
  setFaqs: React.Dispatch<React.SetStateAction<any>>;
  edit?: EditType;
  setEdit?: React.Dispatch<React.SetStateAction<EditType | undefined>>;
}
const CreateFaqForm = (props: CreateFaqFormProps) => {
  const { setShowModal, showModal, edit, setEdit, setFaqs } = props;
  const [faq, setFaq] = useState(getDefaultFaq());
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});
  const { register, handleSubmit, setValue } = useForm();
  const [updateFiles, setUpdateFiles] = useState([]);

  const onSubmitClicked = () => {
    const formData = new FormData();
    formData.append("title", faq?.title);
    formData.append("description", faq?.description);
    formData.append("assignee", faq?.assignee);
    formData.append("exsisting_files", updateFiles as any);
    formData.append("files", acceptedFiles[0]);

    if (edit?.forEdit) {
      formData.append("faqNumber", (edit?.data as any)?.faqNumber);
      formData.append("isHidden", (edit?.data as any)?.isHidden);

      axios
        .put(`${PUBLIC_URL}/faq/update-faq`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          message.success("Updated Faq successfully..!");
          setShowModal(false);
          resetValues();
          setFaqs(response.data.faqs);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
          setShowModal(false);
          resetValues();
          message.error("Failed to update faq..!");
        });
    } else {
      axios
        .post(`${PUBLIC_URL}/faq/create-faq`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          message.success("Created Faq successfully..!");
          setShowModal(false);
          resetValues();
          setFaqs(response.data.faqs);
        })
        .catch((err) => {
          console.log("checking error", err);
          setShowModal(false);
          resetValues();
          message.error("Failed to create faq..!");
        });
    }
  };

  useEffect(() => {
    setFaq({
      title: edit?.data?.title as string,
      description: edit?.data?.description as string,
      assignee: edit?.data?.assignee as string,
    });
    setValue("title", edit?.data?.title as string);
    setValue("description", edit?.data?.description as string);
    setValue("assignee", edit?.data?.assignee as string);
    setUpdateFiles((edit?.data as any)?.files);
  }, [
    edit?.data,
    edit?.data?.assignee,
    edit?.data?.description,
    edit?.data?.title,
    setValue,
  ]);

  const resetValues = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("assignee", "all");
    setFaq(getDefaultFaq());
    setEdit &&
      setEdit({
        forEdit: false,
        data: getDefaultFaq(),
      });
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

  const getAttachmentComponent = (name: string, index: number) => {
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
        <IoMdDownload
          size={20}
          onClick={() => handleDownload(fileName)}
          style={{ color: "#322625" }}
        />
        <MdDelete
          size={20}
          style={{ color: "red", margin: "0 5px" }}
          onClick={() => {
            const files = updateFiles.filter((_, ind) => ind !== index);
            setUpdateFiles(files);
          }}
        />
      </Flex>
    );
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        resetValues();
        setFaq(getDefaultFaq());
      }}
      size={"4xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmitClicked)}>
          <ModalHeader>
            {edit?.forEdit ? "Edit Faq" : "Create Faq Form"}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody py={"4"}>
            <FormControl>
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                Title
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter Title here..."
                value={faq.title}
                {...register("title", { required: true })}
                onChange={(e) =>
                  setFaq({
                    ...faq,
                    title: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt="3">
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                Description
              </FormLabel>

              <Textarea
                placeholder="Enter details here..."
                value={faq.description}
                {...register("description", { required: true })}
                onChange={(e) =>
                  setFaq({
                    ...faq,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt="3">
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                Access to
              </FormLabel>
              <Select
                placeholder="Select option"
                value={faq.assignee}
                {...register("assignee", { required: true })}
                onChange={(e) =>
                  setFaq({
                    ...faq,
                    assignee: e.target.value,
                  })
                }
              >
                <option value="all">All</option>
                <option value="user">Users</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
            {updateFiles?.length > 0 && (
              <FormControl mt="3">
                <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                  Files
                </FormLabel>
                <Flex gap={3}>
                  {updateFiles?.map((item: any, index: number) =>
                    getAttachmentComponent(item, index)
                  )}
                </Flex>
              </FormControl>
            )}

            <FormControl mt="3">
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                {edit?.forEdit ? "Add more files" : "Supporting Documents"}
              </FormLabel>
              <section className="container">
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
                      fontWeight={"hairline"}
                      textColor={"gray.700"}
                      fontSize={"xs"}
                      fontStyle={"italic"}
                    >
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </Text>
                  </VStack>
                </Flex>
              </section>
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
                      <Text fontSize={"sm"}>File Name: {file.name}</Text>
                    </Flex>
                  );
                })}
              </VStack>
            </FormControl>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setShowModal(false);
                resetValues();
                setFaq(getDefaultFaq());
              }}
              leftIcon={<RxCross2 />}
            >
              Close
            </Button>
            <Button
              bg="purple.900"
              color={"white"}
              _hover={{ bg: "purple.800" }}
              type="submit"
              leftIcon={<AiOutlineCheck />}
            >
              Update FAQ
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateFaqForm;
