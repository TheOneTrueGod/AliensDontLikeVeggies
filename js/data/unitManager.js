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
        const startX = Math.floor(mapSize.x / 4 * 3) - 1;
        const startY = Math.floor(mapSize.y / 2);
        this.addUnit(pixiLoader, new Alien({ x: startX, y: startY - 1 }, AlienDefs.AlienAdult));
        this.addUnit(pixiLoader, new Alien({ x: startX, y: startY }, AlienDefs.AlienYoung));
        this.addUnit(pixiLoader, new Alien({ x: startX, y: startY + 1 }, AlienDefs.AlienEgg));

        const plantStartY = 3;
        for (let x = 3; x < 7; x++) {
            this.addUnit(pixiLoader, new Plant({ x, y: plantStartY }, PlantDefs.Potato));
            this.addUnit(pixiLoader, new Plant({ x, y: plantStartY + 1 }, PlantDefs.Peppers));
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