export const calculateRemaining = (eventTimestamp: number) => {
  // Get the current epoch timestamp
  const currentTimestamp = Date.now() / 1000; // Convert milliseconds to seconds

  // Calculate the time remaining in seconds
  const timeRemaining = eventTimestamp - currentTimestamp;

  // Convert time remaining into hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  // Display the time remaining
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
