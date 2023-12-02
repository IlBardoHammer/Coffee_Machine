// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const Coffee = {
  espresso: {
    waterNecesary: 250,
    beansNecesary: 16,
    cupNecesary: 1,
    price: 4,
  },
  latte: {
    waterNecesary: 350,
    milkNecesary: 75,
    beansNecesary: 20,
    cupNecesary: 1,
    price: 7,
  },
  cappuccino: {
    size: {
      small: {
        waterNecesary: 100,
        milkNecesary: 80,
        beansNecesary: 12,
        cupNecesary: 1,
        price: 6,

      },
      medium: {
        waterNecesary: 200,
        milkNecesary: 100,
        beansNecesary: 12,
        cupNecesary: 1,
        price: 6,

      },
      big: {
        waterNecesary: 200,
        milkNecesary: 100,
        beansNecesary: 12,
        cupNecesary: 1,
        price: 6,
      }
    }
  },
};

const MachineState = {
  state: {
    availableWater: 400,
    availableMilk: 540,
    availableCoffeeBeans: 120,
    availableCup: 9,
    availableMoney: 550,
  },
  displayMachineState() {
    console.log(`The coffee machine has:
    ${this.state.availableWater} ml of water
    ${this.state.availableMilk} ml of milk
    ${this.state.availableCoffeeBeans} g of coffee beans
    ${this.state.availableCup} disposable cups
    $${this.state.availableMoney} of money`);
  }

}

function checkResources(coffeeType) {
  if (
    MachineState.state.availableWater < coffeeType.waterNecesary ||
    MachineState.state.availableMilk < coffeeType.milkNecesary ||
    MachineState.state.availableCoffeeBeans < coffeeType.beansNecesary ||
    MachineState.state.availableCup < coffeeType.cupNecesary
  ) {
    return false;
  }
  return true;
}

function getErrorMessage(coffeeType) {
  if (MachineState.state.availableWater < coffeeType.waterNecesary) {
    return 'Sorry, not enough water!';
  }
  else if (MachineState.state.availableMilk < coffeeType.milkNecesary) {
    return 'Sorry, not enough milk!';
  }
  else if (MachineState.state.availableCoffeeBeans < coffeeType.beansNecesary) {
    return 'Sorry, not enough coffee beans!';
  }
  else if (MachineState.state.availableCup < coffeeType.cupNecesary) {
    return 'Sorry, not enough cups!';
  }
  else {
    return null; // Nessun errore
  }
}

function buy() {
  console.log(`What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino: `)
  const chooseNumber = Number(input());

  let selectedCoffee = (chooseNumber === 1) ? Coffee.espresso :
                       (chooseNumber === 2) ? Coffee.latte :
                       (chooseNumber === 3) ? Coffee.cappuccino : null;

  if (chooseNumber === 3) {
    console.log(`What size should your cappuccino be? 1 - small, 2 - medium, 3 - big:  `)
    const typeOfCappuccino = Number(input());
    if (typeOfCappuccino === 1) {
      selectedCoffee = Coffee.cappuccino.size.small;
    }
    else if (typeOfCappuccino === 2) {
      selectedCoffee = Coffee.cappuccino.size.medium;
    }
    else if (typeOfCappuccino === 3) {
      selectedCoffee = Coffee.cappuccino.size.big;
    }
  }

  if (selectedCoffee && checkResources(selectedCoffee)) {
    const errorMessage = getErrorMessage(selectedCoffee);

    if (errorMessage) {
      console.log(errorMessage);
    }
    else {
      // Prepara il caffè
      console.log("I have enough resources, making you a coffee!")
      MachineState.state.availableWater -= selectedCoffee.waterNecesary;
      MachineState.state.availableCoffeeBeans -= selectedCoffee.beansNecesary;
      MachineState.state.availableCup -= selectedCoffee.cupNecesary;

      if (chooseNumber === 2 || chooseNumber === 3) {
        MachineState.state.availableMilk -= selectedCoffee.milkNecesary;
      }

      MachineState.state.availableMoney += selectedCoffee.price;
    }
  }
  else {
    console.log('Invalid selection!'); // per numeri che non sono 1-2-3
  }
}

function fill() {
  const addWater = Number(input(`Write how many ml of water you want to add:`));
  MachineState.state.availableWater += addWater;

  const addMilk = Number(input(`Write how many ml of milk you want to add:`));
  MachineState.state.availableMilk += addMilk;

  const addBeans = Number(input(`Write how many grams of coffee beans you want to add:`));
  MachineState.state.availableCoffeeBeans += addBeans;

  const addCups = Number(input(`Write how many disposable cups you want to add:`));
  MachineState.state.availableCup += addCups;
}

function take() {
  console.log(`I gave you $550`);
  MachineState.state.availableMoney = 0;
}

let action = null;

while (action !== 'exit') {
  action = input(`Write action (buy, fill, take, remaining, exit):`);
  switch (action) {
    case 'buy':
      buy();
      break;
    case 'fill':
      fill();
      break;
    case 'take':
      take();
      break;
    case 'remaining':
      MachineState.displayMachineState();
      break;
    case 'exit':
      break;
  }
}


