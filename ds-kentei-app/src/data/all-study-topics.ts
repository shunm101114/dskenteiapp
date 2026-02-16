import type { StudyTopic } from "../types";
import { studyTopics } from "./study-topics";
import { studyTopicsAdvanced } from "./study-topics-advanced";
import { studyTopicsExtra } from "./study-topics-extra";

export const allStudyTopics: StudyTopic[] = [
  ...studyTopics,
  ...studyTopicsAdvanced,
  ...studyTopicsExtra,
];
