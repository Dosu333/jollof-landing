import { defineStore } from 'pinia'

// import * as Vibrant from 'node-vibrant'

export const useAudioplayerStore = defineStore('audioplayer', {
  state: () => ({
    audioplayer: new Audio(),
    audioType: '',
    trackList: [
      {
        id: 0,
        title: '',
        source: '',
        logo: '',
        link: '',
        creator: null,
        podcast_id: 0
      }
    ],
    currentTrack: {
      id: 0,
      podcast_id: 0,
      title: '',
      source: '',
      logo: '',
      link: '',
      creator: null
    },
    currentTrackId: 0,
    currentTrackIndex: 0,
    currentDuration: 0,

    mobilePlayer: false,
    playerIsUp: false,
    playerIsWaiting: false,
    isPlaying: false,

    options: false,

    playRandom: false,
    playRepeat: 'off',
    ended: false,

    volume: 100,
    muted: false,
    timer: 0,

    podcastName: ''
  }),
  getters: {
    currentPlayingId(): any {
      return (this.currentTrackId = this.currentTrack.id)
    }
  },
  actions: {
    setBackgroundColor() {
      // console.log(this.currentTrack.logo);
      // Create an image object
      const image = new Image()
      image.crossOrigin = 'anonymous' // Enable CORS if you're accessing images from different domains

      // Set the source of the image
      image.src = this.currentTrack.logo + '?r=' + Math.random() * 1234
      console.log(image.src)

      // Wait for the image to load
      image.onload = function () {
        // Create a canvas element
        const canvas: any = document.createElement('canvas')
        const context: any = canvas.getContext('2d')

        // Set the size of the canvas based on the image dimensions
        canvas.width = image.width
        canvas.height = image.height

        // Draw the image onto the canvas
        context.drawImage(image, 0, 0)

        // Get the image data
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Count the occurrences of each RGB color
        const colorCounts: any = {}

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const rgb = r + ',' + g + ',' + b

          if (rgb in colorCounts) {
            colorCounts[rgb] += 1
          } else {
            colorCounts[rgb] = 1
          }
        }

        // Find the most occurring color
        const dominantColor = Object.keys(colorCounts).reduce(function (a, b) {
          return colorCounts[a] > colorCounts[b] ? a : b
        })

        const dominantGrid = []
        for (const color in colorCounts) {
          dominantGrid.push({
            color: color,
            count: colorCounts[color]
          })
        }

        dominantGrid.sort(function (a, b) {
          return b.count - a.count
        })

        // Create a gradient using the dominant colors
        let gradient = 'linear-gradient(to right, '
        for (let i = 0; i < 4; i++) {
          gradient += 'rgb(' + dominantGrid[i].color + ') '
          gradient += ((i + 1) / dominantGrid.length) * 100 + '%, '
        }
        gradient = gradient.slice(0, -2) + ')'

        // console.log(gradient);

        // Output the dominant color
        // console.log("Dominant Color: rgb(" + dominantColor + ")");
      }
    },
    loadTrack() {
      this.currentDuration = 0

      // setting the new source
      this.audioplayer.src =
        this.audioType === 'episode'
          ? this.trackList[this.currentTrackIndex].source
          : this.trackList[this.currentTrackIndex].link

      // setting the station link key into source
      this.currentTrack = this.trackList[this.currentTrackIndex]
      this.currentTrack.source =
        this.audioType === 'episode'
          ? this.trackList[this.currentTrackIndex].source
          : this.trackList[this.currentTrackIndex].link

      this.currentTrackId = this.trackList[this.currentTrackIndex].id
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.currentTrack.title,
        artist: 'Jollof Radio',
        album: this.currentTrack.creator ? 'podcast' : 'station',
        artwork: [
          {
            src: this.currentTrack.logo
          }
        ]
      })
      this.timer = 0
      // Promise

      // this.setBackgroundColor()
    },
    playPauseTrack(isShared: boolean = false) {
      if (
        this.audioplayer.src !== this.trackList[this.currentTrackIndex].source &&
        this.audioplayer.src !== this.trackList[this.currentTrackIndex].link
      ) {
        this.loadTrack()
        if (!isShared) {
          this.isPlaying = true
          this.audioplayer.play()
        } else {
          this.mobilePlayer = true
        }
      } else {
        if (this.audioplayer.paused) {
          this.isPlaying = true
          this.audioplayer.play()
        } else if (!this.audioplayer.paused) {
          this.isPlaying = false
          this.audioplayer.pause()
        }
      }
      this.playerIsUp = true
    },
    nextByBot() {
      this.currentDuration = 0
      if (this.currentTrackIndex < this.trackList.length - 1 && this.playRepeat == 'once') {
        this.isPlaying = true
        this.audioplayer.play()
      } else if (this.currentTrackIndex >= this.trackList.length - 1 && this.playRepeat == 'all') {
        this.currentTrackIndex = this.playRandom
          ? Math.round(Math.random() * this.trackList.length)
          : 0
        this.loadTrack()
        this.isPlaying = true
        this.audioplayer.play()
      } else if (this.currentTrackIndex < this.trackList.length - 1 && this.playRepeat == 'all') {
        this.currentTrackIndex = this.playRandom
          ? Math.round(Math.random() * this.trackList.length)
          : this.currentTrackIndex + 1
        this.loadTrack()
        this.isPlaying = true
        this.audioplayer.play()
      } else if (this.currentTrackIndex < this.trackList.length - 1 && this.playRepeat == 'off') {
        this.currentTrackIndex = this.playRandom
          ? Math.round(Math.random() * this.trackList.length)
          : 0
        this.loadTrack()
        this.isPlaying = true
        this.audioplayer.play()
      } else if (this.currentTrackIndex >= this.trackList.length - 1 && this.playRepeat == 'off') {
        this.isPlaying = false
        this.audioplayer.pause()
      }
    },
    nextTrack() {
      this.currentDuration = 0
      if (this.currentTrackIndex < this.trackList.length - 1) {
        this.currentTrackIndex = this.playRandom
          ? Math.round(Math.random() * this.trackList.length)
          : this.currentTrackIndex + 1

        this.loadTrack()
        this.isPlaying = true
        this.audioplayer.play()
      } else {
        this.currentTrackIndex = 0
        this.loadTrack()
        this.isPlaying = true
        this.audioplayer.play()
      }
    },
    previousTrack() {
      this.currentDuration = 0
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex = this.currentTrackIndex - 1
        this.loadTrack()
        this.isPlaying = true
        this.audioplayer.play()
      } else {
        this.currentTrackIndex = this.playRandom
          ? Math.round(Math.random() * this.trackList.length)
          : this.trackList.length - 1
        this.loadTrack()
        this.isPlaying = true
        this.audioplayer.play()
      }
    },
    setPlayerDuration(): any {
      return (this.audioplayer.currentTime =
        this.audioplayer.duration * (this.currentDuration / 100))
    },
    setVolume(): any {
      this.audioplayer.volume = this.volume / 100
    },
    setMute(): any {
      this.muted = !this.muted
      this.audioplayer.muted = this.muted
    },
    closePlayer() {
      this.isPlaying = false
      this.audioplayer.pause()
      this.playerIsUp = false
    }
  }
})
