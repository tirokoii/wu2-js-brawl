class Item {
    constructor(name, des, perks, price) {
        this.name = name
        this.des = des
        this.perks = [perks]
        this.price = price
    }
}

class Storage {
    constructor(content) {
        this.length = 4
        this.content = content
    }

    remove_item(item, length) { //  Method
        if (this.content > length) {
            this.content.filter((i) != item)
        } else {
            console.log("No")
        }
    }

    add_item(item) {
        this.content.push(item)
    }
}

Axe = new Item("Axe", "Will give you +2 damage for 5 rounds, if you can hit...", {"dmg": 2}, 10)
Store = new Storage(Axe)