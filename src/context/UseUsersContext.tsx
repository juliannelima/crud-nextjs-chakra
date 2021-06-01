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
  createdAt?: string;
}

interface UsersContextProps {
  users: IUser[];
  getUser: (id: string) => Promise<IUser>,
  createUser: (user: IUser) => Promise<void>,
  updateUser: (user: IUser) => Promise<void>,
  deleteUser: (id: string) => Promise<void>,
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
          createdAt: new Date()
        }
      })

      const newUser = response.data.user

      setUsers([...users, {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: new Date(newUser.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      }])
    }catch(error){
      console.log(error)
    }
  }

  async function updateUser(user: IUser) {
    try {
      const response = await api.put(`users/${user.id}`, {
        user: {
          ...user,
        }
      })

      const newUser = response.data.user


      setUsers(users.map(user => {
        if(user.id === newUser.id){
          return {
            ...user,
            name: newUser.name,
            email: newUser.email,
          }
        } else {
          return user
        }
      }))
    }catch(error){
      console.log(error)
    }
  }

  async function deleteUser(id: string) {
    try {
      await api.delete(`users/${id}`)

      setUsers(users.filter(user => user.id !== id))
    }catch(error){
      console.log(error)
    }
  }

  async function getUser(id: string) {
    try {
      const response = await api.get(`users/${id}`)

      return response.data.user;
    }catch(error){
      console.log(error)
    }
  }

  return (
    <UsersContext.Provider value={
      { users, getUser, createUser, updateUser, deleteUser }
    }>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext);

  return context;
}