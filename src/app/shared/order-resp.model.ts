export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    brand: string;
    category: Category;
    thumbnail: string;
    images: string[];
    createdAt: Date;
}

export interface OrderItemList {
    id: number;
    product: Product;
    quantity: number;
}

export interface OrderResponse {
    id: number;
    orderItemList: OrderItemList[];
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    orderNotes: string;
    totalOrderPrice: number;
    totalPrice: number;
    paymentStatus: string;
    orderStatus: string;
    createdAt: Date;
}