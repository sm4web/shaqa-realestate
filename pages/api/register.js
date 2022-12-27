// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "./firebase";

export default function handler(req, res) {
  const { email, password, fullName } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user: { uid, accessToken, phoneNumber, photoURL, email } }) => {
      // creating user column in the database.
      setDoc(doc(db, "users", uid), {
        uid,
        displayName: fullName,
        email,
      })
        .then((result) => {
          // send results to the client after setting user column.
          res.status(201).send({
            user: {
              uid,
              phoneNumber,
              displayName: fullName,
              photoURL,
              email,
            },
            token: accessToken,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      res
        .status(400)
        .send({ error: "Something went wrong while creating user!!" });
    });
}
