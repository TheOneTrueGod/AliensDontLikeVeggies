import { SpriteList } from "../../sprites.js";

export const PlantDefs = {
    Potato: {
        stages: 4,
        spritesheet: {
            name: SpriteList.CROPSHEET,
            spritesInSheet: { x: 32, y: 16 },
            spriteCoords: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
        },
    },
    Peppers: {
        stages: 4,
        spritesheet: {
            name: SpriteList.CROPSHEET,
            spritesInSheet: { x: 32, y: 16 },
            spriteCoords: [{ x: 22, y: 0 }, { x: 22, y: 1 }, { x: 22, y: 2 }, { x: 22, y: 3 }],
        },
    },
}