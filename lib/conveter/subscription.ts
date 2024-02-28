import { db } from "@/firebase";
import { Subscription } from "@/type/subscriptions";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot,SnapshotOptions, collection } from "firebase/firestore";

const subcriptionConverter:FirestoreDataConverter<Subscription>={

 toFirestore:function (subscription:Subscription):DocumentData{
    return {
        ...subscription
    }

 },
 fromFirestore :function(snapshot:QueryDocumentSnapshot,options:SnapshotOptions) : Subscription {
    
    const data = snapshot.data(options);
    const sub: Subscription = {
        id: snapshot.id,
        metadata: data.metadata || {}, // Assuming metadata is present in data
        stripeLink: data.stripeLink || '', // Assuming stripeLink is present in data
        role: data.role || null, // Assuming role is present in data
        quantity: data.quantity || 0, // Assuming quantity is present in data
        items: data.items || [], // Assuming items is present in data
        product: data.product || null, // Assuming product is present in data
        price: data.price || null, // Assuming price is present in data
        prices: data.prices || [], // Assuming prices is present in data
        payment_method: data.payment_method || '', // Assuming payment_method is present in data
        latest_invoice: data.latest_invoice || '', // Assuming latest_invoice is present in data
        status: data.status || 'active', // Assuming status is present in data
        cancel_at_period_end: data.cancel_at_period_end || false, // Assuming cancel_at_period_end is present in data
        created: data.created || null, // Assuming created is present in data
        current_period_start: data.current_period_start || null, // Assuming current_period_start is present in data
        current_period_end: data.current_period_end || null, // Assuming current_period_end is present in data
        ended_at: data.ended_at || null, // Assuming ended_at is present in data
        cancel_at: data.cancel_at || null, // Assuming cancel_at is present in data
        canceled_at: data.canceled_at || null, // Assuming canceled_at is present in data
        trial_start: data.trial_start || null, // Assuming trial_start is present in data
        trial_end: data.trial_end || null // Assuming trial_end is present in data
    };

    return sub;
     
 },


}
export const subscriptionRef= (userId:string) => collection(db,"customers",userId,"subscriptions").withConverter(subcriptionConverter);