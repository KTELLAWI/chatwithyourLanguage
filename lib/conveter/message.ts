import { db } from "@/firebase";
import { LanguageSupportedMap, LanguagesSupported } from "@/store/store";
import { Subscription } from "@/type/subscriptions";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp, collection, doc, limit, orderBy, query, where } from "firebase/firestore";

export interface User {
    id: string,
    email: string,
    name: string,
    image: string,

}

export interface Message {
    id?: string,
    input?: string,
     timestamp?: Date | null,
    user: User,
    translated?: {
        [K in LanguagesSupported]?: string;
    }

}

export const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore: function (message: Message): DocumentData {
        return {
            // id: message.id,
            input: message.input,
            timestamp: message.timestamp,
            user: message.user,
        };
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Message {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            input: data.input,
            timestamp: data.timestamp|| null , // Convert Firestore Timestamp to JavaScript Date
            user: data.user,
            translated:data.translated,
        };
    },
};

export const messageRef = (chatId: string) => collection(db, "chats", chatId, "messages").withConverter(messageConverter);
export const limitedMessageRef = (chatId: string) => query(messageRef(chatId), limit(25)).withConverter(messageConverter);
export const sortedMessageRef = (chatId: string) => query(messageRef(chatId), orderBy("timestamp", "asc")).withConverter(messageConverter);
export const limitedStoredMessagesRef = (chatId: string) => query(messageRef(chatId), limit(1), orderBy("timestamp", "asc")).withConverter(messageConverter);

