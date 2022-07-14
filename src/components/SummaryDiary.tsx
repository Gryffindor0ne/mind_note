import React from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { DiaryInfo } from "@contexts/PostsContext";

export const SummaryDiary = ({ diary }: { diary: DiaryInfo }): JSX.Element => {
  const writtenDate = () => {
    const date = dayjs(diary.writtenAt);
    return date.format("YYYY년 MM월 DD일");
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
