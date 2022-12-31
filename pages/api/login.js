// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const getUserData = async (docRef) => {
  const docSnap = await getDoc(docRef);

  if (docSnap) {
    console.log("Document data:", docSnap.data());
    return Promise.resolve(docSnap.data());
  } else {
    console.log("No such document!");
    return Promise.reject(null);
  }
};

export default function handler(req, res) {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user: { uid, accessToken } }) => {
      const userDoc = doc(db, "users", uid);
      getUserData(userDoc)
        .then((userData) => {
          res.status(200).send({
            user: {
              ...userData,
            },
            token: accessToken,
          });
        })
        .catch((error) => {
          res
            .status(400)
            .send({ error: "User has no data in our databases..." });
        });
    })
    .catch((error) => {
      res.status(404).send({ error: "User not Found!!" });
    });
}
