export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getMembershipYear = () => {
  const date = new Date();
  return date.getMonth() <= 8 ? date.getFullYear() - 1 : date.getFullYear();
};
