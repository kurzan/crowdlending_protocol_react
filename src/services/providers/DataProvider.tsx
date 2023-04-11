import { addDoc, collection } from "@firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { register, db, login, logout, auth } from '../firebase'

interface IContext {
  user: User | null,
  isLoading: boolean,
  register: (email: string, password: string) => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  logout: (email: string, password: string) => Promise<void>,

}

export const DataContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingInitial, setIsLoadingInitial] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const registerHandler = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const { user } = await register(email, password)

      await addDoc(collection(db, 'users'), {
        _id: user.uid,
        displaName: 'No name'
      })
    } catch (error: any) {
      alert('Ошибка регистрации')
    } finally {
      setIsLoading(false)
    }
  }

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      await login(email, password);
    } catch (error: any) {
      alert('Ошибка входа')
    } finally {
      setIsLoading(false)
    }
  }

  const logoutHandler = async () => {
    setIsLoading(true)

    try {
      await logout();
    } catch (error: any) {
      alert('Ошибка при выходе')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(
    () => onAuthStateChanged(auth, user => {
      setUser(user || null);
      setIsLoadingInitial(false);
  }), [])

  const value = useMemo(() => ({
    user, isLoading, login: loginHandler, logout: logoutHandler, register: registerHandler
  }), [user, isLoading])

  return <DataContext.Provider value={value}>
    {!isLoadingInitial && children}
  </DataContext.Provider>

};