import { useState, createContext } from 'react';

const UserContext = createContext();

const UserProvider = (props) => {
  const [state, setState] = useState({
    user: '',
  });
  const setUser = (newUser) => {
    setState((prev) => {
      return {
        ...prev,
        user: newUser,
      };
    });
  };

  return (
    <UserContext.Provider value={{ setUser, user: state.user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
