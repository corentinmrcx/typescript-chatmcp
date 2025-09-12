export interface Shape {
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

export class Rectangle extends AbstractShape {
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

export class Square extends Rectangle {
    constructor(name: string, side:number) {
        super(name, side, side);
    }
}

export class Circle extends AbstractShape {
    radius: number;

    constructor(name: string, radius: number) {
        super(name, false);
        this.radius = radius;
    }

    getArea(): number {
        return Math.pow(this.radius, 2) * Math.PI;
    }
}