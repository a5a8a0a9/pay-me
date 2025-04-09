export interface ExpenseUserAmount {
	userId: string;
	amount: number;
}

/**
 * 花費
 */
export interface Expense {
	id: string;
	/**
	 * 發生時間
	 */
	occurrenceTime: string;
	/**
	 * 金額
	 */
	amount: number;
	/**
	 * 描述
	 */
	memo: string;
	/**
	 * 付款者列表
	 */
	payerList: ExpenseUserAmount[];
	/**
	 * 分攤人列表
	 */
	splitterList: ExpenseUserAmount[];
}
