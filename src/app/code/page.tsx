"use client";

import { sso_api, user_store_login } from "@/api/sso";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Code() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  useEffect(() => {
    if (code) {
      user_store_login(code).then((res) => {
        setTimeout(() => {
          // toast.success("Login with store successfully");
          localStorage.setItem("access_token", code);
          router.push("/");
          window.location.replace("/");
        }, 500);
      });
    }
    return;
  }, [code, router]);

  return;
}
