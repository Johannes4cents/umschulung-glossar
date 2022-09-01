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
  };
}

export { makeTerm };
