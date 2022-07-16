import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useTagContextState } from "@contexts/PostsContext";
import { useDateContextState } from "@contexts/PostsContext";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 120px;
  width: 100vw;
  height: 15vh;
`;

const Title = styled.h1`
  cursor: pointer;
  font-size: 3rem;
  margin: 1.5rem 1rem;

  :hover {
    opacity: 0.7;
  }
`;

const WriteBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #90a4ae;
  border-radius: 10px;
  background: white;
  color: #90a4ae;
  width: 8rem;
  height: 3rem;
  font-size: 1.2rem;
  font-weight: bold;

  :hover {
    border: none;
    background: #1de9b6;
    color: white;
    font-weight: bold;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { setTag } = useTagContextState();
  const { setDates } = useDateContextState();

  return (
    <>
      <HeaderContainer>
        <Title
          onClick={() => {
            navigate(`/`);
            setTag("");
            setDates([]);
          }}
        >
          Mind Note
        </Title>
        <WriteBtn
          onClick={() => {
            navigate(`/diary/new`);
          }}
        >
          새 일기 쓰기
        </WriteBtn>
      </HeaderContainer>
    </>
  );
};

export default Header;
