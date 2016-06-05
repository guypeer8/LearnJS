// Credit to Yehuda Katz for `fromPrototype` function
// http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
var fromPrototype = function(prototype, object) {
    var newObject = Object.create(prototype);
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            newObject[prop] = object[prop];
        }
    }
  return newObject;
};


// Define our `DeviceFactory` base object
var DeviceFactory = {
    screen() {
        return 'retina';
    },
    battery() {
        return 'lithium ion battery';
    },
    keypad() {
        return 'keyboard';
    },
    processor() {
        return 'Intel Core-i5';
    }
};

// Extend `DeviceFactory` with other implementations
DeviceFactory.makeLaptop = function() {
    return fromPrototype(DeviceFactory, {
        screen() {
            return 'retina 13 inches';
        },
        battery() {
            return 'lithium ion 9 hours battery';
        },
        keypad() {
            return 'backlit keyboard';
        },
        processor() {
            return 'Intel Core-i5'
        }
    });
};

DeviceFactory.makeSmartPhone = function() {
    return fromPrototype(DeviceFactory, {
        screen() {
            return 'retina 5 inches';
        },
        battery() {
            return 'lithium ion 15 hours';
        },
        keypad() {
            return 'touchscreen keypad';
        },
        processor() {
            return 'ARMv8'
        }
    });
};

DeviceFactory.makeTablet = function() {
    return fromPrototype(DeviceFactory, {
        screen() {
            return 'retina 9 inches';
        },
        battery() {
            return 'lithium ion 15 hours';
        },
        keypad() {
            return 'touchscreen keypad';
        },
        processor() {
            return 'ARMv8';
        }
    });
};


var appleMacbookPro = DeviceFactory.makeLaptop();
console.log(appleMacbookPro.screen()); // returns 'retina 13 inches';
var iPhoneSomeS = DeviceFactory.makeSmartPhone();
var iPadSomeSS = DeviceFactory.makeTablet();
