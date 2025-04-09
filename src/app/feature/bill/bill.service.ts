import { Injectable } from '@angular/core';
import { Balance, Expense, ExpenseUserAmount } from '@shared/model';

@Injectable({
	providedIn: 'root',
})
export class BillService {
	constructor() {}

	/**
	 * 計算每個參與者應該支付的金額
	 * @param expenseList 花費列表
	 * @returns 最少交易次數的付款清單
	 */
	getBalanceList(expenseList: Expense[]): Balance[] {
		const balanceMap: { [userId: string]: number } = {};

		// 計算每個人的淨餘額
		expenseList.forEach(expense => {
			expense.payerList.forEach(payer => {
				balanceMap[payer.userId] = (balanceMap[payer.userId] || 0) + Math.round(payer.amount);
			});
			expense.splitterList.forEach(splitter => {
				balanceMap[splitter.userId] =
					(balanceMap[splitter.userId] || 0) - Math.round(splitter.amount);
			});
		});

		// 將淨餘額分為正數和負數
		const creditors: ExpenseUserAmount[] = [];
		const debtors: ExpenseUserAmount[] = [];
		for (const [userId, amount] of Object.entries(balanceMap)) {
			if (amount > 0) {
				creditors.push({ userId, amount: Math.round(amount) });
			} else if (amount < 0) {
				debtors.push({ userId, amount: Math.round(-amount) });
			}
		}

		// 計算最少交易次數
		const transactions: Balance[] = [];
		let creditorIndex = 0;
		let debtorIndex = 0;

		while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
			const creditor = creditors[creditorIndex];
			const debtor = debtors[debtorIndex];
			const amount = Math.min(creditor.amount, debtor.amount);

			transactions.push({
				fromUserId: debtor.userId,
				toUserId: creditor.userId,
				amount: Math.round(amount),
			});

			creditor.amount -= amount;
			debtor.amount -= amount;

			if (creditor.amount === 0) creditorIndex++;
			if (debtor.amount === 0) debtorIndex++;
		}

		return transactions;
	}
}
