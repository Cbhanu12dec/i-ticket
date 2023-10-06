import {
  Button,
  Divider,
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
} from "@chakra-ui/react";
import Dragger from "antd/es/upload/Dragger";
import { useForm } from "react-hook-form";
import { AiOutlineInbox } from "react-icons/ai/index";
interface CreateFaqFormProps {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
}
const CreateFaqForm = (props: CreateFaqFormProps) => {
  const { setShowModal, showModal } = props;

  const { register } = useForm();
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Faq Form</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody py={"4"}>
          <form>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter Title here..."
                {...register("title", { required: true })}
              />
            </FormControl>
            <FormControl mt="3">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter details here..."
                {...register("description", { required: true })}
              />
            </FormControl>
            <FormControl mt="3">
              <FormLabel>Supporting Documents</FormLabel>
              <Dragger {...props}>
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
              </Dragger>
            </FormControl>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button bg="purple.900" color={"white"} _hover={{ bg: "purple.800" }}>
            Create Ticket
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateFaqForm;
