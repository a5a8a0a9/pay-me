import { Balance } from './balance.model';
import { Expense } from './expense.model';
import { User } from './user.model';

/**
 * 帳單
 */
export interface Bill {
	id: string;
	name: string;
	memo: string;
	createdAt: string;
	updatedAt: string | null;
}

export interface BillDetail extends Bill {
	userList: User[];
	expenseList: Expense[];
	balanceList: Balance[];
}
