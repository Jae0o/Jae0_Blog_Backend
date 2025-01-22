import { fireStore } from "@config";

import { GetOptions } from "./getOptions.type";

import { doc, getDoc } from "firebase/firestore";

const getOptions: GetOptions = async ({ type }) => {
  const queryRef = doc(fireStore, "options", type);

  const res = await getDoc(queryRef);

  if (res.exists()) {
    return res.data().list;
  }

  throw new Error(`get ${type} options failed`);
};

export default getOptions;
