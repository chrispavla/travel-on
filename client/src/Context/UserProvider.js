import React, { useState, useEffect } from "react";

// create the context
const UserContext = React.createContext();

// create a provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  // the value prop of the provider will be our context data
  // this value will be available to child components of this provider
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
