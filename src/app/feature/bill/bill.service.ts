import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class BillService {
	constructor() {}

	/**
	 * 計算每個參與者應該支付的金額
	 * @param bill 帳單
	 * @param expenses 花費清單
	 * @returns 最少交易次數的付款清單
	 */
	// getSettlements(bill: BillDetail | null, expenses: Expense[]): Settlement[] {
	// 	if (!bill) {
	// 		return [];
	// 	}

	// 	const balances: { [participant: string]: number } = {};

	// 	// 初始化每個參與者的餘額
	// 	bill.userList.forEach(user => {
	// 		balances[user.id] = 0;
	// 	});

	// 	// 計算每個參與者的餘額
	// 	expenses.forEach(expense => {
	// 		const share = expense.amount / expense.participants.length;

	// 		// 付款人增加餘額
	// 		balances[expense.payer] += expense.amount;

	// 		// 每個參與者減少餘額
	// 		expense.participants.forEach(participant => {
	// 			balances[participant] -= share;
	// 		});
	// 	});

	// 	// 將餘額分為正數（應收款）和負數（應付款）
	// 	const creditors: { participant: string; amount: number }[] = [];
	// 	const debtors: { participant: string; amount: number }[] = [];

	// 	for (const participant in balances) {
	// 		if (balances[participant] > 0) {
	// 			creditors.push({ participant, amount: balances[participant] });
	// 		} else if (balances[participant] < 0) {
	// 			debtors.push({ participant, amount: -balances[participant] });
	// 		}
	// 	}

	// 	// 計算最少交易次數的付款清單
	// 	const settlements: Settlement[] = [];

	// 	while (creditors.length > 0 && debtors.length > 0) {
	// 		const creditor = creditors[0];
	// 		const debtor = debtors[0];

	// 		const settlementAmount = Math.min(creditor.amount, debtor.amount);

	// 		settlements.push({
	// 			from: debtor.participant,
	// 			to: creditor.participant,
	// 			amount: settlementAmount,
	// 		});

	// 		creditor.amount -= settlementAmount;
	// 		debtor.amount -= settlementAmount;

	// 		if (creditor.amount === 0) {
	// 			creditors.shift();
	// 		}

	// 		if (debtor.amount === 0) {
	// 			debtors.shift();
	// 		}
	// 	}

	// 	return settlements;
	// }
}
