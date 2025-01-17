import { fireStore } from "@config";

import { Post } from "@interfaces";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

const getAllPosts = async ({ cursor }: { cursor?: string }) => {
  let queryRef;

  if (cursor) {
    queryRef = query(
      collection(fireStore, "posts"),
      orderBy("createAt", "desc"),
      startAfter(cursor),
      limit(4),
    );
  } else {
    queryRef = query(
      collection(fireStore, "posts"),
      orderBy("createAt", "desc"),
      limit(4),
    );
  }

  const res = await getDocs(queryRef).catch(() => {
    throw Error("Failed to fetch posts list all");
  });

  const result: Post[] = [];

  res.forEach(doc => {
    if (doc.exists()) {
      result.push(doc.data() as Post);
    }
  });

  return result;
};

const PostService = {
  getAllPosts,
};

export default PostService;
