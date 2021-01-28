// Written by NSS to assist in having real Authentication & Authorization
import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext();

export function UserProvider(props) {
  const apiUrl = "/api/user";

  const currentUser = localStorage.getItem("currentUser");
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUser(signInResponse.user.uid))
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);
        setIsLoggedIn(true);
        return user;
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const register = (user, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, password)
      .then((createResponse) =>
        saveUser({ ...user, firebaseUserId: createResponse.user.uid })
      )
      .then((savedUser) => {
        localStorage.setItem("user", JSON.stringify(savedUser));
        localStorage.setItem("userId", user.id);
        setIsLoggedIn(true);
        return savedUser;
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUser = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      }).then((resp) => resp.json())
    );
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        getToken,
        getCurrentUser,
      }}
    >
      {isFirebaseReady ? (
        props.children
      ) : (
        <div>LOADING - CHANGE ME LATER</div>
      )}
    </UserContext.Provider>
  );
}