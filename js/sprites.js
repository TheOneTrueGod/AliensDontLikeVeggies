export const SpriteList = {
    CROPSHEET: 'cropsheet',
    ALIEN_ADULT: 'alien_adult',
    ALIEN_YOUNG: 'alien_young',
    ALIEN_EGG: 'alien_egg',
    TERRAIN: 'terrain',
};

export default class AssetLoader {
    static preLoad(pixiLoader, loadComplete) {
        pixiLoader
            // spritesheets
            .add(SpriteList.CROPSHEET, '/assets/crops.png')
            .add(SpriteList.TERRAIN, '/assets/terrain.png')
            // individual sprites
            .add(SpriteList.ALIEN_ADULT, '/assets/AlienAdult.png')
            .add(SpriteList.ALIEN_YOUNG, '/assets/AlienYoung.png')
            .add(SpriteList.ALIEN_EGG, '/assets/AlienEgg.png')
            ;

        pixiLoader.onComplete.add(() => { 
            loadComplete()
        });
        
        pixiLoader.load();
    }
}