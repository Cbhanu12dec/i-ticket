import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { DatePicker, message } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
import dayjs from "dayjs";
import axios from "axios";
import { PUBLIC_URL } from "../common/utils";
import { getDefaultAnnouncement } from "../common/default-values";
import { EditType } from "./Announcement";
import {
  prepareAnnouncements,
  prepareAnnouncementsStats,
} from "../common/prepare-data";
import { AnnouncementsStats } from "../common/data-types";
const { RangePicker } = DatePicker;

interface CreateFaqFormProps {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
  edit?: EditType;
  setEdit?: React.Dispatch<React.SetStateAction<EditType>>;
  setAnnouncements?: React.Dispatch<React.SetStateAction<any>>;
  setAnnouncementsStats?: any;
  setEditAnnoucement: any;
}
const CreatAnnouncement = (props: CreateFaqFormProps) => {
  const {
    setShowModal,
    showModal,
    edit,
    setAnnouncements,
    setAnnouncementsStats,
    setEditAnnoucement,
  } = props;
  const [annnouncementData, setAnnouncementData] = useState(
    getDefaultAnnouncement()
  );
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setAnnouncementData({
      id: edit?.data?.key as string,
      title: edit?.data.title as string,
      description: edit?.data?.description as string,
      assignee: edit?.data?.assignee as string,
      startTime: edit?.data?.startTime as any,
      endTime: edit?.data?.endTime as any,
    });

    setValue("title", edit?.data.title as string);
    setValue("description", edit?.data?.description as string);
    setValue("assignee", edit?.data?.assignee as string);
  }, [edit?.data, setValue]);

  const onSubmitClicked = () => {
    console.log("*********** annouments datas");
    if (edit?.forEdit) {
      axios
        .put(
          PUBLIC_URL + "/announcement/update-announcement",
          annnouncementData
        )
        .then((response) => {
          message.success("Updated Annoucement..!");
          setShowModal(false);
          setAnnouncementData(getDefaultAnnouncement());
          setAnnouncements &&
            setAnnouncements(response.data.announcement as any);
          setAnnouncementsStats(
            prepareAnnouncementsStats(
              prepareAnnouncements(response.data.announcement)
            ) as AnnouncementsStats
          );
          setEditAnnoucement({ forEdit: false, data: {} });
          resetValues();
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          message.error("Error while updating annoucement..!");
        });
    } else {
      axios
        .post(
          PUBLIC_URL + "/announcement/create-announcement",
          annnouncementData
        )
        .then((response) => {
          message.success("Created Annoucement..!");
          setShowModal(false);
          setAnnouncementData(getDefaultAnnouncement());
          setAnnouncements &&
            setAnnouncements(response.data.announcement as any);
          setAnnouncementsStats(
            prepareAnnouncementsStats(
              prepareAnnouncements(response.data.announcement)
            ) as AnnouncementsStats
          );
          resetValues();
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          message.error("Error while creating annoucement..!");
        });
    }
  };

  const resetValues = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("assignee", "all");
  };

  console.log("******** bahnu ", annnouncementData);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        setAnnouncementData(getDefaultAnnouncement());
        resetValues();
        setEditAnnoucement({ forEdit: false, data: {} });
      }}
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <form>
          <ModalHeader textColor={"purple.800"}>
            {edit?.forEdit ? "Edit Announcement" : "Create Announcement Form"}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody py={"4"}>
            <FormControl
              isRequired
              isInvalid={annnouncementData?.title?.length === 0}
            >
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
              <FormErrorMessage>Title is required.</FormErrorMessage>
            </FormControl>
            <FormControl
              mt="3"
              isRequired
              isInvalid={annnouncementData?.description?.length === 0}
            >
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
              <FormErrorMessage>Description is required.</FormErrorMessage>
            </FormControl>
            <FormControl mt="3" mb="1">
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                Announce To
              </FormLabel>
              <RadioGroup
                defaultValue="all"
                value={annnouncementData.assignee}
                {...register("assignee", { required: true })}
                onChange={(e) =>
                  setAnnouncementData({
                    ...annnouncementData,
                    assignee: e,
                  })
                }
              >
                <Stack spacing={6} direction="row">
                  <Radio value="all" colorScheme="purple">
                    All
                  </Radio>
                  <Radio colorScheme="purple" value="user">
                    Users
                  </Radio>
                  <Radio colorScheme="purple" value="admin">
                    Admin
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>Assignee to is required.</FormErrorMessage>
            </FormControl>

            <FormControl mt="3">
              <FormLabel fontSize={"sm"} textColor={"gray.700"}>
                Schedule duration
              </FormLabel>
              <RangePicker
                showTime
                style={{ zIndex: 1000000, width: "100%" }}
                value={[
                  dayjs(annnouncementData?.startTime),
                  dayjs(annnouncementData?.endTime),
                ]}
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
                setEditAnnoucement({ forEdit: false, data: {} });
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
              onClick={onSubmitClicked}
            >
              {edit?.forEdit ? "Edit Announcement" : "Create Announcement"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreatAnnouncement;
