import dayjs from "dayjs";

export interface appDefaultValues {
  ANNOUNCEMENT: {
    title: "";
    description: "";
    assignee: "all";
    startTime: "now";
    endTime: "now";
  };
}

export const getDefaultAnnouncement = () => {
  return {
    id: "",
    title: "",
    description: "",
    assignee: "all",
    startTime: dayjs().toISOString(),
    endTime: dayjs().toISOString(),
  };
};

export const getDefaultFaq = () => {
  return {
    title: "",
    description: "",
    assignee: "all",
  };
};
