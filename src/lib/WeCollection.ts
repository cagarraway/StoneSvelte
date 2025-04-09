export class WeCollection<T> {
    private items: Map<string, T>;
    private order: string[];

    constructor() {
        this.items = new Map();
        this.order = [];
    }

    add(key: string, value: T): void {
        if (!this.items.has(key)) {
            this.order.push(key);
        }
        this.items.set(key, value);
    }

    remove(key: string): boolean {
        if (this.items.has(key)) {
            this.items.delete(key);
            this.order = this.order.filter(k => k !== key);
            return true;
        }
        return false;
    }

    get(key: string): T | undefined {
        return this.items.get(key);
    }

    has(key: string): boolean {
        return this.items.has(key);
    }

    keys(): string[] {
        return [...this.order];
    }

    values(): T[] {
        return this.order.map(key => this.items.get(key)!);
    }

    entries(): [string, T][] {
        return this.order.map(key => [key, this.items.get(key)!]);
    }

    forEach(callback: (value: T, key: string) => void): void {
        for (const key of this.order) {
            callback(this.items.get(key)!, key);
        }
    }

    reorder(newOrder: string[]): void {
        if (newOrder.every(key => this.items.has(key)) && new Set(newOrder).size === this.order.length) {
            this.order = newOrder;
        } else {
            throw new Error("Invalid order: Must include all existing keys exactly once.");
        }
    }
}
