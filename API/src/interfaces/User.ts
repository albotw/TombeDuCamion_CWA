export default interface IUser {
    uid: string;
    hash: string;
    nickname: string;
    email: string;
    wishlist : string[];
    totalSales: number;
    notation: number;
    history: HistoryElement[];
}

export interface HistoryElement {
    type: string;
    product: string;
}