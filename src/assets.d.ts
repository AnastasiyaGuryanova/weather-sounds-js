declare module '*.jpg';
declare module '*.mp3';
declare module '*.svg' {
	const content: string;
	export default content;
}
