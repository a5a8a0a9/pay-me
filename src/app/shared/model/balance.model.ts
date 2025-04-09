/**
 * 结算內容
 */
export interface Balance {
	/** 收款人 */
	fromUserId: string;
	/** 收款人 */
	toUserId: string;
	/** 金額 */
	amount: number;
}
