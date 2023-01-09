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

	static playSound(soundName) {
		if (Constants.SOUND_ENABLED) {
			new Audio(`../../assets/sounds/${soundName}.ogg`).play();

		}
	}

}