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

export interface BillEdit {
	title: string;
	participants: string[];
	createdAt: string;
	ownerId: string;
}
