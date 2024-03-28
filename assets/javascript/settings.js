class Settings {
  videoElement: HTMLVideoElement | null = null;
  audioElement: HTMLAudioElement | null = null;
  musicVolume: number = 0.9;
  descriptionTexts: string[] = ['.zay', '0z'];
}

const settingsInstance = new Settings();
