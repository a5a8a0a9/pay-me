/**
 * 花費
 */
export interface Expense {
	id: string;
	/**
	 * 日期
	 */
	date: string;
	/**
	 * 金額
	 */
	amount: number;
	/**
	 * 付款人
	 */
	payer: string;
	/**
	 * 描述
	 */
	description: string;
	/**
	 * 參與者
	 */
	participants: string[];
}
