import AssetLoader from './sprites.js';
import GameDataManager from './data/gameDataManager.js';
import { getPixiCanvasSize } from './constants.js';
import ControlsManager from './data/controlsManager.js';

const DEBUG_MODE = false;

export default class MainGame {
    constructor(canvasElement, controlsElement) {
        this.pixiApp = new PIXI.Application(getPixiCanvasSize());
        this.pixiApp.renderer.backgroundColor = 0x22AA22;
        this.pixiLoader = new PIXI.Loader();

        this.pixiContainer = canvasElement;
        this.pixiContainer.appendChild(this.pixiApp.view);

        this.renderContainers = {
            terrain: new PIXI.Sprite(),
            units: new PIXI.Container(),
            debug: new PIXI.Sprite(),
            effects: new PIXI.Container(),
        };

        this.gameDataManager = new GameDataManager(this.renderContainers);

        ControlsManager.createControlsUI(controlsElement, () => {
            this.endTurn();
        });
    }
    
    startLoad() {
        AssetLoader.preLoad(this.pixiLoader, () => {
            this.loadComplete();
        });
    }

    loadComplete() {
        this.pixiApp.stage.addChild(this.renderContainers.terrain);
        this.pixiApp.stage.addChild(this.renderContainers.units);
        this.pixiApp.stage.addChild(this.renderContainers.effects);
        if (DEBUG_MODE) {
            this.pixiApp.stage.addChild(this.renderContainers.debug);
        }

        this.gameDataManager.terrainManager.createTerrain(this.renderContainers.terrain, this.pixiLoader);
        this.gameDataManager.unitManager.createInitialUnits(this.pixiLoader);
    }

    endTurn() {
        this.gameDataManager.unitManager.endTurn(this.pixiLoader);
    }
}