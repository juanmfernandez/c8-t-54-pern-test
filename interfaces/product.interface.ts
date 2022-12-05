export interface ProductDataInterface {
    id: string,
    productName: string,
    description: string,
    quantityInStock: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | undefined | null
};