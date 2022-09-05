import { getRandomId } from "./helperFuncs";

var currentId = 0;
const imgStem = (name) => {
  return `/images/icons/icon_${name}.png`;
};
const cat = (name, imgUrl, id) => {
  currentId++;
  return { name, imgUrl, id: currentId };
};

const catList = [
  cat("coding", imgStem("coding")),
  cat("kaufmännisch", imgStem("kaufmann")),
  cat("C#", imgStem("csharp")),
  cat("other", imgStem("answerquestions")),
];

export { catList };
