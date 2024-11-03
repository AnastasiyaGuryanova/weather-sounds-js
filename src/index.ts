import './style.scss';

interface AppConfig {
	volumeControl: HTMLInputElement;
	soundButtons: NodeListOf<HTMLButtonElement>;
}

interface SoundControl {
	currentSound: HTMLAudioElement | null;
	currentButton: HTMLButtonElement | null;
}

class NatureSoundsApp implements AppConfig, SoundControl {
	volumeControl: HTMLInputElement;
	soundButtons: NodeListOf<HTMLButtonElement>;
	currentSound: HTMLAudioElement | null;
	currentButton: HTMLButtonElement | null;

	constructor() {
		this.volumeControl = document.getElementById('volumeControl') as HTMLInputElement;
		this.soundButtons = document.querySelectorAll(
			'.sound-button'
		) as NodeListOf<HTMLButtonElement>;
		this.currentSound = null;
		this.currentButton = null;

		this.initEventListeners();
	}

	private initEventListeners(): void {
		this.volumeControl.addEventListener('input', () => this.handleVolumeChange());

		this.soundButtons.forEach((button) => {
			button.addEventListener('click', () => this.toggleSound(button));
		});
	}

	private toggleSound(button: HTMLButtonElement): void {
		const soundName = button.getAttribute('data-sound') || '';

		if (this.isSoundPlaying(soundName)) {
			this.stopCurrentSound();
			this.updateButtonIcon(this.currentButton, soundName);
			return;
		}

		this.stopCurrentSound();
		this.startNewSound(soundName);
		this.updateUI(button, soundName);
	}

	private isSoundPlaying(soundName: string): boolean {
		return this.currentSound !== null && this.currentSound.src.includes(soundName);
	}

	private stopCurrentSound(): void {
		if (this.currentSound) {
			this.currentSound.pause();
			this.updateButtonIcon(
				this.currentButton,
				this.currentButton?.getAttribute('data-sound') || ''
			);
		}
		this.currentSound = null;
		this.currentButton = null;
	}

	private startNewSound(soundName: string): void {
		this.currentSound = new Audio(`./assets/sounds/${soundName}.mp3`);
		this.currentSound.volume = parseFloat(this.volumeControl.value);
		this.currentSound.loop = true;
		this.currentSound.play();
	}

	private updateUI(button: HTMLButtonElement, soundName: string): void {
		const background = document.getElementById('blur-background');
		if (background) {
			background.style.backgroundImage = `url('./assets/images/${soundName}.jpg')`;
		}
		this.updateButtonIcon(button, 'pause');
		this.currentButton = button;
	}

	private updateButtonIcon(button: HTMLButtonElement | null, iconName: string): void {
		if (button) {
			const img = button.querySelector('img');
			if (img) {
				img.src = `./assets/icons/${iconName}.svg`;
			}
		}
	}

	private handleVolumeChange(): void {
		if (this.currentSound) {
			this.currentSound.volume = parseFloat(this.volumeControl.value);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new NatureSoundsApp();
});
