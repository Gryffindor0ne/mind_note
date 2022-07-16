import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const koreanDateFormatter = (date: string | undefined) => {
  const writtenDate = dayjs(date);
  return writtenDate.format("YYYY년 MM월 DD일");
};

export const dateRangeCheck = (range: string[], targetDate: string) => {
  const [startDate, endDate] = range;
  console.log(startDate, endDate);
  console.log(dayjs(targetDate).isBetween(startDate, endDate));
  return dayjs(targetDate).isBetween(startDate, endDate);
};
