import { db } from "@/firebase";
import { Subscription } from "@/type/subscriptions";
import { User } from "next-auth";
import { DocumentData, collectionGroup, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection, doc, query, where } from "firebase/firestore";





const userConverter: FirestoreDataConverter<User> = {

    toFirestore: function (user: User): DocumentData {
        return {

            email: user.email,
            name: user.name,
            image: user.image,

        }
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {

        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            email: data.email,
            name: data.name,
            image: data.image,
        }

        //  return sub;

    },


}
export const getUserByEmailRef = (email: string) => query(collection(db, "users"), where("email", "==", email)).withConverter(userConverter);

// export const chatMemberRef = (chatId: string) => collection(db, "chats", chatId, "members").withConverter(chatMemberConverter);
// export const chatMemberAdminRef = (chatId: string) => query(collection(db, "chats", chatId, "members"), where("isAdmin", "==", true)).withConverter(chatMemberConverter);
// export const chatMembersCollectionGroupRef = (userId: string) => query(collectionGroup(db, "members"), where("userId", "==", userId),).withConverter(chatMemberConverter);