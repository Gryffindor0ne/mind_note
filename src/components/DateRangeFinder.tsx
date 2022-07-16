import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import dayjs from "dayjs";

import {
  useDateContextState,
  useTagContextState,
} from "@contexts/PostsContext";

const DateRange = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin: 0 1rem;
`;

export default function DateRangeFinder() {
  const { tag, setTag } = useTagContextState();
  const { dates, setDates } = useDateContextState();
  const [startValue, setStartValue] = React.useState<Date | null>(null);
  const [endValue, setEndValue] = React.useState<Date | null>(null);

  const start = dayjs(startValue).format("YYYY-MM-DD");
  const end = dayjs(endValue).format("YYYY-MM-DD");

  React.useEffect(() => {
    const dateSet = [start, end];
    const arrayCheck = dateSet.every((value, idx) => value === dates[idx]);
    if (startValue !== null && endValue !== null && !arrayCheck) {
      setDates([start, end]);
    }
  }, [dates, setDates, startValue, endValue, end, start]);

  React.useEffect(() => {
    if (tag) {
      setDates([]);
      setStartValue(null);
      setEndValue(null);
    }
  }, [tag]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRange>
        <DatePicker
          label="Start Day"
          value={startValue}
          onChange={(newValue) => {
            setStartValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Text>to</Text>

        <DatePicker
          label="End Day"
          value={endValue}
          onChange={(newValue) => {
            setEndValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </DateRange>
    </LocalizationProvider>
  );
}
