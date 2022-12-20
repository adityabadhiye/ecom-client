export interface CartResponce {
    id: number;
    products:
    {
        id: number;
        title: string;
        price: number;
        quantity: number;
        total: number;
        discountPercentage: number;
        discountedPrice: number;
    }[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}