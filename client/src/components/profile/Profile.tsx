import React, { useState } from "react";
import {
  Button,
  Divider,
  Flex,
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
  Select,
  Textarea,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
interface ProfileProps {
  showModal: boolean;
  setShowModal: (_open: boolean) => void;
  edit?: any;
}
function Profile(props: ProfileProps) {
  const { setShowModal, showModal } = props;
  const [usersData, setUserData] = useState<Partial<any>>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      firstName: usersData?.firstName,
      lastName: usersData?.lastName,
      email: usersData?.email,
      phone: usersData?.phoneNumber,
      employeeType: usersData?.subtype,
      salary: usersData?.salary,
      addressLine1: usersData?.address?.addressLine1,
      addressLine2: usersData?.address?.addressLine1,
      city: usersData?.address?.city,
      state: usersData?.address?.state,
      about: usersData?.about,
    },
  });

  const [formData, setFormData] = useState<any>();

  const onSubmitClicked = () => {};
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size={"2xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmitClicked)}>
          <ModalHeader textColor={"purple.800"}>{"Profile"}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody py={"4"}>
            <form onSubmit={handleSubmit(onSubmitClicked)}>
              <Flex direction={"column"} mx="10">
                <FormControl isInvalid={!!errors["firstName"]}>
                  <FormLabel
                    id="firstName"
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    First Name:
                  </FormLabel>
                  <Input
                    type={"text"}
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    defaultValue={usersData?.firstName}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        firstName: e.target.value,
                      };
                      setFormData(userData as any);
                    }}
                  />
                  <FormErrorMessage>
                    {errors["firstName"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors["lastName"]}>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Last Name:
                  </FormLabel>
                  <Input
                    type={"text"}
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    defaultValue={usersData?.lastName}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        lastName: e.target.value,
                      };
                      setFormData(userData as any);
                    }}
                  />
                  <FormErrorMessage>
                    {errors["lastName"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors["email"]}>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Email:
                  </FormLabel>
                  <Input
                    type={"email"}
                    defaultValue={usersData?.email}
                    isDisabled={true}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        email: e.target.value,
                      };
                      setFormData(userData as any);
                    }}
                  />
                  <FormErrorMessage>
                    {errors["email"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors["phone"]}>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Mobile Number:
                  </FormLabel>
                  <Input
                    type={"number"}
                    {...register("phone", {
                      required: "Mobile Number is required",
                    })}
                    defaultValue={usersData?.phoneNumber}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        phoneNumber: e.target.value,
                      };
                      setFormData(userData as any);
                    }}
                  />
                  <FormErrorMessage>
                    {errors["phone"]?.message as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors["addressLine1"]}>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Address Line 1:
                  </FormLabel>
                  <Input
                    {...register("addressLine1", {
                      required: "Address Line1 is required",
                    })}
                    defaultValue={usersData?.address?.addressLine1}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        address: {
                          ...formData?.address,
                          addressLine1: e.target.value,
                        },
                      };
                      setFormData(userData as any);
                    }}
                  />
                  <FormErrorMessage>
                    {errors["addressLine1"]?.message as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    Address Line 2:
                  </FormLabel>
                  <Input
                    {...register("addressLine2")}
                    defaultValue={usersData?.address?.addressLine2}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        address: {
                          ...formData?.address,
                          addressLine2: e.target.value,
                        },
                      };
                      setFormData(userData as any);
                    }}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors["city"]}>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    City:
                  </FormLabel>
                  <Input
                    {...register("city", {
                      required: "City is required",
                    })}
                    defaultValue={usersData?.address?.city}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        address: {
                          ...formData?.address,
                          city: e.target.value,
                        },
                      };
                      setFormData(userData as any);
                    }}
                  />
                  <FormErrorMessage>
                    {errors["city"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors["state"]}>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    State:
                  </FormLabel>
                  <Input
                    {...register("state", {
                      required: "State is required",
                    })}
                    defaultValue={usersData?.address?.state}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        address: {
                          ...formData?.address,
                          state: e.target.value,
                        },
                      };
                      setFormData(userData as any);
                    }}
                  />
                  <FormErrorMessage>
                    {errors["state"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    textColor="gray.600"
                    fontWeight={"semibold"}
                  >
                    About You:
                  </FormLabel>
                  <Textarea
                    placeholder="write short discription about you.."
                    {...register("about")}
                    // defaultValue={usersData?.about}
                    onChange={(e) => {
                      const userData = {
                        ...formData,
                        about: e.target.value,
                      };
                      setFormData(userData as any);
                    }}
                  />
                </FormControl>
              </Flex>
            </form>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setShowModal(false);
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
              {"Update Profile"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default Profile;
