import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";
import styled from "styled-components";

import { usePostsContextState, DiaryInfo } from "@contexts/PostsContext";

const NewDiaryContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: 1rem auto 5rem auto;
`;

const InnerContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 70vw;
  border-radius: 10px;
  background-color: #eceff1;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 2.5rem 0rem;
`;

const TitleInput = styled.textarea`
  height: 4rem;
  border: none;
  font-size: 2rem;
  outline: none;
  background-color: #eceff1;
  margin: 1rem 0rem;

  ::placeholder {
    color: #b0bec5;
    font-weight: bold;
    font-size: 2rem;
  }
`;

const TitleLine = styled.div`
  width: 10rem;
  height: 6px;
  margin-bottom: 2rem;
  border-radius: 1px;
  background-color: #607d8b;
`;

const TagContainer = styled.div`
  > ul {
    display: flex;
    margin-top: 1rem;
    flex-wrap: wrap;
    > li {
      cursor: pointer;
      display: flex;
      list-style: none;
      font-size: 0.9em;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      word-break: keep-all;
      border-radius: 15px;
      background-color: #a7ffeb;
      padding: 10px;
      > span {
        > svg {
          font-size: 1rem;
          margin-left: 0.2rem;
        }
      }
    }
  }
`;

const TagInput = styled.input`
  height: 2rem;
  border: none;
  font-size: 1.2rem;
  outline: none;
  background-color: #eceff1;

  ::placeholder {
    color: #b0bec5;
    font-weight: bold;
    font-size: 1rem;
  }
`;

const ContentInput = styled.textarea`
  height: 20rem;
  border: none;
  font-size: 1rem;
  outline: none;
  margin: 2rem 0;
  background-color: #eceff1;
  line-height: 1.7rem;

  ::placeholder {
    color: #b0bec5;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackBtn = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  margin: 1rem 0;
  padding: 0.7rem 1.2rem;

  > svg {
    margin-right: 0.5rem;
  }
  > span {
    font-weight: bold;
    font-size: 1.2rem;
  }

  :hover {
    background-color: #eceff1;
    color: #1de9b6;
  }
`;

const RegisterBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #90a4ae;
  border-radius: 10px;
  color: #90a4ae;
  font-weight: bold;
  font-size: 1.2rem;
  width: 8rem;
  padding: 10px;

  :hover {
    border: none;
    background: #1de9b6;
    color: white;
    font-weight: bold;
  }
`;

const NewDiary = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:4000";
  const { posts, setPosts } = usePostsContextState();

  const [inputValue, setInputValue] = useState<DiaryInfo>({
    id: 0,
    title: "",
    content: "",
    tags: [],
    writtenAt: "",
  });

  const addTag = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const filtered = inputValue.tags.filter((el) => el === e.target.value);

    if (e.target.value !== "" && filtered.length === 0) {
      setInputValue({
        ...inputValue,
        tags: [...inputValue.tags, e.target.value],
      });
    }
    e.target.value = "";
  };

  const removeTag = (clickedIndex: number) => {
    setInputValue(() => {
      return {
        ...inputValue,
        tags: inputValue.tags.filter((_, index) => {
          return index !== clickedIndex;
        }),
      };
    });
  };

  const postNote = async () => {
    if (inputValue.title === "" && inputValue.content === "") {
      alert("제목과 본문은 빈 칸일 수 없습니다.");
    } else {
      try {
        const response = await axios.post(`${URL}/notes`, {
          id: posts.length + 1,
          title: inputValue.title,
          content: inputValue.content,
          tags: inputValue.tags,
          writtenAt: new Date().toISOString(),
        });

        if (response.status === 201) {
          Swal.fire({
            title: "일기 등록완료",
            text: "새 일기가 등록되었습니다!",
            icon: "success",
          });
          navigate(-1);
        } else {
          Swal.fire({
            title: "일기 등록 실패",
            text: "새 일기 등록에 실패하였습니다!",
            icon: "error",
          });
        }
      } catch (err) {
        throw new Error(`${err}`);
      }
    }
  };

  return (
    <>
      <NewDiaryContainer>
        <Title>새 일기 작성</Title>

        <InnerContainer>
          <TitleInput
            placeholder="제목을 입력하세요"
            value={inputValue.title}
            onChange={(event) => {
              setInputValue({ ...inputValue, title: event.target.value });
            }}
          ></TitleInput>
          <TitleLine></TitleLine>

          <TagContainer>
            <TagInput
              type="text"
              onKeyUp={(event) =>
                event.key === "Enter" ? addTag(event) : null
              }
              placeholder="태그를 입력할 수 있습니다."
            />
            <ul>
              {inputValue.tags.map((el, index) => {
                return (
                  <li key={"tagInput" + index}>
                    <span>{el}</span>
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag(index)}
                    >
                      <IoMdCloseCircle />
                    </span>
                  </li>
                );
              })}
            </ul>
          </TagContainer>

          <ContentInput
            placeholder="당신의 일기를 적어주세요."
            value={inputValue.content}
            onChange={(event) => {
              setInputValue({ ...inputValue, content: event.target.value });
            }}
          ></ContentInput>
        </InnerContainer>
        <BtnContainer>
          <BackBtn
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoMdArrowRoundBack />
            <span>나가기</span>
          </BackBtn>
          <RegisterBtn onClick={postNote}>등록</RegisterBtn>
        </BtnContainer>
      </NewDiaryContainer>
    </>
  );
};

export default NewDiary;
