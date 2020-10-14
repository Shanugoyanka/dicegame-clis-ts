const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function diceRandomNumber() {
  return getRandomNumber(1, 6);
}
