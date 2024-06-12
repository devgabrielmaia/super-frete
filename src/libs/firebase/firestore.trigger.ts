import { firestore } from 'firebase-admin';
import {
  AutoIncrementEnum,
  TriggerAutoIncrementOptions,
} from '@src/libs/firebase/trigger.provider';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import Firestore = firestore.Firestore;

export async function autoIncrementTrigger(
  db: Firestore,
  snap: QueryDocumentSnapshot,
  options: TriggerAutoIncrementOptions,
) {
  const counterRef = db
    .collection(AutoIncrementEnum.index)
    .doc(options.targetCollection);
  await db.runTransaction(async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    if (!counterDoc.exists) {
      throw new Error('Counter document does not exist!');
    }
    const currentCount = counterDoc.data()?.current || 0;
    const newCount = currentCount + 1;
    transaction.update(counterRef, { current: newCount });
    const userRef = snap.ref;
    transaction.update(userRef, { [options.fieldId]: newCount });
  });
}
