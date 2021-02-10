import Unit from "../unit.js"

export default class Plant extends Unit {
    constructor(tileCoord, unitDef) {
        super(tileCoord, unitDef);
        this.stage = 0;
    }

    endTurn(pixiLoader) {
        this.stage = Math.min(this.stage + 1, this.unitDef.stages - 1);
        this.spriteVariant = this.stage;
        this.spriteDirty = true;
        this.getSprite(pixiLoader);
    }
}