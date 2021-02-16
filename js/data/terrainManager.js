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
        const alienTerrainType = TerrainTypes.ASH;
        let thirdX = Math.floor(mapSizeX / 3);
        let thirdY = Math.floor(mapSizeY / 3);
        if (thirdX > thirdY) { thirdX = thirdY; } else { thirdY = thirdX; }

        for (let x = 0; x < mapSizeX; x++) {
            for (let y = 0; y < mapSizeY; y++) {
                let terrainType = TerrainTypes.DIRT;
                if (x >= 0 && x < thirdX && y >= thirdY && y < thirdY * 2) {
                    terrainType = alienTerrainType;
                }
                if (x >= thirdX * 2 && x < thirdX * 3 && y >= thirdY && y < thirdY * 2) {
                    terrainType = alienTerrainType;
                }
                if (x >= thirdX && x < thirdX * 2 && y >= 0 && y < thirdY) {
                    terrainType = alienTerrainType;
                }
                if (x >= thirdX && x < thirdX * 2 && y >= thirdY && y < thirdY * 3) {
                    terrainType = alienTerrainType;
                }
                if (x >= thirdX && x < thirdX * 2 && y >= thirdY && y < thirdY * 2) {
                    terrainType = TerrainTypes.TILLED;
                }
                if (x >= thirdX * 3 || y >= thirdY * 3) {
                    terrainType = TerrainTypes.PIT;
                }
                this.terrainTypes[tileCoordToInteger({ x, y }, getMapSize())] = terrainType;
            }
        }

        for (let x = 0; x < mapSizeX; x++) {
            for (let y = 0; y < mapSizeY; y++) {
                const tileInteger = tileCoordToInteger({ x, y }, getMapSize());
                const terrainSprite = new TerrainSprite({ x, y }, this.terrainTypes[tileInteger], TerrainTypes.DIRT, this, pixiLoader);
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