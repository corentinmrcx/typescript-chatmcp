
// Ajoutez les annotations de types pour les variables suivantes :

let firstName : string = "Bob";
let age : number = 25;
let isStudent : boolean = true;
let marks : number[] = [ 9, 14.5, 18 ];
        

// Ajoutez les annotations de type à la déclaration de la fonction suivante et écrivez son code :

interface Vector2D { x:number, y: number};

function dotProduct(vector1 : Vector2D, vector2 : Vector2D) {
    return (vector1.x * vector2.x) + (vector1.y * vector2.y);
}

console.log("dotProduct ---------------------------------------------------");
console.log(dotProduct({ x : 3, y : 2 }, { x : 4, y : 5 })); // doit afficher 22
    
interface Shape {
    name: string,
    isPolygon: boolean,
    getArea(): number
}

class AbstractShape implements Shape {
    name: string;
    isPolygon: boolean;

    constructor(name: string, isPolygon: boolean){
        this.name = name;
        this.isPolygon = isPolygon;
    }

    getArea(): number {
        return 1;
    }
}

class Rectangle extends AbstractShape {
    width: number;
    height : number;

    constructor(name: string, width: number, height: number) {
        super(name, true);
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(name: string, side:number) {
        super(name, side, side);
    }
}

class Circle extends AbstractShape {
    radius: number;

    constructor(name: string, radius: number) {
        super(name, false);
        this.radius = radius;
    }

    getArea(): number {
        return this.radius;
    }
}