import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const dataSnapshot = await getDoc(userDocRef);
  return dataSnapshot.data();
}

export default async function handler(req, res) {
  try {
    const data = await getUserData();
    res.status(200).send({ data, message: "User Fetched" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
