import type { StudyTopic } from "../types";
import { studyTopics } from "./study-topics";
import { studyTopicsAdvanced } from "./study-topics-advanced";
import { studyTopicsExtra } from "./study-topics-extra";
import { studyTopicsDeExtra } from "./study-topics-de-extra";
import { studyTopicsBizExtra } from "./study-topics-biz-extra";
import { studyTopicsDsExtra } from "./study-topics-ds-extra";

export const allStudyTopics: StudyTopic[] = [
  ...studyTopics,
  ...studyTopicsAdvanced,
  ...studyTopicsExtra,
  ...studyTopicsDeExtra,
  ...studyTopicsBizExtra,
  ...studyTopicsDsExtra,
];
