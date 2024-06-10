interface product {
    "title": string,
    "isAvailable": boolean,
    "productCategoryId" : number | null,
    "brandId": number | null,
    "isVIP": boolean,
    "createDate": Date,

}

interface productCategory {
    "productCategoryId" ?: number,
    "title": string
}

interface brand {
    "title": string,
    "createDate": Date
}

export{
    brand,
    product,
    productCategory
}