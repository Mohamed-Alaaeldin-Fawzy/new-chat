export const generateRandomNumber = (digits: number): string => {
  if (digits < 1) {
    throw new Error("Number of digits must be greater than 0");
  }
  const random = Math.floor(Math.random() * Math.pow(10, digits));
  if (random < Math.pow(10, digits - 1)) {
    return generateRandomNumber(digits);
  }
  return random.toString();
};
