import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { SummaryDiary } from "@components/SummaryDiary";
import DateRangeFinder from "@components/DateRangeFinder";

import {
  usePostsContextState,
  useTagContextState,
  useDateContextState,
  DiaryInfo,
} from "@contexts/PostsContext";

import { dateRangeCheck } from "@utils/dateUtils";
import { sortListDescend } from "@utils/listSorts";
import dayjs from "dayjs";

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
  const { tag, setTag } = useTagContextState();
  const { dates, setDates } = useDateContextState();
  const [startDate, endDate] = dates;

  const [selectedTagPosts, setSelectedTagPosts] = useState<DiaryInfo[]>([]);
  const [selectedDatePosts, setSelectedDatePosts] = useState<DiaryInfo[]>([]);

  const getPostData = useCallback(async () => {
    try {
      const getData = await axios.get(`${URL}/notes`);

      if (getData.status === 200) {
        setPosts(sortListDescend(getData.data));
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
      setSelectedTagPosts(posts.filter((el) => el.tags.includes(tag)));
    }
  }, [tag, posts]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      setSelectedDatePosts(
        posts.filter((el) => {
          return dateRangeCheck(
            [
              dayjs(startDate).subtract(1, "day").format("YYYY-MM-DD"),
              dayjs(endDate).add(1, "day").format("YYYY-MM-DD"),
            ],
            dayjs(el.writtenAt).format("YYYY-MM-DD")
          );
        })
      );
      setTag("");
    }
  }, [dates, posts]);

  return (
    <>
      <Container>
        <Title>일기 목록</Title>
        <DateRangeFinder />

        {tag.length !== 0
          ? selectedTagPosts.map((diary) => {
              return <SummaryDiary key={uuidv4()} diary={diary} />;
            })
          : dates.length !== 0
          ? selectedDatePosts.map((diary) => {
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
