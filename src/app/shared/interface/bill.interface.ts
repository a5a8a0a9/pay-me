import { Payment } from '.';

export interface Bill {
	id: string;
	name: string;
	memo: string;
	paymentList: Array<Payment>;
}
