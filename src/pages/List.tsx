import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { SummaryDiary } from "@components/SummaryDiary";

import {
  usePostsContextState,
  useTagContextState,
  DiaryInfo,
} from "@contexts/PostsContext";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  border-bottom: 2px solid #e0e0e0;
  margin: 3rem 0rem;
  padding: 2rem 0rem;
`;

const DiaryList = () => {
  const URL = "http://localhost:4000";
  const { posts, setPosts } = usePostsContextState();
  const { tags, setTags } = useTagContextState();

  const getPostData = useCallback(async () => {
    try {
      const getData = await axios.get(`${URL}/notes`);
      let allTags: string[] = [];
      if (getData.status === 200) {
        setPosts(getData.data);
        getData.data.map((el: DiaryInfo) =>
          el.tags.forEach((e) => {
            if (!allTags.includes(e)) allTags.push(e);
          })
        );
        setTags(allTags);
      } else {
        throw new Error("Network Error");
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }, [setPosts]);

  console.log(tags);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  return (
    <>
      <Container>
        <Title>일기 목록</Title>
        {posts.map((diary) => {
          return <SummaryDiary key={uuidv4()} diary={diary} />;
        })}
      </Container>
    </>
  );
};

export default DiaryList;
