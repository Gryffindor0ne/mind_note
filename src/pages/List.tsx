import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { SummaryDiary, DiaryInfo } from "@components/SummaryDiary";

const DiaryList = () => {
  const URL = "http://localhost:4000";
  const [notes, setNotes] = useState<DiaryInfo[]>([]);

  const getNoteData = useCallback(async () => {
    try {
      const getData = await axios.get(`${URL}/notes`);

      if (getData.status === 200) {
        setNotes(getData.data);
      } else {
        throw new Error("Network Error");
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }, [setNotes]);

  useEffect(() => {
    getNoteData();
  }, [getNoteData]);

  return (
    <>
      {notes.map((diary) => {
        return <SummaryDiary key={uuidv4()} diary={diary} />;
      })}
    </>
  );
};

export default DiaryList;
