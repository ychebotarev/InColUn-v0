import {Person} from "./Person"

export class Greeter{
    person: Person;
    prefix: string;
	constructor(p:Person){
        this.person = p;
        this.prefix = "Hello from someone with a name:";
		var p1 = new Person("test");
    }

    setPrefix(s: string) {
        this.prefix = s;
    }

    getPrefix(): string {
        return this.prefix;
    }

    setID(p: Person) {
        this.person = p;
    }

    getGreeting(): string {
        return this.prefix + this.person.getName();
	}
}