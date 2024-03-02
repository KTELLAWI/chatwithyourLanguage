import { db } from "@/firebase";
import { LanguageSupportedMap, LanguagesSupported } from "@/store/store";
import { Subscription } from "@/type/subscriptions";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection, doc, limit, orderBy, query, where } from "firebase/firestore";

export interface User {
    id: string,
    email: string,
    name: string,
    image: string,

}

export interface Message {
    id?: string,
    input?: string,
    timestamp: Date
    user: User,
    translated?: {
        [K in LanguagesSupported]?: string;
    }

}

export const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore: function (message: Message): DocumentData {
        return {
            id: message.id,
            input: message.input,
            timestamp: message.timestamp,
            user: message.user,
        };
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Message {
        const data = snapshot.data(options);
        return {
            id: data.id,
            input: data.input,
            timestamp: data.timestamp.toDate(), // Convert Firestore Timestamp to JavaScript Date
            user: data.user,
        };
    },
};

export const messageRef = (chatId: string) => collection(db, "chats", chatId, "messages").withConverter(messageConverter);
export const limitedMessageRef = (chatId: string) => query(messageRef(chatId), limit(25));
export const sortedMessageRef = (chatId: string) => query(messageRef(chatId), orderBy("timestamp", "asc"));
export const limitedStoredMessagesRef = (chatId: string) => query(messageRef(chatId), limit(1), orderBy("timestamp", "asc"));

