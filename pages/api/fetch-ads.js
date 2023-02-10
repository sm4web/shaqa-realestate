import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function getAdsData(
  uid = false,
  term,
  priceRange,
  apartmentType,
  roomsCount
) {
  let data = [];

  const advertisementsDocRef = collection(db, "advertisements"); // get the reference of the advertisements document in firestore



  const userAdvertisementsQuery = query(
    advertisementsDocRef,
    where("uid", "==", uid)
  ); // specific user advertisements when UID is provided

  const dataSnapshot = await getDocs(
    uid ? userAdvertisementsQuery : advertisementsDocRef
  );

  
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
