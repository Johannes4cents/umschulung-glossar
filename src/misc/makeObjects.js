import { getRandomId } from "./helperFuncs";

function makeTerm(name, cats, author) {
  return {
    name: name ?? "",
    aliases: [],
    cats: cats ?? [],
    images: [],
    linked: [],
    id: getRandomId(),
    author: author,
    editHistory: [],
    rawContentState: null,
    content: null,
    questions: [],
  };
}

function makeQuestion(author) {
  return {
    author,
    title: "",
    question: "",
    answered: false,
    date: new Date().getTime(),
    id: getRandomId(),
    answers: [],
  };
}

function makeAnswer(author, questionId, answer) {
  return {
    author,
    questionId,
    answer,
    accepted: false,
    date: new Date().getTime(),
    id: getRandomId(),
  };
}

export { makeTerm, makeQuestion, makeAnswer };
