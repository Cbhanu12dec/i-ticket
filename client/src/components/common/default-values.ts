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
    title: "",
    description: "",
    assignee: "all",
    startTime: "now",
    endTime: "now",
  };
};

export const getDefaultFaq = () => {
  return {
    title: "",
    description: "",
    assignee: "all",
  };
};
