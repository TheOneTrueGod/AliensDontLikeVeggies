import { getTileSize } from "../constants.js";
import { SpriteList } from "../sprites.js";

export const UnitDefs = {
    AlienAdult: {
        spritesheet: {
            name: SpriteList.ALIEN_ADULT,
            spritesInSheet: { x: 1, y: 1 },
            spriteCoords: { x: 0, y: 0 },
        },
    },
    AlienYoung: {
        spritesheet: {
            name: SpriteList.ALIEN_YOUNG,
            spritesInSheet: { x: 1, y: 1 },
            spriteCoords: { x: 0, y: 0 },
        },
    },
    AlienEgg: {
        spritesheet: {
            name: SpriteList.ALIEN_EGG,
            spritesInSheet: { x: 1, y: 1 },
            spriteCoords: { x: 0, y: 0 },
        },
    }
}

export default class Unit {
    constructor(tileCoord, unitDef) {
        this.tileCoord = { x: tileCoord.x, y: tileCoord.y };
        this.unitDef = unitDef;

        this.sprite = undefined;
    }

    getSpriteFromDef(pixiLoader) {
        const spriteDef = this.unitDef.spritesheet;
        const spriteTexture = pixiLoader.resources[spriteDef.name].texture;

        const imageSize = {
            x: spriteTexture.width / spriteDef.spritesInSheet.x,
            y: spriteTexture.height / spriteDef.spritesInSheet.y
        };

        const t32Rect = new PIXI.Rectangle(
            imageSize.x * spriteDef.spriteCoords.x,
            imageSize.y * spriteDef.spriteCoords.y,
            imageSize.x,
            imageSize.y
        );
        
        const framedTexture = new PIXI.Texture(spriteTexture.baseTexture, t32Rect);
    
        const unitSprite = new PIXI.Sprite(framedTexture);
        return unitSprite;
    }

    getSprite(pixiLoader) {
        if (this.sprite) { return this.sprite; }

        this.sprite = this.getSpriteFromDef(pixiLoader);

        const tileSize = getTileSize();
        
        this.sprite.position.x = this.tileCoord.x * tileSize.x;
        this.sprite.position.y = this.tileCoord.y * tileSize.y;

        this.sprite.width = tileSize.x;
        this.sprite.height = tileSize.y;

        return this.sprite;
    }

    addToContainer(unitContainer, pixiLoader) {
        const sprite = this.getSprite(pixiLoader);
        if (sprite.parent) {
            throw new Error("Can't have multiple parents.");
        }
        unitContainer.addChild(sprite);
    }
}