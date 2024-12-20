export const useFormatNumber = () => {
  /**
   * 格式化數字，加入千分符號
   * 無法格式化時，以原字串回傳
   */
  const formatNumber = (value: number | string) => {
    const numberValue = parseInt(value as string);
    if (isNaN(numberValue)) return value;
    return numberValue.toLocaleString();
  };

  return {
    formatNumber,
  };
};
