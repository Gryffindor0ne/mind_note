import React, { useState, useEffect, useCallback } from "react";
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
  const { tag } = useTagContextState();

  const [selectedTagPosts, setSelectdPosts] = useState<DiaryInfo[]>([]);

  const getPostData = useCallback(async () => {
    try {
      const getData = await axios.get(`${URL}/notes`);

      if (getData.status === 200) {
        setPosts(getData.data);
      } else {
        throw new Error("Network Error");
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }, [setPosts]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  useEffect(() => {
    if (tag) {
      setSelectdPosts(
        posts.filter((el) => {
          return el.tags.includes(tag);
        })
      );
    }
  }, [tag, posts]);

  console.log(selectedTagPosts);

  return (
    <>
      <Container>
        <Title>일기 목록</Title>

        {tag.length !== 0
          ? selectedTagPosts.map((diary) => {
              return <SummaryDiary key={uuidv4()} diary={diary} />;
            })
          : posts.map((diary) => {
              return <SummaryDiary key={uuidv4()} diary={diary} />;
            })}
      </Container>
    </>
  );
};

export default DiaryList;
