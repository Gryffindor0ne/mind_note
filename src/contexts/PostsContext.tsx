import React, { createContext, useState, useContext, useMemo } from "react";

export type DiaryInfo = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  writtenAt: string;
};

export type TagContextState = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export type PostsContextState = {
  posts: DiaryInfo[];
  setPosts: (posts: DiaryInfo[]) => void;
};

const tagContextDefaultValues: TagContextState = {
  tags: [],
  setTags: () => {},
};

const postsContextDefaultValues: PostsContextState = {
  posts: [],
  setPosts: () => {},
};

const TagContext = createContext<TagContextState>(tagContextDefaultValues);

const PostsContext = createContext<PostsContextState>(
  postsContextDefaultValues
);

const useTagContextState = () => {
  const context = useContext(TagContext);

  if (context === undefined) {
    throw new Error("TagContextState was used outside of its Provider");
  }

  return context;
};

const usePostsContextState = () => {
  const context = useContext(PostsContext);

  if (context === undefined) {
    throw new Error("PostsContextState was used outside of its Provider");
  }

  return context;
};

const PostsContextProvider = ({ children }: { children: JSX.Element }) => {
  const [tags, setTags] = useState<string[]>(tagContextDefaultValues.tags);

  const [posts, setPosts] = useState<DiaryInfo[]>([]);

  const tagState = useMemo(() => ({ tags, setTags }), [tags]);
  const postsState = useMemo(() => ({ posts, setPosts }), [posts]);

  console.log(tagState);
  console.log(postsState);

  return (
    <PostsContext.Provider value={postsState}>
      <TagContext.Provider value={tagState}>{children}</TagContext.Provider>
    </PostsContext.Provider>
  );
};

export { PostsContextProvider, useTagContextState, usePostsContextState };
