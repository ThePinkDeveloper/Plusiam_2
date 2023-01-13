export class Constants {

	static GAMEOVER = 2;
	static GAMEON = 1;
	static MAINMENU = 0;

	static GAME_WIDTH = 412;
	static GAME_HEIGHT = 780;

	static BAR_INITIAL_WIDTH = 392;

    static BAR_NORMAL_COLOR= 'white';
    static BAR_WARNING_COLOR = 'yellow';
    static BAR_CRITICAL_COLOR = 'red';
    
	static INITIAL_TIME = 10000;

	static SOUND_ENABLED = false;

	static SOUNDS_CONTAINER = new Map();

	static loadSounds() {
		const soundsListNames = ['end-game', 'first-warning', 'match', 'second-warning', 'select', 'unselect'];
		soundsListNames.forEach( soundName => {
			Constants.SOUNDS_CONTAINER.set(soundName, new Audio(`../../assets/sounds/${soundName}.ogg`));
		});
		Constants.SOUNDS_CONTAINER.set('select2', new Audio(`../../assets/sounds/select.ogg`));
		Constants.SOUNDS_CONTAINER.set('unselect2', new Audio(`../../assets/sounds/unselect.ogg`));
	}

	static playSound(soundName) {
		if (Constants.SOUND_ENABLED) {
			if (!Constants.SOUNDS_CONTAINER.get(soundName).paused && (soundName === 'select' || soundName === 'unselect')) {
				Constants.SOUNDS_CONTAINER.get(soundName + '2').play();
			} else {
				Constants.SOUNDS_CONTAINER.get(soundName).play();
			}
		}
	}

}