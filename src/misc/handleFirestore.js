import {
  increment,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db, functions } from "../firebase/fireInit";
import { forArrayLength } from "./helperFuncs";

async function getInfoFromRawId(rawId, afterFunc) {
  var fireInfo = null;
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("rawId", "==", rawId));
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    fireInfo = doc.data();
  });

  if (afterFunc != null) afterFunc(fireInfo);
}

async function getSingleDocFromFirestore(collection, docId, thenFunc, payload) {
  let docRef = doc(db, collection, docId);
  const result = await getDoc(docRef);
  thenFunc(result.data(), payload);
}

async function getCollectionFromUserFirestore(
  uid,
  collectionName,
  afterfunc = null
) {
  const path = "users/" + uid + "/" + collectionName;
  const querySnapshot = await getDocs(collection(db, path));
  const list = [];
  querySnapshot.forEach((d) => {
    list.push(d.data());
  });
  if (afterfunc != null) {
    afterfunc(list);
  }
}

async function updateDocInFirestore(
  path,
  id,
  fieldName,
  value,
  thenFunc = null
) {
  const docRef = doc(db, path, id.toString());

  await updateDoc(docRef, { [fieldName]: value }).then((msg) => {
    if (thenFunc != null) {
      thenFunc(msg);
    }
  });
}

async function setDocInFirestore(path, id, data, thenFunc) {
  const docRef = doc(db, path, id);
  await setDoc(docRef, data).then((msg) => {
    if (thenFunc != null) thenFunc(msg);
  });
}

async function deleteDocInFirestore(path, id, thenFunc) {
  const docRef = doc(db, path, id);
  await deleteDoc(docRef).then((msg) => {
    if (thenFunc != null) thenFunc(msg);
  });
}

function getCollectionListener(colRef, onCollection) {
  const collectionRef = collection(db, colRef);
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    let items = [];
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });
    onCollection(items, unsubscribe);
  });
  return unsubscribe;
}

function getDocListener(col, id, onChange) {
  const docRef = doc(db, col, id);
  let unsubscribe = onSnapshot(docRef, (doc) => {
    onChange(doc.data());
  });

  return unsubscribe;
}

async function getGeneralList(name, onListRetrieved, adminLists = false) {
  const docRef = doc(db, "general", adminLists ? "adminLists" : "lists");
  await getDoc(docRef).then((snapshot) => {
    const list = snapshot.data()[name];
    onListRetrieved(list);
  });
}

async function addItemToGeneralList(list, item, adminLists = false) {
  const docRef = doc(db, "general", adminLists ? "adminLists" : "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list] ?? [];
    l.push(item);
    updateDoc(docRef, { [list]: l });
  });
}

async function deleteItemInGeneralList(
  list,
  identifier,
  identifierValue,
  toLowerCase = false,
  adminLists = false
) {
  const docRef = doc(db, "general", adminLists ? "adminLists" : "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == identifierValue.toLowerCase()
        )
      : l.find((i) => i[identifier] == identifierValue);
    const index = l.indexOf(foundItem);
    l.splice(index, 1);
    console.log("index - ", index, " splicedList - ", l);
    updateDoc(docRef, { [list]: l });
  });
}

function incrementField(path, docId, key, inc) {
  const docRef = doc(db, path, docId);
  updateDoc(docRef, { [key]: increment(inc) });
}

async function updateItemInGeneralList(
  list,
  item,
  identifier,
  toLowerCase = false,
  adminLists = false
) {
  const docRef = doc(db, "general", adminLists ? "adminLists" : "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list] ?? [];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == item[identifier].toLowerCase()
        )
      : l.find((i) => i[identifier] == item[identifier]);
    const index = l.indexOf(foundItem);
    if (foundItem) l[index] = item;
    else l.push(item);
    updateDoc(docRef, { [list]: l });
  });
}

async function updateTriggerWordInGeneralList(item) {
  const docRef = doc(db, "general", "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()["triggerWords"];
    const foundWord = l.find((w) => w.text.english == item.text.english);

    const index = l.indexOf(foundWord);
    l[index] = item;
    updateDoc(docRef, { triggerWords: l });
  });
}

async function addItemToUserList(uid, list, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    l.push(item);
    updateDoc(docRef, { [list]: l });
  });
}

async function addLootInFirestore(uid, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let lootObject = { ...snapshot.data()["loot"] };
    lootObject[item.type].push(item);
    updateDoc(docRef, { loot: lootObject });
  });
}

async function deleteItemInUserList(
  uid,
  list,
  identifier,
  identifierValue,
  toLowerCase = false
) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == identifierValue.toLowerCase()
        )
      : l.find((i) => i[identifier] == identifierValue);
    const index = l.indexOf(foundItem);
    l.splice(index, 1);
    updateDoc(docRef, { [list]: l });
  });
}

async function updateItemInUserList(
  uid,
  list,
  item,
  identifier,
  identifierValue,
  toLowerCase = false
) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list] ?? [];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == identifierValue.toLowerCase()
        )
      : l.find((i) => i[identifier] == identifierValue);
    const index = l.indexOf(foundItem) ?? 0;
    l[index] = item;
    updateDoc(docRef, { [list]: l });
  });
}

async function updateLootItemInUserList(uid, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let lootObj = snapshot.data().loot ?? {};

    let newList = [...lootObj[item.type]];
    let index = newList.map((i) => i.d).indexOf(item.id);
    newList[index] = item;

    lootObj[item.type] = newList;
    console.log("lootObj  - ", lootObj);
    updateDoc(docRef, { loot: lootObj });
  });
}

function uploadImageToStorage(path, image, thenFunc) {
  const imageStorageRef = ref(storage, path + "/" + image.name);
  uploadBytes(imageStorageRef, image).then((snapshot) => {
    if (thenFunc != null) thenFunc(snapshot.metadata.fullPath);
  });
}

async function addCustomItemToUserList(uid, item, collection) {
  const userDocRef = doc(db, "users/", uid);
  const userDoc = await getDoc(userDocRef);
  var newList = [];
  if (userDoc.data()[collection] != null) {
    newList = [...userDoc.data()[collection], item];
  } else {
    newList = [item];
  }
  updateDoc(userDocRef, { [collection]: newList });
}

function getSuggestedStrains(category) {
  switch (category) {
    case "general":
      break;
    case "personal":
      break;
    case "All time":
      break;
  }
}

async function getCustomUserList(uid, collection, onCollectionRetrieved) {
  console.log("getCustomUserList called");
  const userDocRef = doc(db, "users/", uid);
  await getDoc(userDocRef).then((doc) => {
    const list = doc.data()[collection];
    onCollectionRetrieved(list ?? []);
    return list ?? [];
  });
}

async function getUserLoot(uid, onListRetrieved) {
  const userDocRef = doc(db, "users/", uid);
  await getDoc(userDocRef).then((doc) => {
    const listObj = doc.data()["loot"];
    let list = (listObj["items"] ?? [])
      .concat(listObj["spells"] ?? [])
      .concat(listObj["buildings"] ?? [])
      .concat(listObj["events"] ?? [])
      .concat(listObj["creatures"] ?? []);
    onListRetrieved(list ?? []);
    return list ?? [];
  });
}

async function getBaseCollection(col, onRetrieved) {
  const colRef = collection(db, col);
  await getDocs(colRef).then((docs) => {
    const list = [];
    docs.forEach((doc) => {
      list.push(doc.data());
    });
    onRetrieved(list);
  });
}

function getCreateUserListener(col, identifier, operator, value, onRetrieved) {
  const collectionRef = collection(db, col);
  const q = query(collectionRef, where(identifier, operator, value));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    var info = null;
    snapshot.forEach((doc) => {
      info = doc.data();
    });
    onRetrieved(unsubscribe, info);
  });
}

function cloudFunc(name, data, onResult, onError) {
  const func = httpsCallable(functions, name);
  func(data)
    .then((result) => {
      onResult(result);
    })
    .catch((error) => {
      onError(error);
    });
}

async function queryCollection(col, property, operator, filter, onResult) {
  const q = query(collection(db, col), where(property, operator, filter));
  const docs = await getDocs(q);
  let foundDocs = [];
  docs.forEach((doc) => {
    foundDocs.push(doc.data());
  });
  onResult(foundDocs);
}

async function multiQueryCollection(col, queries, onResult) {
  let qList = [];
  forArrayLength(queries, (query) => {
    qList.push(where(query[0], query[1], query[2]));
  });
  const colRef = collection(db, col);
  let q = query(colRef, ...qList);
  const snapshot = await getDocs(q);
  let docs = [];
  snapshot.forEach((d) => {
    docs.push(d.data());
  });
  if (onResult) onResult(docs);
  return docs;
}

export {
  queryCollection,
  multiQueryCollection,
  cloudFunc,
  getCreateUserListener,
  getBaseCollection,
  updateLootItemInUserList,
  getUserLoot,
  addLootInFirestore,
  getCustomUserList,
  getSuggestedStrains,
  addCustomItemToUserList,
  updateItemInUserList,
  deleteItemInUserList,
  addItemToUserList,
  uploadImageToStorage,
  getInfoFromRawId,
  getSingleDocFromFirestore,
  updateDocInFirestore,
  getCollectionListener,
  setDocInFirestore,
  deleteDocInFirestore,
  getDocListener,
  addItemToGeneralList,
  updateItemInGeneralList,
  deleteItemInGeneralList,
  getGeneralList,
  getCollectionFromUserFirestore,
  incrementField,
  updateTriggerWordInGeneralList,
};
