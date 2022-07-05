class LinkedListNode {
    value: number;
    next: LinkedListNode | null;
    constructor(value: number, next: LinkedListNode | null) {
        this.value = value;
        this.next = next;
    }
}


class LinkedList {
    head: LinkedListNode | null;
    tail: LinkedListNode | null;
    length: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insertFirst(data: number): void {
        this.head = new LinkedListNode(data, this.head);
        if (!this.length) this.tail = this.head;
        this.length++;
    }

    add(data: number) {
        if (this.length) {
            this.tail!.next = new LinkedListNode(data, null);
            this.tail = this.tail!.next;
        } else {
            this.insertFirst(data);
        }
        this.length++;
    }

    insertAt(data: number, index: number) {
        if (index == 0) {
            this.insertFirst(data);
        } else if (index == this.length) {
            this.add(data);
        } else if (index <= this.length) {
            let curr = this.head;
            index--;
            while (index > 0 && curr!.next) {
                curr = curr!.next;
                index--;
            }
            curr!.next = new LinkedListNode(data, curr!.next);
        }
        this.length++;
    }

    removeAt(index: number) {
        if (index == 0 && this.head) {
            this.head = this.head.next;
            this.length--;
        } else if (index <= this.length) {
            let curr = this.head;
            index--;
            while (index > 0) {
                curr = curr!.next;
                index--;
            }
            if (curr!.next == this.tail) {
                this.tail = curr;
                curr!.next = null;
            } else {
                curr!.next = curr!.next?.next || null;
            }
            this.length--;
        }
    }

    getAt(index: number): number | undefined {
        if (this.length <= index || index < 0) return undefined;
        let target = this.head;
        index--;
        while (index >= 0) {
            index--;
            target = target!.next;
        }
        return target!.value;
    }

    size() {
        return this.length;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    printListData() {
        let curr = this.head;
        while (curr) {
            console.log(curr.value);
            curr = curr.next;
        }
    }
}



module.exports = LinkedList;