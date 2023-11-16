import {
  Button,
  Divider,
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
} from "@chakra-ui/react";
import { DatePicker, message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
import dayjs from "dayjs";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import { getDefaultAnnouncement } from "../common/default-values";
const { RangePicker } = DatePicker;

interface CreateFaqFormProps {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
}
const CreatAnnouncement = (props: CreateFaqFormProps) => {
  const { setShowModal, showModal } = props;
  const [annnouncementData, setAnnouncementData] = useState(
    getDefaultAnnouncement()
  );
  const { register, handleSubmit, setValue } = useForm();

  const onSubmitClicked = () => {
    axios
      .post(PUBLIC_URL + "/announcement/create-announcement", annnouncementData)
      .then((response) => {
        message.success("Created Annoucement..!");
        setShowModal(false);
        setAnnouncementData(getDefaultAnnouncement());
        resetValues();
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        message.success("Error while creating annoucement..!");
      });
  };

  const resetValues = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("assignee", "all");
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        setAnnouncementData(getDefaultAnnouncement());
        resetValues();
      }}
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmitClicked)}>
          <ModalHeader textColor={"purple.800"}>
            Create Announcement Form
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
                value={annnouncementData?.title}
                {...register("title", { required: true })}
                onChange={(e) =>
                  setAnnouncementData({
                    ...annnouncementData,
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
                value={annnouncementData.description}
                {...register("description", { required: true })}
                onChange={(e) =>
                  setAnnouncementData({
                    ...annnouncementData,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mt="3">
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                Announce To
              </FormLabel>
              <Select
                placeholder="Select option"
                {...register("assignee", { required: true })}
                onChange={(e) =>
                  setAnnouncementData({
                    ...annnouncementData,
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
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                Schedule duration
              </FormLabel>
              <RangePicker
                showTime
                style={{ zIndex: 1000000, width: "100%" }}
                onChange={(e: any) => {
                  setAnnouncementData({
                    ...annnouncementData,
                    startTime: dayjs(e[0]["$d"]).toISOString(),
                    endTime: dayjs(e[1]["$d"]).toISOString(),
                  });
                }}
                size="large"
              />
            </FormControl>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setShowModal(false);
                setAnnouncementData(getDefaultAnnouncement());
                resetValues();
              }}
              leftIcon={<AiOutlineClose />}
            >
              Close
            </Button>
            <Button
              bg="purple.900"
              color={"white"}
              _hover={{ bg: "purple.800" }}
              leftIcon={<TfiAnnouncement />}
              type="submit"
            >
              Create Announcement
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreatAnnouncement;
