import { Rectangle, Square, Circle, Shape } from "./shape";

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

function printShape(shape: Shape): void {
    const isPolygon : string = shape.isPolygon ? " est un polygone. " : " n'est pas un polygone. "
    console.log(shape.name + isPolygon + "Son aire est " + shape.getArea() + ".");
}

const rectangle = new Rectangle("Rectangle", 2, 4);
const square = new Square("Carré", 3);
const circle = new Circle("Cercle", 10);

printShape(rectangle); // doit afficher "Rectangle est un polygone. Son aire est 8."
printShape(square);    // doit afficher "Carré est un polygone. Son aire est 9."
printShape(circle);    // doit afficher "Cercle n'est pas un polygone. Son aire est 314.1592653589793"
                