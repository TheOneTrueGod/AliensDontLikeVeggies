export const SpriteList = {
    CROPSHEET: 'cropsheet',
    TERRAIN: 'terrain',
};

export default class AssetLoader {
    static preLoad(pixiLoader, loadComplete) {
        pixiLoader
            // sprites
            .add(SpriteList.CROPSHEET, '/assets/crops.png')
            .add(SpriteList.TERRAIN, '/assets/terrain.png')
            ;

        pixiLoader.onComplete.add(() => { 
            loadComplete()
        });
        
        pixiLoader.load();
    }
}