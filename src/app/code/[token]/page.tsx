"use client";

import { user_store_login } from "@/api/sso";
import { Spinner } from "@nextui-org/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Token() {
  const param = useParams<{ token: string }>();
  const router = useRouter();

  useEffect(() => {
    if (param.token) {
      user_store_login(param.token).then((_) => {
        localStorage.setItem("access_token", param.token);
        // router.back();
        global && window.location.replace("/cart");
      });
    }
    return;
  }, [param, router]);

  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
