class DaoMemory {
    constructor(){
        this.items = [];
    }

    async save(obj) {
        this.items.push(obj);
        return obj;
    }

    async getAll(){
        return this.items;
    }
};

module.exports = { DaoMemory };