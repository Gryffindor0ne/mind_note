import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { DiaryInfo } from "@contexts/PostsContext";
import Tags from "./Tags";
import { koreanDateFormatter } from "@utils/dateUtils";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const Title = styled.h1`
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0.5rem 0;
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

export const SummaryDiary = ({ diary }: { diary: DiaryInfo }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Title
          onClick={() => {
            navigate(`/diary/${diary.id}`);
          }}
        >
          {diary.title}
        </Title>
        <Content>{diary.content}</Content>
        <Date>{koreanDateFormatter(diary.writtenAt)}</Date>
        <TagContainer>
          <Tags tags={diary.tags} />
        </TagContainer>
      </Container>
    </>
  );
};
