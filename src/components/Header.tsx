import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  width: 100%;
  height: 85px;
`;

const Title = styled.h1`
  margin: 1.5rem 1rem;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  background: white;
  color: #90a4ae;
  width: 8rem;
  height: 3rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <Title>Mind Note</Title>
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
