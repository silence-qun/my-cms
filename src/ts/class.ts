class Shape {
  getAear() {}
}

class Rectangle extends Shape {
  getAear() {
    return 100
  }
}

class Circle extends Shape {
  getAear() {
    return 200
  }
}

let r = new Rectangle()
let c = new Circle()

export function calcAear(shape: Shape) {
  console.log(shape.getAear())
}

calcAear(r)
calcAear(c)
