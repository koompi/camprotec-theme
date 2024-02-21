"use client";

import { UserType } from "@/types/user";
import { createContext, useContext, JSX, FC, useState, useEffect } from "react";

import { getMe } from "@/api/me";
import { ContextAuth } from "@/types/global";

// import { ContextAuth } from "~/types/global";
// import { UserType } from "~/types/user";

interface contextProps {
  children: JSX.Element;
}

// const AuthContext = useContext<{
//   user: () => UserType | null;
//   getUser: () => void;
//   loading: () => void;
//   login: (model: string | null) => void;
// }>();

export const AuthContext = createContext({});

const AuthProvider: FC<contextProps> = (props) => {
  const [modalId, setModelId] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = () => {
    getMe()
      .then(({ status, data }) => {
        if (status === 200) {
          setUser(data.data.user);
          return;
        }
        setUser(null);
      })
      .catch((e) => {
        setUser(null);
        setLoading(false);
        return;
      });
  };

  useEffect(() => {
    setLoading(true);
    getMe()
      .then(({ status, data }) => {
        if (status === 200) {
          setUser(data.data.user);
        }
      })
      .catch((e) => {
        setUser(null);
        setLoading(false);
        return;
      });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const context = {
    user,
    getUser,
    loading: () => loading,
    login: (model: string | null) => login(model),
  };

  // this use for popup login when click on button login at top bar
  const login = (model: string | null) => {
    setModelId(() => model);
  };

  return (
    <AuthContext.Provider value={context}>
      <div className="relative">{props.children}</div>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext) as ContextAuth;
}
