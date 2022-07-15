import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import styled from "styled-components";

import { usePostsContextState, DiaryInfo } from "@contexts/PostsContext";
import { koreanDateFormatter } from "@utils/dateUtils";
import Tags from "@components/Tags";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 2rem auto;
`;

const Title = styled.h1`
  cursor: pointer;
  font-size: 2.5rem;
  margin: 2rem 0rem;
`;

const Date = styled.div`
  display: flex;
  color: #90a4ae;
  height: 2rem;
  font-size: 1rem;
  margin: 0.5rem 0.5rem;
`;

const TagContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  line-height: 1.5em;
  font-size: 1.2rem;
  color: #9e9e9e;
  margin: 3rem 0;
`;

const BackBtn = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 0.5rem;
  }
  > span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #90a4ae;
  }

  margin: 1rem;
`;

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
      <Container>
        <Title>{currentDiary?.title}</Title>
        <Date>{koreanDateFormatter(currentDiary?.writtenAt)}</Date>
        <TagContainer>
          <Tags tags={currentDiary?.tags} />
        </TagContainer>
        <Content>{currentDiary?.content}</Content>

        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoMdArrowRoundBack />
          <span>글 목록으로</span>
        </BackBtn>
      </Container>
    </>
  );
};

export default Diary;
