import db from '../config/firebaseInit';

const database: firebase.firestore.CollectionReference = db.collection('coupons');

export default class Databse {
    static setData = (docName: string, data: object) => {
        database.doc(docName).set(data);
    }

    static isExist(docName: string): object {
        let document = database.doc(docName).get()
            .then(doc => {
                if (!doc.exists) {
                    return null;
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        return document;
    }
}



