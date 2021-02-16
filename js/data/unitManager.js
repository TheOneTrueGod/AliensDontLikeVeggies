import { getMapSize } from "../constants.js";
import { AlienDefs } from "./unitDefs/alienDefs.js";
import { PlantDefs } from "./unitDefs/plantDefs.js";
import Alien from "./units/alien.js";
import Plant from "./units/plant.js";

export default class UnitManager {
    constructor(unitContainer) {
        this.units = [];

        this.unitContainer = unitContainer;
    }
    
    createInitialUnits(pixiLoader) {
        const mapSize = getMapSize();

        this.addUnit(pixiLoader, new Alien({ x: 2, y: 5 }, AlienDefs.AlienAdult));
        this.addUnit(pixiLoader, new Alien({ x: 9, y: 5 }, AlienDefs.AlienYoung));
        this.addUnit(pixiLoader, new Alien({ x: 5, y: 2 }, AlienDefs.AlienEgg));

        for (let x = 5; x < 7; x++) {
            this.addUnit(pixiLoader, new Plant({ x, y: 5 }, PlantDefs.Potato));
            this.addUnit(pixiLoader, new Plant({ x, y: 6 }, PlantDefs.Peppers));
        }
        
    }

    addUnit(pixiLoader, unit) {
        this.units.push(unit);
        unit.addToContainer(this.unitContainer, pixiLoader);
    }

    endTurn(pixiLoader) {
        this.units.forEach(unit => unit.endTurn(pixiLoader));
    }
}