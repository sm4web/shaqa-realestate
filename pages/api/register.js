// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

export default function handler(req, res) {
  const { email, password, fullName } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user: { uid, accessToken, email } }) => {
      // creating user column in the database.
      setDoc(doc(db, "users", uid), {
        uid,
        displayName: fullName,
        email,
      })
        .then((result) => {
          res.status(201).send({
            user: { uid, displayName: fullName, email },
            token: accessToken,
          });
        })
        .catch((error) => {
          res.status(400).send({
            error: "Something went wrong while setting user's data!!",
          });
        });
    })
    .catch((error) => {
      res.status(400).send(error.code);
    });
}
