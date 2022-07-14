import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { usePostsContextState, DiaryInfo } from "@contexts/PostsContext";
import { koreanDateFormatter } from "@utils/dateUtils";

const Diary = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const [currentDiary, setCurrentDiary] = useState<DiaryInfo | undefined>();
  const { posts } = usePostsContextState();

  useEffect(() => {
    if (id) {
      setCurrentDiary(posts.find((el) => el.id === parseInt(id, 10)));
    }
  }, [posts, id]);

  return (
    <>
      <section>
        <div>{currentDiary?.title}</div>
        <div>{koreanDateFormatter(currentDiary?.writtenAt)}</div>
        <div>
          {currentDiary?.tags.map((el) => {
            return <span key={uuidv4()}>{el}</span>;
          })}
        </div>
        <div>{currentDiary?.content}</div>

        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <AiOutlineArrowLeft />
          <span>글 목록으로</span>
        </div>
      </section>
    </>
  );
};

export default Diary;
