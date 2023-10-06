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
  Textarea,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
const { RangePicker } = DatePicker;

interface CreateFaqFormProps {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
}
const CreatAnnouncement = (props: CreateFaqFormProps) => {
  const { setShowModal, showModal } = props;

  const { register } = useForm();
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textColor={"purple.800"}>Create Announcement Form</ModalHeader>
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
              <FormLabel>Schedule duration</FormLabel>
              <RangePicker
                showTime
                style={{ zIndex: 1000000, width: "100%" }}
                size="large"
              />
            </FormControl>
          </form>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={() => setShowModal(false)}
            leftIcon={<AiOutlineClose />}
          >
            Close
          </Button>
          <Button
            bg="purple.900"
            color={"white"}
            _hover={{ bg: "purple.800" }}
            leftIcon={<TfiAnnouncement />}
          >
            Create Announcement
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatAnnouncement;
