import {Identity } from "./Identity"

export class Person implements Identity {
    name: string;
    constructor(n: string) {
        this.name = n;
    }

    getID(): string {
        return "ID"+this.name;
    }
	getName() : string {
		return this.name;
    }        

    setName(n: string) {
        this.name = n;
    }
}