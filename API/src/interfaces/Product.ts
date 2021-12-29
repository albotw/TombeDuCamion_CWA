export default interface IProduct {
    p_uid: string;
    seller: string;
    title: string;
    stock: number;
    description: string;
    images: string[];
    category: string;
    comments: string[];
    notation: number;
    price: number;
    sales: number;
    views: number;
}