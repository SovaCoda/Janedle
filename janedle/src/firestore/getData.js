import firebase_app from "../firebase/config";
import { getFirestore, doc, getDoc, collection, query} from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getDataByUuid(collection, id) {
    let result = null;
    let error = null;

    try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            result = docSnap.data();
        } else {
            error = "No such document!";
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getAllData(colllection) {
    let result = null;
    let error = null;

    try {
        const q = query(collection(db, colllection));
        const querySnapshot = await getDocs(q);
        result = querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
        error = e;
    }

    return { result, error };
}