import firebaseApp from "../firebase";

import { getFirestore } from "firebase/firestore";

export const fireStore = getFirestore(firebaseApp);
