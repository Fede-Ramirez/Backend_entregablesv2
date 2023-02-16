const filesystem = require('fs');

class File {
    constructor(path) {
        this.path = path;
    }

    async save(obj) {
        try {
            const items = await this.getAll();
            items.push(obj);
            await filesystem.promises.writeFile(this.path, JSON.stringify(items));
            return obj;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            if (filesystem.existsSync(this.path)) {
                const list = await filesystem.promises.readFile(this.path, 'utf-8');
                return JSON.parse(list);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { File };