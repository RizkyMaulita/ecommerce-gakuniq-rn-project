import { ReactNode, createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export enum SecureStoreKeyEnums {
  TOKEN = "TOKEN",
  USER_ID = "USER_ID",
  USER_NAME = "USER_NAME",
}

type UserLoginData = {
  token: string;
  userId: string;
  username: string;
};

type AuthValueType = {
  isLoggedIn: boolean;
  userData: UserLoginData;
  setUserLogin: (payload: UserLoginData) => Promise<void>;
  deleteUserLogin: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const initializeUserLoginData: UserLoginData = {
  token: "",
  userId: "",
  username: "",
};

export const AuthContext = createContext<AuthValueType>({
  isLoggedIn: false,
  userData: initializeUserLoginData,
  setUserLogin: async () => {},
  deleteUserLogin: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserLoginData>({
    ...initializeUserLoginData,
  });

  useEffect(() => {
    SecureStore.getItemAsync(SecureStoreKeyEnums.TOKEN)
      .then((token) => {
        setIsLoggedIn(token ? true : false);
        return getUserLogin();
      })
      .catch((err: unknown) => {
        console.log(err, "<<< error while get token ");
      });
  }, []);

  const setUserLogin = async ({ token, userId, username }: UserLoginData) => {
    try {
      await SecureStore.setItemAsync(SecureStoreKeyEnums.TOKEN, token);
      await SecureStore.setItemAsync(SecureStoreKeyEnums.USER_ID, userId);
      await SecureStore.setItemAsync(SecureStoreKeyEnums.USER_NAME, username);
      setUserData({ token, userId, username });
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserLogin = async () => {
    try {
      await SecureStore.deleteItemAsync(SecureStoreKeyEnums.TOKEN);
      await SecureStore.deleteItemAsync(SecureStoreKeyEnums.USER_ID);
      await SecureStore.deleteItemAsync(SecureStoreKeyEnums.USER_NAME);
      setUserData({ ...initializeUserLoginData });
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLogin = async () => {
    const token = await SecureStore.getItemAsync(SecureStoreKeyEnums.TOKEN);
    const userId = await SecureStore.getItemAsync(SecureStoreKeyEnums.USER_ID);
    const username = await SecureStore.getItemAsync(
      SecureStoreKeyEnums.USER_NAME
    );

    setUserData({
      token: token || "",
      userId: userId || "",
      username: username || "",
    });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setUserLogin, deleteUserLogin, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
