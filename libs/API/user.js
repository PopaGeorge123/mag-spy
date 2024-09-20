"use server";

import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import GetSesion from "@/libs/session";

export async function getCurrentUser() {

  try{
    await connectMongo();

    const session = await GetSesion();

    if (!session) {
      return {
        isSignedIn: false,
      }
    }

    const user = await User.findOne({ _id: session.user.id });

    return {
      isSignedIn: true,
      user: user.email,
      name: user.name,
      hasAccess: user.hasAccess,
    }
  } catch (e) {
    console.error(e);
    return{
      isSignedIn: false,
    }
  }
}
