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
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { getDefaultFaq } from "../common/default-values";
import { PUBLIC_URL } from "../common/utils";
import axios from "axios";
import { message } from "antd";
import { EditType } from "./FaqDashboard";
interface CreateFaqFormProps {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
  edit?: EditType;
  setEdit?: React.Dispatch<React.SetStateAction<EditType | undefined>>;
}
const CreateFaqForm = (props: CreateFaqFormProps) => {
  const { setShowModal, showModal, edit, setEdit } = props;
  const [faq, setFaq] = useState(getDefaultFaq());
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});
  const { register, handleSubmit, setValue } = useForm();

  const onSubmitClicked = () => {
    const formData = new FormData();
    formData.append("title", faq?.title);
    formData.append("description", faq?.description);
    formData.append("assignee", faq?.assignee);
    formData.append("files", acceptedFiles[0]);
    axios
      .post(`${PUBLIC_URL}/faq/create-faq`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        message.success("Created Faq successfully..!");
        setShowModal(false);
        resetValues();
      })
      .catch((err) => {
        console.log("checking error", err);
        setShowModal(false);
        resetValues();
        message.success("Failed to create faq..!");
      });
  };

  useEffect(() => {
    setFaq({
      title: edit?.data?.title as string,
      description: edit?.data?.description as string,
      assignee: edit?.data?.assignee as string,
    });
  }, [edit?.data?.assignee, edit?.data?.description, edit?.data?.title]);

  console.log("checking data for faq eiditklnlndl", edit?.data);

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
              <FormLabel>Title</FormLabel>
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
              <FormLabel>Description</FormLabel>

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
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </Select>
            </FormControl>
            <FormControl mt="3">
              <FormLabel>Supporting Documents</FormLabel>
              {/* <Dragger {...props}>
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
              onClick={() => {
                setShowModal(false);
                resetValues();
                setFaq(getDefaultFaq());
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
              Create Ticket
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateFaqForm;
