import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import data from "./data.json";
import { PiNotepadBold } from "react-icons/pi";
import { FaListCheck, FaRegThumbsUp } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { useState } from "react";
import CreateTicketsForm from "./CreateTicketsForm";
const ClientTicketsDashboard = () => {
  const [showticketModal, setShowTicketModal] = useState<boolean>(false);
  const [ticketData, setTicketData] = useState();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Flex direction={"column"} alignItems={"start"} mx="6" my="3" w="97%">
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w="full"
          mb="4"
        >
          <Text fontSize={"2xl"} fontWeight={"semibold"} mb="3">
            Tickets Dashboard
          </Text>
          <Button colorScheme="green" onClick={() => setShowModal(true)}>
            Create Ticket
          </Button>
        </Flex>
        <Grid templateColumns="repeat(8, 1fr)" gap={6} w={"full"}>
          <GridItem colSpan={2} bg="white" p="4" rounded={"lg"} shadow={"lg"}>
            <Flex w={"full"} direction={"column"} alignItems={"start"}>
              <Text
                textColor={"purple.800"}
                fontSize={"xl"}
                mx="1"
                mb="4"
                fontWeight={500}
              >
                Tickets Inbox
              </Text>

              <Divider />
              <VStack w={"full"}>
                <Flex
                  mt="4"
                  p="1"
                  _hover={{ bg: "gray.50" }}
                  rounded={"md"}
                  width={"100%"}
                  align={"start"}
                  justifyContent={"space-between"}
                  cursor={"pointer"}
                >
                  <Flex alignItems={"center"} gap={3}>
                    <FaListCheck />
                    <Text fontSize={"lg"}>{"Inbox"}</Text>
                  </Flex>
                  <Text bg="blue.100" p="1" rounded={"md"} fontSize={"xs"}>
                    24
                  </Text>
                </Flex>
                <Flex
                  p="1"
                  _hover={{ bg: "gray.50" }}
                  rounded={"md"}
                  width={"100%"}
                  align={"start"}
                  justifyContent={"space-between"}
                  cursor={"pointer"}
                >
                  <Flex alignItems={"center"}>
                    <GrInProgress size={18} />
                    <Text mx="2" fontSize={"lg"}>
                      {"In-Progress"}
                    </Text>
                  </Flex>
                  <Text bg="blue.100" p="1" rounded={"md"} fontSize={"xs"}>
                    10
                  </Text>{" "}
                </Flex>
                <Flex
                  p="1"
                  _hover={{ bg: "gray.50" }}
                  rounded={"md"}
                  width={"100%"}
                  align={"start"}
                  justifyContent={"space-between"}
                  cursor={"pointer"}
                >
                  <Flex alignItems={"center"} gap={3}>
                    <FaRegThumbsUp size={20} />
                    <Text fontSize={"lg"}>{"Done"}</Text>
                  </Flex>
                  <Text></Text>
                </Flex>
                <Flex
                  p="1"
                  _hover={{ bg: "gray.50" }}
                  rounded={"md"}
                  width={"100%"}
                  align={"start"}
                  justifyContent={"space-between"}
                  cursor={"pointer"}
                >
                  <Flex alignItems={"center"}>
                    <MdDeleteOutline size={24} />
                    <Text fontSize={"lg"} mx="2">
                      {"Discard"}
                    </Text>
                  </Flex>
                  <Text></Text>
                </Flex>
              </VStack>
              <VStack
                divider={<StackDivider />}
                mt="5"
                maxH={"xl"}
                overflow={"scroll"}
                alignItems={"start"}
              ></VStack>
            </Flex>
          </GridItem>
          <GridItem
            w="100%"
            bg="white"
            p="4"
            rounded={"lg"}
            shadow={"lg"}
            colSpan={6}
          >
            <VStack
              divider={<StackDivider />}
              mt="2"
              maxH={"xl"}
              overflow={"scroll"}
              alignItems={"start"}
            >
              {data?.map((item, index) => {
                return (
                  <Flex
                    //   direction={"column"}
                    p="2"
                    rounded={"md"}
                    width={"100%"}
                    justifyContent={"space-between"}
                    cursor={"pointer"}
                    alignItems={"center"}
                    bg={"white"}
                    color={"black"}
                    _hover={{ bg: "blue.50" }}
                    onClick={() => {
                      setShowTicketModal(true);
                      setTicketData(item as any);
                    }}
                  >
                    <VStack align={"start"}>
                      <Text textColor={"purple.800"} fontWeight={"semibold"}>
                        {item.title}
                      </Text>
                      <Text
                        fontSize={"sm"}
                        fontWeight={"hairline"}
                        fontStyle={"italic"}
                      >
                        {item.description}
                      </Text>
                    </VStack>
                    <Text mr="4" textColor={"purple.800"} fontWeight={"bold"}>
                      {" "}
                      {item.ticketID}
                    </Text>
                  </Flex>
                );
              })}
            </VStack>
          </GridItem>
        </Grid>
      </Flex>

      <Modal
        isOpen={showticketModal}
        onClose={() => setShowTicketModal(false)}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ticket ID - {(ticketData as any)?.ticketID}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Flex direction={"column"}>
              <VStack
                mt="4"
                px="6"
                align={"start"}
                bg="#f1f5fa"
                rounded={"md"}
                py="6"
                minH={"80"}
              >
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w="full"
                >
                  <Text
                    textColor={"purple.800"}
                    fontSize={"xl"}
                    fontWeight={500}
                  >
                    Detail Information about Ticket
                  </Text>
                  <HStack>
                    <Tag size={"sm"} colorScheme="green">
                      {" "}
                      OPEN
                    </Tag>
                    <Tag size={"md"} colorScheme="orange">
                      {" "}
                      Low
                    </Tag>
                  </HStack>
                </Flex>
                <Text fontSize={"sm"}> {(ticketData as any)?.description}</Text>
                <Divider />
                <Text>Comments:</Text>
                <VStack divider={<StackDivider />}>
                  <Text>kjdfbsrkldjbferdfjbwejgfreblkgrqgbvue</Text>
                </VStack>
              </VStack>
              <Flex
                bg="#f1f5fa"
                p="4"
                mt="4"
                direction={"column"}
                rounded={"lg"}
              >
                <VStack align={"start"}>
                  <FormControl>
                    <FormLabel fontSize={"sm"} textColor={"gray.500"}>
                      Write your comment
                    </FormLabel>
                    <Textarea placeholder="Type here.." />
                  </FormControl>
                  <Button
                    bg="purple.900"
                    color={"white"}
                    _hover={{ bg: "purple.800" }}
                  >
                    Comment
                  </Button>
                </VStack>
              </Flex>
            </Flex>{" "}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => setShowTicketModal(false)}
            >
              Close
            </Button>
            <Button
              bg="purple.900"
              color={"white"}
              _hover={{ bg: "purple.800" }}
            >
              Confirm Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CreateTicketsForm showModal={showModal} setShowModal={setShowModal} />
    </>

    //  item preview of each inbox
  );
};

export default ClientTicketsDashboard;
