class ProductsDTO {
    constructor({ _id, id, name, price, stock, codebar }) {
        this._id = _id
        this.id = id
        this.name = name
        this.price = price
        this.stock = stock
        this.codebar = codebar
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
