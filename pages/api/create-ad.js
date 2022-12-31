import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { uuid } from "uuidv4";

const ADModel = {
  title: "",
  location: {
    lat: "",
    lng: "",
  },
  description: "",
  space: "",
  price: "",
  rooms: "",
};

export default async function handler(req, res) {
  const { uid, data } = req.body;
  const advertisementDocRef = doc(db, "advertisements", uuid());
  const dataToBeSent = { uid, ...data };
  try {
    const result = await setDoc(advertisementDocRef, dataToBeSent);

    res.status(201).send({ data: dataToBeSent, message: "Ad created" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
