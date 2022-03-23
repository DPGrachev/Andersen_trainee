function isValidName (name) {
  return name && name.length >= 1 && name.length <= 50;
}

function isValidYear (year) {
  return year && year >= 1900 && year <= 2022;
}

function isValidMaxSpeed (speed) {
  return speed && speed >= 100 && speed <= 300;
}

function isValidMaxFuelVolume (volume) {
  return volume && volume >= 5 && volume <= 20;
}

function isValidFuelConsumption (consumption) {
  return Number.isFinite(consumption) && consumption > 0;
}

export class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume;
  #isStarted;
  #mileage;

  constructor(brand, model, yearOfManufacturing, maxSpeed, maxFuelVolume, fuelConsumption, currentFuelVolume = 0, isStarted = false, mileage = 0) {
    this.#brand = isValidName(brand) ? brand : null;
    this.#model = isValidName(model) ? model : null;
    this.#yearOfManufacturing = isValidYear(yearOfManufacturing) ? yearOfManufacturing : null;
    this.#maxSpeed = isValidMaxSpeed(maxSpeed) ? maxSpeed : null;
    this.#maxFuelVolume = isValidMaxFuelVolume(maxFuelVolume) ? maxFuelVolume : null;
    this.#fuelConsumption = isValidFuelConsumption(fuelConsumption) ? fuelConsumption : null;
    this.#currentFuelVolume = currentFuelVolume;
    this.#isStarted = isStarted;
    this.#mileage = mileage;
  }

  get brand() {
    return this.#brand;
  }

  set brand(value) {
    if ( isValidName(value) ) {
      this.#brand = value;
    }
  }

  get model() {
    return this.#model;
  }

  set model(value) {
    if ( isValidName(value) ) {
      this.#model = value;
    }
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(value) {
    if ( isValidYear(value) ) {
      this.#yearOfManufacturing = value;
    }
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }

  set maxSpeed(value) {
    if ( isValidMaxSpeed(value) ) {
      this.#maxSpeed = value;
    }
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(value) {
    if ( isValidMaxFuelVolume(value) ) {
      this.#maxFuelVolume = value;
    }
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(value) {
    if ( isValidFuelConsumption(value) ) {
      this.#fuelConsumption = value;
    }
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Машина уже заведена');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(value) {
    if (!Number.isFinite(value) || value < 1) {
      throw new Error('Неверное количество топлива для заправки');
    }

    if (!this.#maxFuelVolume) {
      throw new Error('Не указан объем топливного бака');
    }

    if (this.#currentFuelVolume + value > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume += value;
  }

  drive(speed, hours) {
    if (!Number.isFinite(speed) || speed < 1) {
      throw new Error('Неверная скорость');
    }

    if (!Number.isFinite(hours) || hours < 1) {
      throw new Error('Неверное количество часов');
    }

    if (!this.#maxSpeed) {
      throw new Error('Не указана максимальная скорость');
    }

    if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (!this.#isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    if (!this.#fuelConsumption) {
      throw new Error('Не указан расход топлива');
    }

    const distance = speed * hours;
    const requiredFuel = (distance / 100) * this.#fuelConsumption;

    if (this.#currentFuelVolume < requiredFuel) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= requiredFuel;
    this.#mileage += distance;
  }
}
