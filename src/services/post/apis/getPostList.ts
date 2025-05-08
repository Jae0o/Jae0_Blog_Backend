import { fireStore } from "@config";

import { Post } from "@interfaces";

import { collection, getDocs, query, where } from "firebase/firestore";

const getPostList = async ({ category }: { category: string }) => {
  const queryRef = query(
    collection(fireStore, "posts"),
    where("category", "==", category),
  );

  const res = await getDocs(queryRef);

  const result: Post[] = [];

  res.forEach(doc => {
    if (!doc.exists()) {
      return;
    }

    result.push(doc.data() as Post);
  });

  return result;
};

export default getPostList;
