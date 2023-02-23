class ProductsDTO {
    constructor({ name, price, stock }) {
        this.name = name
        this.price = price
        this.stock = stock
    }
    
}

function productsDTOfunction(products) {
    if(Array.isArray(products))
        return products.map(products => new ProductsDTO(products))
    else
        return new ProductsDTO(products)
}

module.exports = {
    productsDTOfunction
}
