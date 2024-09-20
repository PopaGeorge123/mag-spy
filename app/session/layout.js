import UserNavbar from "@/components/UserNavbar";
import { Suspense } from "react";

export default function layout({ children }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserNavbar />
        {children}
      </Suspense>
    </div>
  )
}
