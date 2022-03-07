import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "../components/Toast/Toast";
import { useSearch } from "./MeiliSearchContext";

const DEFAULT_USERS = [
  {
    name: "No User Selected",
    key: process.env.REACT_APP_MEILI_API_KEY,
  },
  {
    name: "John",
    key: process.env.REACT_APP_JOHN_KEY,
  },
  {
    name: "Zia",
    key: process.env.REACT_APP_ZIA_KEY,
  },
];

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [usersList, setUsersList] = useState([
    ...DEFAULT_USERS,
    ...JSON.parse(localStorage.getItem("users") || "[]"),
  ]);

  const { setApiKey, setSearchText } = useSearch();

  useEffect(() => {
    if (user) {
      setShowToast(true);
      setApiKey(user.key);
      setSearchText("");
    }

    // eslint-disable-next-line
  }, [user]);

  function addUser(data) {
    setUsersList([...usersList, data]);
    setUser(data);

    //saving in local storage fot future ref
    let list = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...list, data]));
  }

  return (
    <UserContext.Provider value={[user, setUser, usersList, addUser]}>
      {children}
      {showToast && user.name !== "No User Selected" && (
        <Toast user={user.name} handleClose={() => setShowToast(false)} />
      )}
    </UserContext.Provider>
  );
}
