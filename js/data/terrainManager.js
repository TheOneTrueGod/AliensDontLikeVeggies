import TerrainSprite, { TerrainTypes } from './terrainSprite.js';
import { getMapSize } from '../constants.js';
import { tileCoordToInteger } from '../utils.js';

export default class TerrainManager {
    constructor() {
        this.terrainSprites = [];
        this.terrainTypes = [];
    }

    createTerrain(terrainContainer, pixiLoader) {
        const { x: mapSizeX, y: mapSizeY } = getMapSize();

        for (let x = 0; x < mapSizeX; x++) {
            for (let y = 0; y < mapSizeY; y++) {
                let terrainType = TerrainTypes.DIRT;
                if (x == 0 || y == 0 || x == mapSizeX - 1 || y == mapSizeY - 1) {
                    terrainType = TerrainTypes.GRASS;
                } else if (x >= mapSizeX / 2) {
                    terrainType = TerrainTypes.WATER;
                }
                this.terrainTypes[tileCoordToInteger({ x, y }, getMapSize())] = terrainType;
            }
        }

        for (let x = 0; x < mapSizeX; x++) {
            for (let y = 0; y < mapSizeY; y++) {
                const tileInteger = tileCoordToInteger({ x, y }, getMapSize());
                const terrainSprite = new TerrainSprite({ x, y }, this.terrainTypes[tileInteger], TerrainTypes.GRASS, this, pixiLoader);
                terrainSprite.addToContainer(terrainContainer);

                this.terrainSprites[tileInteger] = terrainSprite;
            }
        }
    }

    getTerrainAt(tileCoord, outOfBoundsValue) {
        const { x: mapSizeX, y: mapSizeY } = getMapSize();
        if (tileCoord.x < 0 || tileCoord.y < 0 || tileCoord.x >= mapSizeX || tileCoord.y >= mapSizeY) {
            return outOfBoundsValue;
        }

        return this.terrainTypes[tileCoordToInteger(tileCoord, getMapSize())];
    }
}