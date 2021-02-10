import { getTileSize } from "../constants.js";

export default class Unit {
    constructor(tileCoord, unitDef) {
        this.tileCoord = { x: tileCoord.x, y: tileCoord.y };
        this.unitDef = unitDef;

        this.sprite = undefined;
        this.spriteContainer = new PIXI.Sprite();
        this.spriteVariant = 0;
        this.spriteDirty = true;
    }

    getSpriteFromDef(pixiLoader) {
        const spriteDef = this.unitDef.spritesheet;
        const spriteTexture = pixiLoader.resources[spriteDef.name].texture;

        const imageSize = {
            x: spriteTexture.width / spriteDef.spritesInSheet.x,
            y: spriteTexture.height / spriteDef.spritesInSheet.y
        };

        const t32Rect = new PIXI.Rectangle(
            imageSize.x * spriteDef.spriteCoords[this.spriteVariant].x,
            imageSize.y * spriteDef.spriteCoords[this.spriteVariant].y,
            imageSize.x,
            imageSize.y
        );
        
        const framedTexture = new PIXI.Texture(spriteTexture.baseTexture, t32Rect);
    
        const unitSprite = new PIXI.Sprite(framedTexture);
        return unitSprite;
    }

    getSprite(pixiLoader) {
        if (this.sprite && !this.spriteDirty) { return this.sprite; }
        
        this.sprite && this.spriteContainer.removeChild(this.sprite);

        this.sprite = this.getSpriteFromDef(pixiLoader);

        const tileSize = getTileSize();
        
        // align with bottom center of tile
        this.spriteContainer.position.x = (this.tileCoord.x + 0.5) * tileSize.x - this.sprite.width / 2;
        this.spriteContainer.position.y = (this.tileCoord.y + 1) * tileSize.y - this.sprite.height;

        this.spriteDirty = false;
        this.spriteContainer.addChild(this.sprite);

        return this.sprite;
    }

    addToContainer(unitContainer, pixiLoader) {
        this.getSprite(pixiLoader);
        if (this.spriteContainer.parent) {
            throw new Error("Can't have multiple parents.");
        }
        unitContainer.addChild(this.spriteContainer);
    }

    endTurn() {

    }
}