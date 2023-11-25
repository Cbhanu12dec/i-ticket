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
export interface FaqDataType {
  key: React.Key;
  title: string;
  description: string;
  isHidden: boolean;
  createdAt: string;
  assignee: string;
  faqNumber: string;
  files: Array<string>;
}

export interface AnnouncementsStats {
  total: number;
  running: number;
  published: number;
  upcomming: number;
}
