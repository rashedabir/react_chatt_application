import React from "react";

import firebase from "firebase/app";

import { auth } from "../firebase";

function Login() {
  return (
    <div className="container">
      <div className="card my-5 mx-auto login p-2 rounded">
        <h2 className="text-center py-5">Welcome!</h2>
        <button
          className="btn g_button text-white w-50 mb-4 mx-auto p-3"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <i className="fab fa-google fs-5"></i> Login With Google
        </button>
        <button
          className="btn f_button text-white w-50 mb-4 mx-auto p-3"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <i className="fab fa-facebook-f fs-5"></i> Login With Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
