import React from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export type DiaryInfo = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  writtenAt: string;
};

export const SummaryDiary = ({ diary }: { diary: DiaryInfo }): JSX.Element => {
  const writtenDate = () => {
    const date = dayjs(diary.writtenAt);
    return date.format("YY-MM-DD");
  };

  return (
    <>
      <div>{diary.title}</div>
      <div>{diary.content}</div>
      <div>
        {diary.tags.map((el) => {
          return <span key={uuidv4()}>{el}</span>;
        })}
      </div>
      <div>{writtenDate()}</div>
    </>
  );
};
