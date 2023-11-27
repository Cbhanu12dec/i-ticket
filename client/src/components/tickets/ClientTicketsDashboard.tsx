import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
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
import { FaListCheck, FaRegThumbsUp } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { useEffect, useState } from "react";
import CreateTicketsForm from "./CreateTicketsForm";
import axios from "axios";
import { PUBLIC_URL, getFileType } from "../common/utils";
import { ImFilePdf } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import Dashboard from "../dashboard/Dashboard";
import CommentSection from "./CommentSection";
import { CommentsDataType } from "../common/data-types";
import { AiOutlineSend } from "react-icons/ai";
import dayjs from "dayjs";
import "semantic-ui-css/semantic.min.css";

const ClientTicketsDashboard = () => {
  const [showticketModal, setShowTicketModal] = useState<boolean>(false);
  const [ticketData, setTicketData] = useState();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeStep, setActiveStep] = useState<string>("inbox");
  const [comments, setComments] = useState<CommentsDataType[]>([]);
  const [commentTree, setCommentTree] = useState([]);
  const [commentTyped, setCommentTyped] = useState<string>("");
  const [userInfo, setUserInfo] = useState({});

  const handleCommentCollapse = (id: any) => {
    const updatedComments = comments.map((c: any) => {
      if (c.id === id) {
        return {
          ...c,
          expanded: !c.expanded,
        };
      } else return c;
    });
    setComments(updatedComments);
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

  useEffect(() => {
    axios
      .get(PUBLIC_URL + "/ticket/get-all-tickets")
      .then((response) => {
        setTickets(response.data.ticketInfo);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
    const user = JSON.parse(localStorage.getItem("userInfo") as string);
    setUserInfo(user);
  }, []);

  const getMenuIcons = (itemName: string) => {
    if (itemName === "Inbox") {
      return <FaListCheck />;
    } else if (itemName === "In-Progress") {
      return <GrInProgress size={18} />;
    } else if (itemName === "Discard") {
      return <MdDeleteOutline size={24} />;
    } else {
      return <FaRegThumbsUp size={20} />;
    }
  };

  useEffect(() => {
    const preparedData = tickets?.filter((item) => item === activeStep);
    setFilteredTickets(preparedData);
  }, [activeStep, tickets]);

  const menyItems = ["Inbox", "In-Progress", "Done", "Discard"];

  const getIcons = (type: string) => {
    if (type?.toLowerCase() === "pdf") {
      return ImFilePdf;
    }
  };

  const getAttachmentComponent = (name: string) => {
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
        alignItems={"center"}
        cursor={"pointer"}
      >
        <Icon as={getIcons(getFileType(fileName))} />
        <Text ml="2" mr="4" fontSize={"sm"} textColor={"gray.700"}>
          {fileName}
        </Text>
        <IoMdDownload size={20} onClick={() => handleDownload(fileName)} />
      </Flex>
    );
  };

  const createTree = (list: any) => {
    var map: any = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };
  useEffect(() => {
    const updatedTree = createTree(comments);
    setCommentTree(updatedTree as any);
    // axios
    //   .put(PUBLIC_URL + "/ticket/update-comments",{
    //     ticketNumber: (ticketData as any)?.ticketNumber,
    //     comments: comments
    //   })
    //   .then((response) => {
    //     console.log("*********** comments");
    //   })
    //   .catch((error) => {});
  }, [comments]);

  return (
    <Dashboard>
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
          <Button
            bg="purple.900"
            color={"white"}
            _hover={{ bg: "purple.800" }}
            onClick={() => setShowModal(true)}
          >
            Create Ticket
          </Button>
        </Flex>
        <Grid templateColumns="repeat(9, 1fr)" gap={4} w={"full"}>
          <GridItem colSpan={2} bg="white" p="4" rounded={"lg"}>
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
                {menyItems?.map((item) => {
                  return (
                    <Flex
                      mt="2"
                      p="1"
                      _hover={{ bg: "gray.50" }}
                      rounded={"md"}
                      width={"100%"}
                      align={"start"}
                      justifyContent={"space-between"}
                      cursor={"pointer"}
                      onClick={() => setActiveStep("inbox")}
                    >
                      <Flex alignItems={"center"} gap={3}>
                        {getMenuIcons(item)}
                        <Text fontSize={"lg"}>{item}</Text>
                      </Flex>
                      <Text
                        bg="blue.100"
                        py="1"
                        px="2"
                        rounded={"md"}
                        fontSize={"xs"}
                      >
                        {tickets?.length}
                      </Text>
                    </Flex>
                  );
                })}
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
          <GridItem w="100%" bg="white" p="4" rounded={"lg"} colSpan={7}>
            <VStack
              divider={<StackDivider />}
              mt="2"
              maxH={"xl"}
              overflow={"scroll"}
              alignItems={"start"}
            >
              {tickets?.map((item: any, index) => {
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
                      setComments(item?.comments);
                      const updatedTree = createTree(item?.comments);
                      setCommentTree(updatedTree as any);
                    }}
                  >
                    <VStack align={"start"}>
                      <Text textColor={"purple.800"} fontWeight={"semibold"}>
                        {item?.title}
                      </Text>
                      <Text
                        fontSize={"sm"}
                        fontWeight={"hairline"}
                        fontStyle={"italic"}
                      >
                        {item?.description}
                      </Text>
                    </VStack>
                    <Text mr="4" textColor={"purple.800"} fontWeight={"bold"}>
                      {" "}
                      {item?.ticketNumber}
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
          <ModalHeader>
            Ticket ID - {(ticketData as any)?.ticketNumber}
          </ModalHeader>
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
                    {(ticketData as any)?.title}
                  </Text>
                  <HStack>
                    <Tag size={"sm"} colorScheme="green">
                      {" "}
                      OPEN
                    </Tag>
                    {/* <Tag size={"md"} colorScheme="orange">
                      {" "}
                      {(ticketData as any)?.priority}
                    </Tag> */}
                    <div className="ui green tag label">
                      {(ticketData as any)?.priority}
                    </div>
                  </HStack>
                </Flex>
                <Text fontSize={"sm"}> {(ticketData as any)?.description}</Text>
                <Divider />
                <Text>Attachments:</Text>
                {getAttachmentComponent((ticketData as any)?.files[0])}
                <Divider />
                <Text fontWeight={"semibold"}>Comments:</Text>

                <Flex direction={"column"} ml="-4" mt="-4">
                  {commentTree.map((comment: any) => {
                    return (
                      <CommentSection
                        key={comment.id}
                        id={comment.id}
                        comment={comment}
                        comments={comments}
                        setComments={setComments}
                        collapse={handleCommentCollapse}
                        userInfo={userInfo}
                      />
                    );
                  })}
                </Flex>
                <Divider my="3" />
                <Text> Add new comment</Text>
                <Flex>
                  <Input
                    placeholder="Add your comment here"
                    onChange={(e) => setCommentTyped(e.target.value)}
                  />
                  <Button
                    mx="2"
                    bg="purple.900"
                    color={"white"}
                    leftIcon={<AiOutlineSend />}
                    minW={"32"}
                    _hover={{ bg: "purple.800" }}
                    onClick={() => {
                      setComments([
                        ...comments,
                        {
                          id: Math.floor(Math.random() * 900000) + 100000,
                          parentId: null,
                          text: commentTyped,
                          author:
                            (userInfo as any)?.firstName +
                            " " +
                            (userInfo as any)?.lastName,
                          children: null,
                          commentTime: dayjs().toISOString(),
                        },
                      ]);
                    }}
                  >
                    comment
                  </Button>
                </Flex>
              </VStack>
              <Flex
                bg="#f1f5fa"
                p="4"
                mt="4"
                direction={"column"}
                rounded={"lg"}
              >
                {/* <VStack align={"start"}>
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
                </VStack> */}
                <Text
                  textColor={"purple.800"}
                  fontSize={"lg"}
                  fontWeight={"semibold"}
                >
                  Ticket Status
                </Text>
                <div className="ui ordered steps mini">
                  <div className="completed step">
                    <div className="content">
                      <div className="title">Created</div>
                      <div className="description">Ticket has been created</div>
                    </div>
                  </div>
                  <div className="completed step">
                    <div className="content">
                      <div className="title">Pending for documents</div>
                      <div className="description">
                        please read the comments.
                      </div>
                    </div>
                  </div>
                  <div className="active step">
                    <div className="content">
                      <div className="title">Completed</div>
                      <div className="description">Provided the solution</div>
                    </div>
                  </div>
                </div>
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
    </Dashboard>

    //  item preview of each inbox
  );
};

export default ClientTicketsDashboard;
