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
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { AiOutlineInbox } from "react-icons/ai";

interface CreateTicketForm {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
}

interface TicketForm {
  title: string;
  description: string;
  category: string;
  priority: string;
}
const CreateTicketsForm = (props: CreateTicketForm) => {
  const { setShowModal, showModal } = props;
  const [file, setFile] = useState();
  const [ticketPayload, setTicketPayload] = useState<TicketForm>({
    title: "",
    description: "",
    priority: "",
    category: "",
  });
  const { register, handleSubmit } = useForm();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});

  const onSubmitClicked = (e: any) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("title", ticketPayload?.title);
    formData.append("description", ticketPayload?.description);
    formData.append("category", ticketPayload?.category);
    formData.append("priority", ticketPayload?.priority);
    formData.append("assignee", JSON.stringify(["all"]));
    formData.append("files", acceptedFiles[0]);
    axios
      .post(`http://localhost:5001/ticket/create-ticket`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {})
      .catch((err) => console.log("checking error", err));
  };
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmitClicked)}>
          <ModalHeader>Create Ticket Form</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody py={"4"}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter Title here..."
                {...register("title", { required: true })}
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
                  placeholder="Enter Title here..."
                  {...register("category", { required: true })}
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
            <FormControl mt="3">
              <FormLabel>Supporting Documents</FormLabel>
              {/* <Dragger {...fileProps}>
                <VStack gap={1}>
                  <AiOutlineInbox size={"24px"} />
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
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
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
            <Button
              bg="purple.900"
              color={"white"}
              _hover={{ bg: "purple.800" }}
              type="submit"
            >
              Create Ticket
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateTicketsForm;
