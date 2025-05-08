import { fireStore } from "@config";

import { Post } from "@interfaces";

import { doc, getDoc } from "firebase/firestore";

const getPost = async ({ postId }: { postId: string }) => {
  const queryRef = doc(fireStore, "posts", postId);
  const res = await getDoc(queryRef);

  if (!res.exists()) {
    throw new Error("get post Error");
  }

  return res.data() as Post;
};

export default getPost;
