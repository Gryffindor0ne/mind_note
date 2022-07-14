import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <span>Mind Note</span>

      <span
        onClick={() => {
          navigate(`/diary/new`);
        }}
      >
        새 일기 쓰기
      </span>
    </>
  );
};

export default Header;
