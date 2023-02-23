class CartsDTO {
    constructor({ user, products, }) {
        this.user = user
        this.products = products
    }
    
}

function cartsDTOfunction(carts) {
    if(Array.isArray(carts))
        return carts.map(carts => new CartsDTO(carts))
    else
        return new CartsDTO(carts)
}

module.exports = {
    cartsDTOfunction
}