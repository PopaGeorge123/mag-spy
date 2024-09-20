import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

import config from "@/config";
import SideBar from "@/components/own/dashboard/SideBar";
import UserNavbar from "@/components/UserNavbar";

export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return(
  <>
    <UserNavbar />
    <SideBar>
      {children}
    </SideBar>
  </>
  );
}
