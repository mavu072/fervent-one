const BATCH_SIZE = 10;

/**
 * Deletes a Firestore collection by retrieving all documents in the collection or subcollection,
 * and deletes them in batches.
 * 
 * @param {firebase.firestore.Firestore} db 
 * @param {string} collectionPath 
 * @param {number} batchSize 
 * @returns Promise
 */
async function deleteCollection(db, collectionPath, batchSize = BATCH_SIZE) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

/**
 * Recursively deletes all documents in a query batch.
 * 
 * @param {firebase.firestore.Firestore} db 
 * @param {firebase.firestore.Query} query 
 * @param {Function} resolve 
 * @returns Promise
 */
async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid exploding the stack.
    nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

/**
 * Schedules a callback to be invoked in the next iteration of the event loop, 
 * before I/O events (but after the current operation completes).
 * 
 * This mirrors how `process.nextTick()` delays execution to the microtask queue.
 * 
 * @param {Function} callback 
 */
function nextTick(callback) {
    Promise.resolve().then(callback);
}

export { BATCH_SIZE, deleteCollection }