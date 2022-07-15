import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { useTagContextState } from "@contexts/PostsContext";

const TagBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  background: white;
  color: #90a4ae;
  width: 6rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0.8rem 0 0;

  :hover {
    border: none;
    background: #1de9b6;
    color: white;
    font-weight: bold;
  }
`;

const Tags = ({ tags }: { tags: string[] | undefined }) => {
  const navigate = useNavigate();
  const { tag, setTag } = useTagContextState();

  const tagClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;

    if (target) {
      setTag(target.innerHTML);
      navigate("/diary");
    }
  };

  console.log(tag);

  return (
    <>
      {tags?.map((el: string) => {
        return (
          <TagBtn key={uuidv4()} onClick={tagClick}>
            {el}
          </TagBtn>
        );
      })}
    </>
  );
};

export default Tags;
