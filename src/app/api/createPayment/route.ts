import Stripe from "stripe";
import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/components/ProductDetails";
import { getCurrentUser } from "../../../../actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10'
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  return Math.floor(totalPrice);
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100; // stripe бере значення у центах

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'usd',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items
  };

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });

      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id }
      });

      if (!existing_order) {
        return NextResponse.json({ error: "Invalid Payment Intent" }, { status: 400 });
      }

      await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: { amount: total, products: items }
      });

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;

    const existingOrder = await prisma.order.findFirst({
      where: { paymentIntentId: paymentIntent.id }
    });

    if (!existingOrder) {
      await prisma.order.create({
        data: orderData
      });
    }

    return NextResponse.json({ paymentIntent });
  }
}
