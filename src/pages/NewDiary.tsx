import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft } from "react-icons/ai";

export type NoteInfo = {
  id: number;
  title: string;
  content: string;
  tags: string[];
};

const NewDiary = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<NoteInfo>({
    id: 0,
    title: "",
    content: "",
    tags: [],
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

  // const postNote = async() => {

  // }

  return (
    <>
      <div>새 일기 작성</div>
      <textarea
        placeholder="제목을 입력하세요"
        value={inputValue.title}
        onChange={(event) => {
          setInputValue({ ...inputValue, title: event.target.value });
        }}
      ></textarea>

      <div>
        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTag(event) : null)}
          placeholder="태그를 입력할 수 있습니다."
        />
        <ul>
          {inputValue.tags.map((el, index) => {
            return (
              <li key={"tagInput" + index}>
                <span> # {el}</span>
                <span
                  className="tag-close-icon"
                  onClick={() => removeTag(index)}
                >
                  &times;
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <textarea
        placeholder="당신의 일기를 적어주세요."
        value={inputValue.content}
        onChange={(event) => {
          setInputValue({ ...inputValue, content: event.target.value });
        }}
      ></textarea>

      <div
        onClick={() => {
          navigate(-1);
        }}
      >
        <AiOutlineArrowLeft />
        뒤로 가기
      </div>
      <span>취소</span>
      <span>등록</span>
    </>
  );
};

export default NewDiary;
