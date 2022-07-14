import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { DiaryInfo } from "@contexts/PostsContext";
import { koreanDateFormatter } from "@utils/dateUtils";

export const SummaryDiary = ({ diary }: { diary: DiaryInfo }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <section
        onClick={() => {
          navigate(`/diary/${diary.id.toString()}`);
        }}
      >
        <div>{diary.title}</div>
        <div>{diary.content}</div>
        <div>
          {diary.tags.map((el) => {
            return <span key={uuidv4()}>{el}</span>;
          })}
        </div>
        <div>{koreanDateFormatter(diary.writtenAt)}</div>
      </section>
    </>
  );
};
