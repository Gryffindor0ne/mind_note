import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { SummaryDiary } from "@components/SummaryDiary";
import Header from "@components/Header";
import {
  usePostsContextState,
  useTagContextState,
  DiaryInfo,
} from "@contexts/PostsContext";

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
      <Header />
      {posts.map((diary) => {
        return <SummaryDiary key={uuidv4()} diary={diary} />;
      })}
    </>
  );
};

export default DiaryList;
