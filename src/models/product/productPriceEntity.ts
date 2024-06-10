export interface IProductPrice{
    productPriceId?: number | null,
    shopPrice: number | null,
    shopPriceDiscount: number | null,
    salonPrice: number | null,
    salonPriceDiscount: number | null,
    agentPrice: number | null,
    agentPriceDiscount: number | null,
    sellerPrice: number | null,
    sellerPriceDiscount: number | null,
    title: string,
    isMostPopular?: boolean,
    isExtension?: boolean,
    createDate: string | Date,
    isDeleted?: boolean
}

export interface IProductPricePayload extends Omit<IProductPrice, "isDeleted" | "createDate" | "isDeleted"> {}