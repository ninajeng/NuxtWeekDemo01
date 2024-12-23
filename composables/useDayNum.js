export const useDayNum = () => {
  const countDay = (startDate, endDate) => {
    if (!startDate || !endDate) return;
    const end = new Date(endDate);
    const start = new Date(startDate);
    return parseInt(Math.abs(end - start) / 1000 / 60 / 60 / 24);
  };

  return {
    countDay,
  };
};
