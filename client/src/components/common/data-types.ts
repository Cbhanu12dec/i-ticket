import React from "react";

export interface AnnouncementDataType {
  key: React.Key;
  title: string;
  description: string;
  status: string;
  startTime: string;
  endTime: string;
  assignee: string;
}
