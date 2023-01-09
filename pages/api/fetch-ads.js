import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function getAdsData(uid = false) {
  let data = [];
  const advertisementDocRef = collection(db, "advertisements");
  const q = query(advertisementDocRef, where("uid", "==", uid));

  const dataSnapshot = await getDocs(uid ? q : advertisementDocRef);
  dataSnapshot.forEach((doc) => {
    data = [...data, { ...doc.data(), id: doc.id }];
  });
  return data;
}

export default async function handler(req, res) {
  try {
    const data = await getAdsData();
    res.status(200).send({ data, message: "Ads Fetched" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
