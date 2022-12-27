import { doc } from "firebase/firestore";
import {  ref } from "firebase/storage";

import { db } from "./firebase";

export default function handler(req, res) {
  const { data, uid } = req.body;
  const userDoc = doc(db, "users", uid);

  updateDoc(userDoc, { ...data })
    .then((res) => {
      res.status(200).send({ message: "Data updated successfully!" });
    })
    .catch((err) => {
      res.status(400).send({ error: "Something went wrong!" });
    });
}
