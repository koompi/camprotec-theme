// "use client";

// import { UserType } from "@/types/user";
// import { createContext, useContext, JSX, FC, useState, useEffect } from "react";

// import { getMe } from "@/api/me";
// import { ContextAuth } from "@/types/global";

// // import { ContextAuth } from "~/types/global";
// // import { UserType } from "~/types/user";

// interface contextProps {
//   children: JSX.Element;
// }

// // const AuthContext = useContext<{
// //   user: () => UserType | null;
// //   getUser: () => void;
// //   loading: () => void;
// //   login: (model: string | null) => void;
// // }>();

// export const AuthContext = createContext({});

// const AuthProvider: FC<contextProps> = (props) => {
//   const [modalId, setModelId] = useState<string | null>(null);
//   const [user, setUser] = useState<UserType | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const getUser = () => {
//     getMe()
//       .then(({ status, data }) => {
//         if (status === 200) {
//           setUser(data.data.user);
//           return;
//         }
//         setUser(null);
//       })
//       .catch((e) => {
//         setUser(null);
//         setLoading(false);
//         return;
//       });
//   };

//   useEffect(() => {
//     setLoading(true);
//     getMe()
//       .then(({ status, data }) => {
//         if (status === 200) {
//           setUser(data.data.user);
//         }
//       })
//       .catch((e) => {
//         setUser(null);
//         setLoading(false);
//         return;
//       });
//     setTimeout(() => {
//       setLoading(false);
//     }, 500);
//   }, []);

//   const context = {
//     user,
//     getUser,
//     loading: () => loading,
//     login: (model: string | null) => login(model),
//   };

//   // this use for popup login when click on button login at top bar
//   const login = (model: string | null) => {
//     setModelId(() => model);
//   };

//   return (
//     <AuthContext.Provider value={context}>
//       <div className="relative">{props.children}</div>
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// export function useAuth() {
//   return useContext(AuthContext) as ContextAuth;
// }

"use client";

import { createContext, useContext, JSX, FC, useState, useEffect } from "react";
import axios from "axios";
// import toast, { Toaster } from "sonner";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { sso_api, user_store_login } from "@/api/sso";
import { UserType } from "@/types/user";
import { ContextAuth } from "@/types/global";

export const AuthContext = createContext({});

interface Props {
  children: JSX.Element;
}

const getUser = async () => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND}/api/me`, {
      headers: {
        Authorization: `Bearer ${
          typeof window !== "undefined" && localStorage.getItem("access_token")
        }`,
      },
    })
    .then(({ status, data }) => {
      if (status === 200) {
        const user = data.data.user;
        return {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        };
      }
      return;
    })
    .catch((e) => {
      if (e.code === "ERR_NETWORK") {
        return 401;
      }
      return null;
    });
};

export const AppProvider: FC<Props> = (props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const user = async () => {
      const data = (await getUser()) as UserType;
      if ((data as unknown as number) == 401) {
        return setLoading(true);
      }
      setUser(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      return;
    };
    user();
    return;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {/* <Toaster position="top-right" closeButton /> */}
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as ContextAuth;
