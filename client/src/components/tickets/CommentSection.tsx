import { Avatar, Button, Flex, Input, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import fromnow from "fromnow";
import _ from "lodash";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const CommentSection = ({
  comment,
  collapse,
  id,
  setComments,
  comments,
  userInfo,
}: any) => {
  const [commentTyped, setCommentTyped] = useState<string>("");
  const [showcommentInbox, setShowCommentInbox] = useState<boolean>(false);

  const nestedComments = (comment.children || []).map((comment: any) => {
    return (
      <CommentSection
        key={comment.id}
        comment={comment}
        collapse={collapse}
        id={id}
        setComments={setComments}
        comments={comments}
        userInfo={userInfo}
      />
    );
  });

  return (
    <Flex mt="4" ml="6" direction={"column"}>
      <Flex alignItems={"center"}>
        <Flex direction={"row"}>
          <Avatar name={comment.author} size={"xs"} />
          <Text fontWeight={"semibold"} ml="2" fontSize={"md"}>
            {_.capitalize(comment.author)}
          </Text>
          <Text mt="1" ml="1" fontSize={"xs"} textColor={"gray.500"}>
            {fromnow(comment.commentTime as string, {
              and: true,
              suffix: true,
            })}
          </Text>
        </Flex>

        <Flex
          onClick={() => collapse(comment.id)}
          cursor={"pointer"}
          ml="5"
          mt="-1"
          fontSize={"lg"}
        >
          {comment.expanded ? `[-]` : `[+]`}
        </Flex>
      </Flex>

      {comment.expanded && (
        <Flex direction={"column"} ml="8" mt="-2">
          <div>{comment.text}</div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setShowCommentInbox(!showcommentInbox)}
          >
            reply
          </div>
          {showcommentInbox && (
            <Flex>
              <Input
                size={"sm"}
                placeholder="Add your comment here"
                onChange={(e) => setCommentTyped(e.target.value)}
              />
              <Button
                mx="2"
                bg="purple.900"
                color={"white"}
                leftIcon={<AiOutlineSend />}
                minW={"28"}
                size={"sm"}
                _hover={{ bg: "purple.800" }}
                onClick={() => {
                  const cdata = [
                    ...comments,
                    {
                      author:
                        (userInfo as any)?.firstName +
                        " " +
                        (userInfo as any)?.lastName,
                      children: [],
                      expanded: true,
                      id: Math.floor(Math.random() * 900000) + 100000,
                      parentId: comment.id,
                      text: commentTyped,
                      commentTime: dayjs().toISOString(),
                    },
                  ];
                  setComments(cdata);
                }}
              >
                comment
              </Button>
            </Flex>
          )}
          {nestedComments}
        </Flex>
      )}
    </Flex>
  );
};

export default CommentSection;
