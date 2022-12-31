import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function handler(req, res) {
  const { uid } = req.body;
  const userDoc = doc(db, "users", uid);

  getDoc(userDoc).then((userSnap) => {
    if (userSnap.exists()) {
      res.status(200).send({ data: userSnap.data });
      console.log("Document data:", userSnap.data());
    } else {
      // doc.data() will be undefined in this case
      res.status(400).send({ message: "No such document!" });
      console.log("No such document!");
    }
  });
}
