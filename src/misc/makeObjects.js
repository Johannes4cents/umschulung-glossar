import { getRandomId } from "./helperFuncs";

function makeTerm(name, cats, author) {
  return {
    name: name ?? "",
    aliases: [],
    cats: cats ?? [],
    definition: "",
    images: [],
    linked: [],
    id: getRandomId(),
    author: author,
    editHistory: [],
  };
}

export { makeTerm };
