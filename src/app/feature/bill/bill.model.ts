/**
 * 帳單
 */
export interface Bill {
	id: string;
	/**
	 * 建立日期
	 */
	createdAt: string;
	/**
	 * 參與者
	 */
	participants: string[];
	/**
	 * 標題
	 */
	title: string;
	/**
	 * 建立者
	 */
	ownerId: string;
}

/**
 * 帳單編輯
 * @description 用於編輯帳單的資料結構
 * @example
 * {
 *   title: 'Dinner',
 *   participants: ['Alice', 'Bob'],
 *   createdAt: '2023-10-01',
 *   ownerId: 'user123'
 * }
 * @type {BillEdit}
 * @property {string} title - 帳單標題
 * @property {string[]} participants - 參與者列表
 * @property {string} createdAt - 建立日期
 * @property {string} ownerId - 建立者ID
 */
export interface BillEdit {
	title: string;
	participants: string[];
	createdAt: string;
	ownerId: string;
}

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
