import { AnnouncementDataType } from "./data-types";
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
