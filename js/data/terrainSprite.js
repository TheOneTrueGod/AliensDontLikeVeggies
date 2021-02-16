import { getTileSize } from '../constants.js';
import { SpriteList } from '../sprites.js';

export const TerrainTypes = {
    GRASS: 'grass',
    DIRT: 'dirt',
    ASH: 'ash',
    WATER: 'water',
    PIT: 'pit',
    TILLED: 'tilled',
}

const TerrainTypeOffsets = {
    [TerrainTypes.GRASS]: { x: 0, y: 1 },
    [TerrainTypes.DIRT]: { x: 0, y: 0 },
    [TerrainTypes.ASH]: { x: 3, y: 0 },
    [TerrainTypes.WATER]: { x: 9, y: 0 },
    [TerrainTypes.PIT]: { x: 8, y: 0 },
    [TerrainTypes.TILLED]: { x: 1, y: 0 }
}

const Directions = {
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 4,
    LEFT: 8,
}

const NeighbourOffsetMap = {
    /* 0 */ 0: { x: 0, y: 0 },
    /* 1 */ [Directions.TOP]: { x: 0, y: -1 },
    /* 2 */ [Directions.RIGHT]: { x: 1, y: 0 },
    /* 3 */ [Directions.TOP + Directions.RIGHT]: { x: 1, y: -1 },
    /* 4 */ [Directions.BOTTOM]: { x: 0, y: 1 },
    /* 6 */ [Directions.BOTTOM + Directions.RIGHT]: { x: 1, y: 1 },
    /* 8 */ [Directions.LEFT]: { x: -1, y: 0 },
    /* 9 */ [Directions.LEFT + Directions.TOP]: { x: -1, y: -1 },
    /* 12 */ [Directions.LEFT + Directions.BOTTOM]: { x: -1, y: 1 },
}

export const TerrainEffects = {
    TARGETTER_MOVE: 'targetter_move',
    TARGETTER_ATTACK: 'targetter_attack',
}

function getTerrainSprite(terrainTexture, terrainType, neighboursBitmap) {
    const terrainTypeOffset = TerrainTypeOffsets[terrainType];
    const neighbourOffset = NeighbourOffsetMap[neighboursBitmap] || { x: -1, y: -2 };
    const centerTile = { x: 1, y: 3 };
    const imageSize = { x: 32, y: 32 };
    const tileFramePosition = {
        x: centerTile.x + terrainTypeOffset.x * 3 + neighbourOffset.x,
        y: centerTile.y + terrainTypeOffset.y * 6 + neighbourOffset.y,
    };
    const t32Rect = new PIXI.Rectangle(
        imageSize.x * tileFramePosition.x,
        imageSize.y * tileFramePosition.y,
        imageSize.x,
        imageSize.y
    );
    
    const framedTexture = new PIXI.Texture(terrainTexture.baseTexture, t32Rect);

    const terrainSprite = new PIXI.Sprite(framedTexture);
    return terrainSprite;
}

export default class TerrainSprite {
    constructor(tileCoord, terrainType, backgroundTerrain, terrainManager, pixiLoader) {
        const { x: tileSizeX, y: tileSizeY } = getTileSize();
        this.tileCoord = tileCoord;
        this.terrainType = terrainType;
        this.backgroundTerrain = backgroundTerrain;
        this.terrainManager = terrainManager;

        this.containerSprite = new PIXI.Sprite();
        this.containerSprite.position.x = this.tileCoord.x * tileSizeX;
        this.containerSprite.position.y = this.tileCoord.y * tileSizeY;

        this.createTerrainSprite(pixiLoader);
        
        this.pixiLoader = pixiLoader;
        this.terrainEffects = Object.keys(TerrainEffects).map((key) => undefined);
    }

    addToContainer(terrainContainer) {
        if (this.containerSprite.parent) {
            throw new Error("Can't have multiple parents.");
        }
        terrainContainer.addChild(this.containerSprite);
    }

    showTerrainEffect(terrainEffect) {
        if (this.terrainEffects[terrainEffect] === undefined) {
            this.terrainEffects[terrainEffect] = this.getTerrainEffectSprite(terrainEffect);
        }
        this.terrainEffects[terrainEffect].visible = true;
    }

    hideTerrainEffect(terrainEffect) {
        if (this.terrainEffects[terrainEffect]) {
            this.terrainEffects[terrainEffect].visible = false;
        }
    }

    getTerrainEffectSprite(terrainEffect) {
        const { x: tileSizeX, y: tileSizeY } = getTileSize();

        let sprite = null;
        switch (terrainEffect) {
            case TerrainEffects.TARGETTER_ATTACK:
                sprite = new PIXI.Sprite(this.pixiLoader.resources[SpriteList.CROSSHAIR].texture);
            case TerrainEffects.TARGETTER_MOVE:
                sprite = new PIXI.Sprite(this.pixiLoader.resources[SpriteList.POSITION_MARKER].texture);
        }
        sprite.width = tileSizeX;
        sprite.height = tileSizeY;
        sprite.visible = false;
        this.containerSprite.addChild(sprite);
        return sprite;
    }

    createTerrainSprite(pixiLoader) {
        const { x: tileSizeX, y: tileSizeY } = getTileSize();

        const backgroundTerrainSprite = getTerrainSprite(
            pixiLoader.resources[SpriteList.TERRAIN].texture,
            this.backgroundTerrain,
            0
        );
        backgroundTerrainSprite.width = tileSizeX;
        backgroundTerrainSprite.height = tileSizeY;
        this.containerSprite.addChild(backgroundTerrainSprite);

        if (this.backgroundTerrain !== this.terrainType) {
            const tc = this.tileCoord;
            const tt = this.terrainType;
            const bt = this.terrainType; //TerrainTypes.PIT;
            const neighbours =
                ((this.terrainManager.getTerrainAt({ x: tc.x, y: tc.y - 1 }, bt) !== tt) && Directions.TOP) +
                ((this.terrainManager.getTerrainAt({ x: tc.x + 1, y: tc.y }, bt) !== tt) && Directions.RIGHT) +
                ((this.terrainManager.getTerrainAt({ x: tc.x, y: tc.y + 1 }, bt) !== tt) && Directions.BOTTOM) +
                ((this.terrainManager.getTerrainAt({ x: tc.x - 1, y: tc.y }, bt) !== tt) && Directions.LEFT);

            const terrainSprite = getTerrainSprite(
                pixiLoader.resources[SpriteList.TERRAIN].texture,
                this.terrainType,
                neighbours
            );
            terrainSprite.width = tileSizeX;
            terrainSprite.height = tileSizeY;
            this.containerSprite.addChild(terrainSprite);

            return terrainSprite;
        }
        return backgroundTerrainSprite;
    }
}