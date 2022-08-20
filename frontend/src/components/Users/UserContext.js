import { createContext, useState, useContext } from 'react';

const UserContext = createContext();
export const UserSetContext = createContext();

export function UserProvider({ children }) {
  const userLocalStore = JSON.parse(localStorage.getItem('userInfo'));
  const userInitialValue =
    userLocalStore?._id && userLocalStore?.token ? userLocalStore : null;
  const [user, setUser] = useState(userInitialValue);

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  if (!setUser) {
    throw new Error('The UserProvider is missing!');
  }

  return [user, setUser];
}

export default UserContext;
