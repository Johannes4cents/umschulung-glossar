import { getRandomId } from "./helperFuncs";

function makeTerm(name, cats) {
  return {
    name: name ?? "",
    cats: cats ?? [],
    definition: "",
    images: [],
    linked: [],
    id: getRandomId(),
  };
}

export { makeTerm };
