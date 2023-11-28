import dayjs from "dayjs";
export interface AnnouncementMetrics {
  TOTAL: "Total";
  PUBLISHED: "Published";
  UPCOMING: "Upcoming";
}

export const PUBLIC_URL = "http://localhost:5001";
// export const PUBLIC_URL = "http://18.225.235.171:5001";

export const getFileType = (name: string) => {
  return name?.split(".")[1];
};

export const timeDifference = (time: string, time2: string) => {
  const currentTime = dayjs();
  const startTime = dayjs(time);
  const endTime = dayjs(time2);
  const startTimeDiff = startTime.diff(currentTime);
  const endTimeDiff = currentTime.diff(endTime);

  if (startTimeDiff < 0 && endTimeDiff < 0) {
    return "Running";
  } else if (startTimeDiff < 0 && endTimeDiff > 0) {
    return "Published";
  } else if (startTimeDiff > 0 && endTimeDiff < 0) {
    return "Upcoming";
  }
};

export const validateSignup = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export const shortternText = (text: string) => {
  return text?.length > 160 ? text.slice(0, 160) + "..." : text;
};

export const ticketStatuses = ["new", "open", "pending", "completed"];

export const ticketProgressss = (status: string) => {
  if (status?.toLowerCase() === "new") {
    return {
      title: "Created",
      description: "Ticket has been created.",
    };
  }
  if (status?.toLowerCase() === "open") {
    return {
      title: "In Progress",
      description: "Ticket has been created.",
    };
  } else if (status?.toLowerCase() === "pending") {
    return {
      title: "Pending Items",
      description: "Please read the comments.",
    };
  } else {
    return {
      title: "Completed",
      description: "Provided the solution",
    };
  }
};

export const ticketProgress = [
  {
    title: "Created",
    description: "Ticket has been created.",
  },
  {
    title: "In Progress",
    description: "Ticket has been opened.",
  },
  {
    title: "Pending Items",
    description: "Please read the comments.",
  },
  {
    title: "Completed",
    description: "Provided the solution",
  },
];

export const getStatusIndex = (status: string) => {
  const index = ticketStatuses?.findIndex(
    (item) => item?.toLowerCase() === status?.toLowerCase()
  );
  return index;
};
