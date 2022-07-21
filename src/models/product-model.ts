class ProductModel { 
    id: number;
    name: string;
    description: string;
    price: string

    constructor(productID: number, productName: string, productDescription: string, productPrice: string) {
        this.id = productID
        this.name = productName
        this.description = productDescription
        this.price = productPrice
    }
}

export default ProductModel
