class ProductModel { 
    id: string;
    name: string;
    description: string;
    image: string;
    price: string

    constructor(productID: string, productName: string, productDescription: string, productImage:string, productPrice: string) {
        this.id = productID
        this.name = productName
        this.description = productDescription
        this.price = productPrice
        this.image = productImage
    }
}

export default ProductModel
