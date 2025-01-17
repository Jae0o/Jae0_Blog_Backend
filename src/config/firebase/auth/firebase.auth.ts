import firebaseApp from "../firebase";

import { getAuth } from "firebase/auth";

export const fireAuth = getAuth(firebaseApp);
