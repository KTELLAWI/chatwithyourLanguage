// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [GitHub],
// })
import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions} from "next-auth"
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { adminAuth, adminDb } from "./firebase-admin";
export const authOptions:NextAuthOptions ={
 
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      })
    ],
    session:{
        strategy:"jwt",
    },
    callbacks:{
        jwt:async ({token,user}) => {
           if(user){
            token.sub= user.id;
           }

           return token;
        },
        session:async ({session,token}) => {
            if(session?.user){
                if(token.sub){
                    session.user.id=token.sub;
                    const firebasetoken =  await adminAuth.createCustomToken(token.sub);
                    session.firebaseToken= firebasetoken;

                }
               
            }

           
            
            return session;
        }

    },
    adapter:FirestoreAdapter(adminDb),

} satisfies NextAuthOptions;



