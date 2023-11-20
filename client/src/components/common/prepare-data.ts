import { AnnouncementDataType, FaqDataType } from "./data-types";
import dayjs from "dayjs";
import { timeDifference } from "./utils";
export const prepareAnnouncements = (data: any) => {
  const toReturn: AnnouncementDataType[] = data?.map((announcement: any) => {
    return {
      key: announcement?._id,
      title: announcement?.title,
      description: announcement?.description,
      status: timeDifference(announcement?.startTime, announcement?.endTime),
      startTime: dayjs(announcement?.startTime).format("MM-DD-YYYY hh:MMa"),
      endTime: dayjs(announcement?.endTime).format("MM-DD-YYYY hh:MMa"),
      assignee: announcement?.assignee,
    };
  });
  return toReturn;
};

export const prepareFaqs = (data: any) => {
  const toReturn: FaqDataType[] = data?.map((faq: any) => {
    return {
      key: faq?._id,
      title: faq?.title,
      description: faq?.description,
      isHidden: faq?.isHidden,
      faqNumber: faq?.faqNumber,
      files: faq?.files,
      createdAt: dayjs(faq?.createdAt).format("MM-DD-YYYY hh:MMa"),
      assignee: faq?.assignee,
    };
  });
  return toReturn;
};
