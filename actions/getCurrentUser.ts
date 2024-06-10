import { getServerSession } from "next-auth";
import { authOptions } from "../libs/AuthOptions";
import prisma from "../libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    // console.log("Session:", session);
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    // console.log("Current user from DB:", currentUser);
    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      // createdAt: currentUser.createdAt.toISOString(),
      // updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toString() || null,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
