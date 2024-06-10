import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import prisma from "../../../../libs/prismadb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: ReadableStream) {
  const reader = readable.getReader();
  const chunks = [];
  let done, value;
  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      chunks.push(value);
    }
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const buf = await buffer(req.body as any);
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    console.error(`⚠️  Webhook signature verification failed. No stripe-signature header value was provided.`);
    return NextResponse.json({ error: 'No stripe-signature header value was provided.' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  // Обробка події webhook
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await prisma.order.update({
        where: { paymentIntentId: paymentIntent.id },
        data: { status: 'complete' }
      });
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
