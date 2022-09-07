import { forArrayLength, getRandomId } from "./helperFuncs";

function makeTerm(name, cats, author) {
  return {
    name: name ?? "",
    aliases: [],
    cats: cats ?? [],
    images: [],
    linked: [],
    id: getRandomId(),
    author: author,
    lastEditor: author,
    editHistory: [],
    rawContentState: null,
    content: null,
    questions: [],
    upvotes: [],
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

function makeAnswer(author, questionId) {
  return {
    author,
    questionId,
    answer: "",
    accepted: false,
    date: new Date().getTime(),
    id: getRandomId(),
  };
}

function makeLink(searchTerms, url, terms, cats) {
  return {
    searchTerms: searchTerms ?? [],
    url: url ?? "",
    terms: terms ?? [],
    cats: cats ?? [],
  };
}

export { makeTerm, makeQuestion, makeAnswer, makeLink };
