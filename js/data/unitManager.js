import { getMapSize } from "../constants.js";
import Unit, { UnitDefs } from "./unit.js";

export default class UnitManager {
    constructor(unitContainer) {
        this.units = [];

        this.unitContainer = unitContainer;
    }
    
    createInitialUnits(pixiLoader) {
        const mapSize = getMapSize();
        const startX = Math.floor(mapSize.x / 4 * 3) - 1;
        const startY = Math.floor(mapSize.y / 2);
        this.addUnit(pixiLoader, new Unit({ x: startX, y: startY - 1 }, UnitDefs.AlienAdult));
        this.addUnit(pixiLoader, new Unit({ x: startX, y: startY }, UnitDefs.AlienYoung));
        this.addUnit(pixiLoader, new Unit({ x: startX, y: startY + 1 }, UnitDefs.AlienEgg));
    }

    addUnit(pixiLoader, unit) {
        this.units.push(unit);
        unit.addToContainer(this.unitContainer, pixiLoader);
    }
}