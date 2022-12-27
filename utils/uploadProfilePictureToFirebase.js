import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUserData } from "../features/user/userSlice";
import { storage } from "../pages/api/firebase";

const uploadProfilePic = async (file, uid) => {
  const storageRef = ref(storage, `profilePics/${uid}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {});
    }
  );
};

export default uploadProfilePic;
