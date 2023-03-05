export const formatDate = (dateObject: Date) => {
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const paddedSeconds = seconds.toString().padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};
