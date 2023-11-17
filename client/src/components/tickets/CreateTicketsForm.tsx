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
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDropzone } from "react-dropzone";

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
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </Flex>
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
