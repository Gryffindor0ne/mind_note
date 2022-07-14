import dayjs from "dayjs";

export const koreanDateFormatter = (date: string | undefined) => {
  const writtenDate = dayjs(date);
  return writtenDate.format("YYYY년 MM월 DD일");
};
