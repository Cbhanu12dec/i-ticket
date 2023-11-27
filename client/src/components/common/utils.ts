import dayjs from "dayjs";
export interface AnnouncementMetrics {
  TOTAL: "Total";
  PUBLISHED: "Published";
  UPCOMING: "Upcoming";
}

// export const PUBLIC_URL = "http://localhost:5001";
export const PUBLIC_URL = "http://18.225.235.171:5001";

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
