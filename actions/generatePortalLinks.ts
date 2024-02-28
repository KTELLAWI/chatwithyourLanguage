"use server";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { headers } from 'next/headers';
import { adminDb } from "@/firebase-admin";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:"2023-10-16"});

export async function generatePortalLink() {
    const session = await getServerSession(authOptions);
    const host = headers().get("host");

    if(!session?.user?.id) return console.error("No user ID FOUND");

    const {user:{id}} = session;
    const returnUrl = process.env.NODE_ENV==="development" 
    ? `http://localhost:3000/register`
    :`https://${host}/register`;

    const doc= await adminDb.collection("customers").doc(id).get();
    if(!doc) return console.error("no customer recored ");
   const stripeID = doc.data()!.stripId;

    const stripSession = await stripe.billingPortal.sessions.create({
        customer:stripeID,
        return_url:"http://localhost:3000/register",


    });

   redirect(stripSession.url); 
}