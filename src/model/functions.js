import { database } from "@/firebase";
import { ref, onValue, get, query, orderByChild, equalTo } from "firebase/database";

export function getActivosGarantias(SE, callback) {
    console.log("<·><><·> getActivosGarantias() <·><><·>");
    const globalConfRef = ref(database, `inventario/${SE}`); //SE -> "Central" ó "SE Ancud"
    
    onValue(globalConfRef, (snapshot) => {
        let list = [];
        let i = 0;    
        snapshot.forEach((childSnapshot) => {
            list.push({ key: childSnapshot.key, itemN: ++i, ...childSnapshot.val() });
        });
        callback(list);
    });
}

export function getSolicitudes(callback) {
    console.log("<·><><·> getSolicitudes() <·><><·>");
    const globalConfRef = ref(database, "solicitudes");
    const solicitudesQuery = query(globalConfRef, orderByChild("fecha"));
    
    onValue(solicitudesQuery, (snapshot) => {
        let list = [];
        snapshot.forEach((childSnapshot) => {
            list.push({ key: childSnapshot.key, ...childSnapshot.val() });
        });
        callback(list);
    });
}

export function getUserKeyAndType(useremail, callbackSuccess) {
    console.log("getUserKeyAndType");
    // Check in the new database structure first
    const dbRef2 = ref(database, "usuarios2/Misig");
    
    get(dbRef2).then((snapshot) => {
        let found = false;
        snapshot.forEach((childSnapshot) => {
            try {
                // Check if this is the user we're looking for
                if (childSnapshot.val().user === useremail) {
                    found = true;
                    callbackSuccess(childSnapshot.key, childSnapshot.val().type, childSnapshot.val());
                }
            } catch(e) {
                console.log("error en callbackSuccess %s", e);
            }
        });
        
        // If not found in the new structure, try the old one
        if (!found) {
            const dbRef = ref(database, "usuarios");
            const userQuery = query(dbRef, orderByChild("user"), equalTo(useremail));
            
            get(userQuery).then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    try {
                        callbackSuccess(childSnapshot.key, childSnapshot.val().type, childSnapshot.val());
                    } catch(e) {
                        console.log("error en callbackSuccess %s", e);
                    }
                });
            });
        }
    });
}
