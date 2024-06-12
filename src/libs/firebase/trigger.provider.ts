import { firestore } from 'firebase-admin';
import { autoIncrementTrigger } from '@src/libs/firebase/firestore.trigger';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import Firestore = firestore.Firestore;

export enum AutoIncrementEnum {
  index = 'document_increments',
}

export type TriggerAutoIncrementOptions = {
  targetCollection: string;
  fieldId: string;
};

export type TriggerProps = {
  func: (
    db: Firestore,
    snap: QueryDocumentSnapshot,
    options: TriggerAutoIncrementOptions,
  ) => Promise<void>;
  onDocument: string;
  options: TriggerAutoIncrementOptions;
  when: 'onCreate' | 'onUpdate' | 'onDelete';
};

export const triggers: TriggerProps[] = [
  {
    func: autoIncrementTrigger,
    onDocument: 'test/{docId}',
    when: 'onCreate',
    options: {
      targetCollection: 'productsIncrement',
      fieldId: 'increment_id',
    },
  },
];
