import { ReactNode, createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

enum SecureStoreKeyEnums {
  TOKEN = "TOKEN",
  USER_ID = "USER_ID",
  USER_NAME = "USER_NAME",
}

type AuthValueType = {
  isLoggedIn: boolean;
  setTokenLogin: (token: string) => Promise<void>;
  deleteTokenLogin: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthValueType>({
  isLoggedIn: false,
  setTokenLogin: async () => {},
  deleteTokenLogin: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    SecureStore.getItemAsync(SecureStoreKeyEnums.TOKEN)
      .then((token) => {
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err: unknown) => {
        console.log(err, "<<< error while get token ");
      });
  }, []);

  const setTokenLogin = async (token: string) => {
    try {
      await SecureStore.setItemAsync(SecureStoreKeyEnums.TOKEN, token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTokenLogin = async () => {
    try {
      await SecureStore.deleteItemAsync(SecureStoreKeyEnums.TOKEN);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setTokenLogin, deleteTokenLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
