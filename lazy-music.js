(function (Scratch) {
  class MusicExtension {
    constructor() {
      this.sounds = Object.create(null);
      this.soundExample = {
        loaded: false,
        isPlaying: false,
        volume: 100,
      };
    }

    getInfo() {
      return {
        id: "qxscklazymusic",
        name: "音乐懒加载",
        blocks: [
          {
            opcode: "loadSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "从URL [URL] 加载音乐并命名为 [NAME]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "isSoundLoaded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "音乐 [NAME] 已加载？",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "playSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "播放音乐 [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "playSoundAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "播放音乐 [NAME] 并等待",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "stopSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "停止播放音乐 [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "stopAllSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: "停止播放所有音乐",
          },
          {
            opcode: "isPlayingSound",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "音乐 [NAME] 正在播放？",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "soundData",
            blockType: Scratch.BlockType.REPORTER,
            text: "音乐 [NAME] 的 [TYPE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "type.List",
              },
            },
          },
          {
            opcode: "soundURL",
            blockType: Scratch.BlockType.REPORTER,
            text: "音乐 [NAME] 的 URL",
            hideFromPalette: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "soundDuration",
            blockType: Scratch.BlockType.REPORTER,
            text: "音乐 [NAME] 的总长度",
            hideFromPalette: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "soundCurrentTime",
            blockType: Scratch.BlockType.REPORTER,
            text: "音乐 [NAME] 的当前播放进度",
            hideFromPalette: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "getSoundVolume",
            blockType: Scratch.BlockType.REPORTER,
            text: "音乐 [NAME] 的音量",
            hideFromPalette: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "setSoundVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置音乐 [NAME] 的音量为 [VOL] %",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              VOL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "setVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置所有音乐的音量为 [VOL] %",
            arguments: {
              VOL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "goSoundSeconds",
            blockType: Scratch.BlockType.COMMAND,
            text: "到达音乐 [NAME] 的第 [TIME] 秒",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              TIME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
        ],
        menus:{
          'type.List':[
            {
              text: 'URL',
              value: 'URL'
            },
            {
              text: '总长度',
              value: 'duration'
            },
            {
              text: '当前播放进度',
              value: 'currentTime'
            },
            {
              text: '音量',
              value: 'volume'
            },
          ],
        }
      };
    }

    ensureSoundLoaded(name) {
      return new Promise((resolve, reject) => {
        const sound = this.sounds[name];
        if (sound["loaded"]) {
          resolve();
        } else {
          const audio = sound["audio"];
          const onLoad = () => {
            audio.removeEventListener("canplay", onLoad);
            sound["loaded"] = true;
            resolve();
          };
          audio.addEventListener("canplay", onLoad);
        }
      });
    }

    isAudioFile(url){
      const type = [".mp3", ".wav", ".ogg"];
      const urlType = url.substr(url.lastIndexOf("."));
      return type.includes(urlType.toLowerCase());
    }
    
    loadSound(args) {
      let name = Scratch.Cast.toString(args.NAME),
        url = Scratch.Cast.toString(args.URL);
      if(!this.isAudioFile(url))
        return ;
      
      if(this.sounds[name]){
        const sound1 = this.sounds[name];
        sound1["audio"].pause();
            sound1["audio"].volume = 1;
            sound1["audio"].currentTime = 0;
      }
      this.sounds[name] = Object.assign({}, this.soundExample);
      const sound = this.sounds[name];
      sound["audio"] = new Audio(url);
      sound["audio"].addEventListener("canplay", () => {
        sound["loaded"] = true;
      });
      sound["audio"].volume = 0;
      sound["audio"]
        .play()
        .then(() => {
          sound["audio"].pause();
          sound["audio"].volume = 1;
          sound["audio"].currentTime = 0;
        })
        .catch((error) => {
          console.error("Auto play failed:", error);
        });
    }
    isSoundLoaded(args) {
      let name = Scratch.Cast.toString(args.NAME);
      return this.sounds[name] ? this.sounds[name]["loaded"] : false;
    }
    playSound(args) {
      try {
        let name = Scratch.Cast.toString(args.NAME);
        if (name in this.sounds) {
          const sound = this.sounds[name];
          if (sound["loaded"]) {
            sound["audio"].play();
            sound["isPlaying"] = true;
          } else {
            console.log("Sound not loaded yet");
          }
        }
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
    async playSoundAndWait(args) {
      try {
        let name = Scratch.Cast.toString(args.NAME);
        if (!(name in this.sounds)) {
          console.error("Sound not found:", name);
          return;
        }
        await this.ensureSoundLoaded(name);
        return new Promise((resolve, reject) => {
          const sound = this.sounds[name];
          const audio = sound["audio"];
          const onEnded = () => {
            audio.removeEventListener("ended", onEnded);
            sound["isPlaying"] = false;
            resolve();
          };
          audio.addEventListener("ended", onEnded);
          audio.play();
          sound["isPlaying"] = true;
        });
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
    stopSound(args) {
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if (sound && sound["audio"] && sound["isPlaying"]) {
        sound["audio"].pause();
        sound["audio"].currentTime = 0;
        sound["isPlaying"] = false;
      }
    }
    stopAllSounds() {
      Object.keys(this.sounds).forEach((name) => {
        const sound = this.sounds[name];
        if (sound["audio"] && sound["isPlaying"]) {
          sound["audio"].pause();
          sound["audio"].currentTime = 0;
          sound["isPlaying"] = false;
        }
      });
    }
    isPlayingSound(args) {
      let name = Scratch.Cast.toString(args.NAME);
      if (this.sounds[name] && this.sounds[name]["isPlaying"]) {
        return true;
      }
      return false;
    }
    soundData(args){
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if(args.TYPE==='URL'){
        if (sound) {
          return sound["audio"].src;
        } else {
          console.error("Sound not found:", name);
          return "";
        }
      }else if(args.TYPE==='duration'){
        if (sound && sound["audio"]) {
          return sound["audio"].duration;
        }
        return "0";
      }else if(args.TYPE==='currentTime'){
        if (sound && sound["audio"]) {
          return sound["audio"].currentTime;
        }
        return "0";
      }else if(args.TYPE==='volume'){
        if (sound && sound["audio"]) {
          return Scratch.Cast.toString(sound["audio"].volume * 100);
        }
        return "0";
      }
    }
    soundURL(args) {
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if (sound) {
        return sound["audio"].src;
      } else {
        console.error("Sound not found:", name);
        return "";
      }
    }
    soundDuration(args) {
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        return sound["audio"].duration;
      }
      return "0";
    }
    soundCurrentTime(args) {
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        return sound["audio"].currentTime;
      }
      return 0;
    }
    getSoundVolume(args) {
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        return sound["audio"].volume * 100;
      }
      return 0;
    }
    setSoundVolume(args) {
      let name = Scratch.Cast.toString(args.NAME);
      let volume = Math.min(100, Math.max(0, args.VOL));
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        sound["audio"].volume = volume / 100;
      }
    }
    setVolume(args) {
      let volume = Math.min(100, Math.max(0, args.VOL));
      Object.values(this.sounds).forEach((sound) => {
        if (sound["audio"]) {
          sound["audio"].volume = volume / 100;
        }
      });
    }
    goSoundSeconds(args) {
      let name = Scratch.Cast.toString(args.NAME);
      let time = Scratch.Cast.toNumber(args.TIME);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        const totalDuration = sound["audio"].duration;
        if (time > totalDuration) {
          sound["audio"].pause();
          sound["audio"].currentTime = 0;
          sound["isPlaying"] = false;
        } else {
          sound["audio"].currentTime = time;
        }
      }
    }
  }

  Scratch.extensions.register(new MusicExtension());
})(Scratch);
