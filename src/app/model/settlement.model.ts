/**
 * 结算內容
 */
export interface Settlement {
	/** 收款人 */
	from: string;
	/** 收款人 */
	to: string;
	/** 金額 */
	amount: number;
}
