export const getAudioDuration = (data:any) => {
    data.forEach((element:any) => {
    let audio = new Audio(element.source);
    audio.addEventListener("loadedmetadata", () => {
    const hours = Math.floor(audio.duration / 3600);
    const minutes = Math.floor((audio.duration - (hours * 3600)) / 60);
    const seconds = Math.floor(audio.duration - (hours * 3600) - (minutes * 60));
    element.duration = hours ? hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') : minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    });
});

return data;
}
  