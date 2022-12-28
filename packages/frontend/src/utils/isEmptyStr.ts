export const isEmptyStr = (value: string): boolean => {
  if (value.trim()) return false;
  return true;
};
