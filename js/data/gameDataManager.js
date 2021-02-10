import TerrainManager from './terrainManager.js';
import UnitManager from './unitManager.js';
export default class GameDataManager {
    constructor(pixiContainers) {
        this.terrainManager = new TerrainManager();
        this.unitManager = new UnitManager(pixiContainers.units);
    }
}