const Icon = "data:image/png;base64,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";

class enhance {
  getInfo() {
    return {
      id: 'enhance',
      name: '项目增强',
      color1: '#2EBCFA',
      blockIconURI: Icon,
      menuIconURI: Icon,
      blocks: [
        {
          opcode: "setFramerate",
          blockType: Scratch.BlockType.COMMAND,
          text: "以每秒 [FRAMERATE] 帧运行",
          arguments: {
            FRAMERATE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 30
            }
          }
        },
        {
          opcode: "infiniteClones",
          blockType: Scratch.BlockType.COMMAND,
          text: "克隆体上限 [MAXCLONES]",
          arguments: {
            MAXCLONES: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 300
            }
          }
        },
        {
          opcode: "removeFence",
          blockType: Scratch.BlockType.COMMAND,
          text: "[ENABLEFENCE] 角色围栏",
          arguments: {
            ENABLEFENCE: {
              type: Scratch.ArgumentType.NUMBER,
              menu: "ENABLE_TYPE",
              defaultValue: 1
            }
          }
        }
      ],
      menus: {
        ENABLE_TYPE: [
          {
            text: "启用",
            value: 1
          },
          {
            text: "禁用",
            value: 0
          }
        ]
      }
    };
  }

  infiniteClones(args) {
    Scratch.vm.setRuntimeOptions({
      maxClones: Scratch.Cast.toNumber(args.MAXCLONES)
    });
  }
  removeFence(args) {
    Scratch.vm.setRuntimeOptions({
      fencing: Scratch.Cast.toBoolean(args.ENABLEFENCE)
    });
  }
  setFramerate(args) {
    Scratch.vm.setFramerate(
      Scratch.Cast.toNumber(args.FRAMERATE)
    );
  }
}

Scratch.extensions.register(new enhance());
