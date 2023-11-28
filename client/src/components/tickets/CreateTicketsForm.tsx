import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
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
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { AiOutlineInbox } from "react-icons/ai";
import { PUBLIC_URL, getFileType } from "../common/utils";
import { message } from "antd";
import { EditType } from "./ClientTicketsDashboard";
import { IoMdDownload } from "react-icons/io";
import { MdDelete, MdOutlineAttachFile } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import { PiFileJpgFill, PiFilePng } from "react-icons/pi";
import { SiJpeg } from "react-icons/si";
import { FaFileCsv } from "react-icons/fa6";

interface CreateTicketForm {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
  setTickets: any;
  getTickets: any;
  edit?: EditType;
  setEdit?: React.Dispatch<React.SetStateAction<EditType | undefined>>;
}

interface TicketForm {
  title: string;
  description: string;
  category: string;
  priority: string;
}
const CreateTicketsForm = (props: CreateTicketForm) => {
  const { setShowModal, showModal, setTickets, getTickets, edit, setEdit } =
    props;
  const [file, setFile] = useState();
  const [ticketPayload, setTicketPayload] = useState<TicketForm>({
    title: "",
    description: "",
    priority: "",
    category: "",
  });
  const { register, handleSubmit, setValue } = useForm();
  const [updateFiles, setUpdateFiles] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo") as string);
    setUserInfo(user);
  }, []);
  console.log("******* edit data", edit?.data);

  useEffect(() => {
    setTicketPayload({
      title: edit?.data?.title as string,
      description: edit?.data?.description as string,
      priority: edit?.data?.priority as string,
      category: edit?.data?.category as string,
    });
    setValue("title", edit?.data?.title as string);
    setValue("description", edit?.data?.description as string);
    setValue("priority", edit?.data?.assignee as string);
    setValue("priority", edit?.data?.category as string);

    setUpdateFiles((edit?.data as any)?.files);
  }, [
    edit?.data,
    edit?.data?.assignee,
    edit?.data?.description,
    edit?.data?.title,
    setValue,
  ]);

  // const resetValues = () => {
  //   setValue("title", "");
  //   setValue("description", "");
  //   setValue("priority", "");
  //   setValue("priority", "");
  // };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});

  const onSubmitClicked = (e: any) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("title", ticketPayload?.title);
    formData.append("description", ticketPayload?.description);
    formData.append("category", ticketPayload?.category);
    formData.append("priority", ticketPayload?.priority);
    formData.append("assignee", "admin");
    formData.append("userCreated", (userInfo as any)?.userID);
    formData.append("files", acceptedFiles[0]);

    if (edit?.forEdit) {
      formData.append("exsisting_files", JSON.stringify(updateFiles) as any);
      formData.append("ticketNumber", (edit?.data as any)?.ticketNumber);
      axios
        .put(PUBLIC_URL + `/ticket/update-ticket`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          setShowModal(false);
          message.success("Ticket got created..!");
          getTickets();
          // setTickets(response.data.ticketInfo);
        })
        .catch((err) => {
          console.log("checking error", err);
          message.error("Error while creating ticket..!");
          setShowModal(false);
        });
    } else {
      axios
        .post(PUBLIC_URL + `/ticket/create-ticket`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          setShowModal(false);
          message.success("Ticket got created..!");
          getTickets();
          // setTickets(response.data.ticketInfo);
        })
        .catch((err) => {
          console.log("checking error", err);
          message.error("Error while creating ticket..!");
          setShowModal(false);
        });
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
        setValue("title", "");
        setValue("description", "");
        setValue("assignee", "all");
      }}
      size={"4xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmitClicked)}>
          <ModalHeader>
            {edit?.forEdit ? "Edit Ticket" : "Create Ticket Form"}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody py={"4"}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter Title here..."
                {...register("title", { required: true })}
                value={ticketPayload?.title}
                onChange={(e) =>
                  setTicketPayload({
                    ...ticketPayload,
                    title: e.target.value,
                  } as any)
                }
              />
            </FormControl>
            <FormControl mt="3">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter details here..."
                {...register("description", { required: true })}
                value={ticketPayload?.description}
                onChange={(e) =>
                  setTicketPayload({
                    ...ticketPayload,
                    description: e.target.value,
                  } as any)
                }
              />
            </FormControl>

            <HStack mt="3" gap={4}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter category here..."
                  {...register("category", { required: true })}
                  value={ticketPayload?.category}
                  onChange={(e) =>
                    setTicketPayload({
                      ...ticketPayload,
                      category: e.target.value,
                    } as any)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={ticketPayload?.priority}
                  placeholder="Select option"
                  onChange={(e) =>
                    setTicketPayload({
                      ...ticketPayload,
                      priority: e.target.value,
                    } as any)
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>
            </HStack>
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
              <FormLabel>Supporting Documents</FormLabel>
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
            </FormControl>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setShowModal(false);
                // resetValues();
              }}
            >
              Close
            </Button>
            <Button
              bg="purple.900"
              color={"white"}
              _hover={{ bg: "purple.800" }}
              type="submit"
            >
              {edit?.forEdit ? "Update Ticket" : "Create Ticket"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateTicketsForm;
