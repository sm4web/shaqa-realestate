import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getAdData(adID) {
  const advertisementDocRef = doc(db, "advertisements", adID);
  const dataSnapshot = await getDoc(advertisementDocRef);
  return dataSnapshot.data();
}

export default async function handler(req, res) {
  try {
    const data = await getAdData();
    res.status(200).send({ data, message: "Ad Fetched" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
