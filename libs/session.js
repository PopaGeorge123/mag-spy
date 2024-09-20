import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

export default async function GetSesion() {
    const session = await getServerSession(authOptions);
    return session;
}