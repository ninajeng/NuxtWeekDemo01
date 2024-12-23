export const useDayNum = () => {
  const countDay = (endDate, startDay) => {
    if (!endDate || !startDay) return;
    const end = new Date(endDate);
    const start = new Date(startDay);
    return parseInt(Math.abs(end - start) / 1000 / 60 / 60 / 24);
  };

  return {
    countDay,
  };
};
