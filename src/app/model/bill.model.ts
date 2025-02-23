import { Timestamp } from '@angular/fire/firestore';

export type BillEdit = {
	title: string;
	participants: string[];
	createdAt: Timestamp;
	ownerId: string;
};
