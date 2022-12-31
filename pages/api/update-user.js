import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

import { db, storage } from "./firebase";

export default function handler(req, res) {
  const { data, uid } = req.body;
  const userDoc = doc(db, "users", uid);

  updateDoc(userDoc, { ...data })
    .then(async () => {
      // getting this user photo URL.
      getDownloadURL(ref(storage, `profilePics/${uid}`))
        .then((url) => {
          // updating the photo_url field in database after getting it.
          updateDoc(userDoc, { ...data, profile_photo: url })
            .then(() => {
              res.status(200).send({ message: "Data updated successfully!" });
            })
            .catch((err) => {
              res.status(400).send({ error: err.message });
            });
        })
        .catch((err) => {
          res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
}
