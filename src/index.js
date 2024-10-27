import './style.scss';

class NatureSoundsApp {
	constructor() {
		this.volumeControl = document.getElementById('volumeControl');
		this.soundButtons = document.querySelectorAll('.sound-button');
		this.currentSound = null;
		this.currentButton = null;

		this.initEventListeners();
	}

	initEventListeners() {
		this.volumeControl.addEventListener('input', () => this.handleVolumeChange());

		this.soundButtons.forEach((button) => {
			button.addEventListener('click', () => this.toggleSound(button));
		});
	}

	toggleSound(button) {
		const soundName = button.getAttribute('data-sound');

		if (this.isSoundPlaying(soundName)) {
			this.stopCurrentSound();
			this.updateButtonIcon(this.currentButton, soundName);
			return;
		}

		this.stopCurrentSound();
		this.startNewSound(soundName);
		this.updateUI(button, soundName);
	}

	isSoundPlaying(soundName) {
		return this.currentSound && this.currentSound.src.includes(soundName);
	}

	stopCurrentSound() {
		if (this.currentSound) {
			this.currentSound.pause();
			this.updateButtonIcon(
				this.currentButton,
				this.currentButton?.getAttribute('data-sound')
			);
		}
		this.currentSound = null;
		this.currentButton = null;
	}

	startNewSound(soundName) {
		this.currentSound = new Audio(`./assets/sounds/${soundName}.mp3`);
		this.currentSound.volume = parseFloat(this.volumeControl.value);
		this.currentSound.loop = true;
		this.currentSound.play();
	}

	updateUI(button, soundName) {
		document.getElementById('blur-background').style.backgroundImage =
			`url('./assets/images/${soundName}.jpg')`;
		this.updateButtonIcon(button, 'pause');
		this.currentButton = button;
	}

	updateButtonIcon(button, iconName) {
		if (button) {
			const img = button.querySelector('img');
			img.src = `./assets/icons/${iconName}.svg`;
		}
	}

	handleVolumeChange() {
		if (this.currentSound) {
			this.currentSound.volume = parseFloat(this.volumeControl.value);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new NatureSoundsApp();
});
