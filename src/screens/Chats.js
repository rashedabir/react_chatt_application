import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Chats() {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await auth.signOut();
    history.push("/");
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }

      // Get-or-Create should be in a Firebase Function
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": "3532b2b4-edd0-4bf0-acc3-6f5b371877a6",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": "89ab5a70-57b2-4101-a2ec-681ba7326c09",
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("e", e.response));
          });
        });
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  }, [user, history]);

  if (!user || loading) return <div />;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between mx-3 align-items-center">
        <div className="fs-2 text-white">Kotha Hoby</div>
        <div onClick={handleLogout} className="btn btn-danger my-3">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 76px)"
        projectID="3532b2b4-edd0-4bf0-acc3-6f5b371877a6"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}

export default Chats;
