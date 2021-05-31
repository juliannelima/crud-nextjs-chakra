import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { api } from "../services/api";

import { getUsers } from "../services/hooks/useUsers";

interface IUser {
  id?: string
  name: string;
  email: string;
  createdAt?: Date;
}

interface UsersContextProps {
  users: IUser[];
  createUser: (user: IUser) => Promise<void>,
}

interface UsersProviderProps {
  children: ReactNode;
}

const UsersContext = createContext<UsersContextProps>({} as UsersContextProps);

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getUsers(1).then(response => setUsers(response.users))
  } , [])

  async function createUser(user: IUser) {
    try {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        }
      })

      setUsers([...users, response.data.user ])
    }catch(err){
      console.log(err)
    }
  }

  return (
    <UsersContext.Provider value={{ users, createUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext);

  return context;
}