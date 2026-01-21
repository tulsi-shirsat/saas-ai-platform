import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const { userId } = auth();
  console.log("User ID:", userId);

  if (!userId) {
    return false;
  }

  console.log("Checking if prismadb.userSubscription exists:", prismadb.userSubscription);
  if (!prismadb.userSubscription) {
    throw new Error("prismadb.userSubscription is undefined. Check Prisma setup.");
  }

  try {
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
      select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
      },
    });

    console.log("User Subscription:", userSubscription);

    if (!userSubscription) {
      return false;
    }

    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

    return !!isValid;
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    return false;
  }
};