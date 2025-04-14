import firebase from "firebase/compat/app";

class BaseRepository {

    /**
     * Base Repository.
     * @param {object} app 
     * @param {firebase.app.App} app.app
     * @param {firebase.auth.Auth} app.auth  
     * @param {firebase.firestore.Firestore} app.firestore
     * @param {string} collectionPath Firestore collection path 
     * @example const collectionPath = users/:id/messages
     */
    constructor(app, collectionPath) {
        this.collectionRef = app.firestore.collection(collectionPath);
    }

    /**
     * Save a new document to this collection with the specified data, assigning it a document ID automatically.
     * @param {object} documentData An Object containing the data for the new document.
     * 
     * See {@link firebase.firestore.CollectionReference.add}.
     * 
     * @returns A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend.
     */
    save(documentData) {
        return this.collectionRef.add(documentData);
    }

    /**
     * Updates the document within the collection at the specified path. 
     * If the document does not yet exist, it will be created.
     * @param {string} documentPath A slash-separated path to a document. e.g. /users/:id
     * @param {object} updateData A map of the fields and values for the document.
     * @param {object} options An object to configure the set behavior.
     * @param {boolean} options.merge (Optional) If true, the provided data will be merged into any existing document. 
     * @description The default `merge` option is `false`.
     * 
     * See {@link firebase.firestore.DocumentReference.set}.
     * 
     * @return A Promise resolved once the data has been successfully written to the backend.
     */
    update(documentPath, updateData, { merge = false }) {
        return this.collectionRef.doc(documentPath)
            .set(updateData, { merge: merge });
    }

    /**
     * Get a `DocumentReference` for the document within the collection at the specified path.
     * @param {string} documentPath A slash-separated path to a document. e.g. /users/:id
     * 
     * See {@link firebase.firestore.CollectionReference.doc}.
     * 
     * @return The `DocumentReference` instance.
     */
    get(documentPath) {
        return this.collectionRef.doc(documentPath);
    }

    /**
     * Creates and returns a new Query.
     * @param {number} limit The maximum number of the number of documents returned.
     * @param {string} [sort="asc"] The sort direction. Accepts 'asc' or 'desc'.
     * 
     * See {@link firebase.firestore.CollectionReference.orderBy}.
     * 
     * See {@link firebase.firestore.CollectionReference.limitToLast}.
     * 
     * @return The created Query.
     */
    getAll(limit = null, sort = 'asc') {
        if (limit) {
            return this.collectionRef.orderBy('createdAt', sort)
                .limitToLast(limit);
        } else {
            return this.collectionRef.orderBy('createdAt', sort);
        }
    }

    /**
     * Gets documents with a range.
     * Creates and returns a new Query.
     * @param {*} startAfter The start after document.
     * @param {number} limit The maximum number of the number of documents returned.
     * @param {string} [sort="asc"] The sort direction. Accepts 'asc' or 'desc'.
     * 
     * See {@link firebase.firestore.CollectionReference.orderBy}.
     * 
     * See {@link firebase.firestore.CollectionReference.startAfter}.
     * 
     * See {@link firebase.firestore.CollectionReference.limit}.
     * 
     * @return The created Query.
     */
    getAllWithinRange(startAfter, limit, sort = 'asc') {
        const query = this.collectionRef.orderBy('createdAt', sort)
            .startAfter(startAfter)
            .limit(limit);
        return query;
    }
}

export default BaseRepository;