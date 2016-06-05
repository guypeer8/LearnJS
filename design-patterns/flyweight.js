//only common data here is model and brand, 
//and created a flyweight object, that saves memory
function Car(model, brand) {
  this.model = model;
  this.brand = brand;
}

//carFactory using the common car model/method
let carFactory = (function() {
  let existingCars = {}, existingCar;
  return {
    createCar(model, brand) {
      existingCar = existingCars[model];
      if (!!existingCar) {
        return existingCar;
      }
      const car = new Car(model, brand);
      existingCars[model] = car;
      return car;
    }
  }
})();

//carProductionManager using the common car model/method
let carProductionManager = (function() {
  let carDb = {};
  return {
    addCar(carId, model, brand, color, carType){
      let car = carFactory.createCar(model, brand);
      carDb[carId] = {
          color,
          type: carType,
          car
      }
    },
    repaintCar(carId, newColor) {
      let carData = carDb[carId];
      carData.color = newColor
    }
  }
})();
