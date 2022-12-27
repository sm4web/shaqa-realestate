// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function handler(req, res) {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then(
      ({
        user: { uid, accessToken, displayName, phoneNumber, photoURL, email },
      }) => {
        // send results to the client
        res.status(200).send({
          user: {
            uid,
            phoneNumber,
            displayName,
            photoURL,
            email,
          },
          token: accessToken,
        });
      }
    )
    .catch((error) => {
      res.status(404).send({ error: "User not Found!!" });
    });
}
