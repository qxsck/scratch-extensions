(function (Scratch) {
  "use strict";

  const hackFun = (runtime) => {
    if (!runtime || hackFun.hacked) return;
    hackFun.hacked = true;

    // By Nights: 支持XML的BlockType
    if (!Scratch.BlockType.XML) {
      Scratch.BlockType.XML = 'XML';
      const origFun = runtime._convertForScratchBlocks;
      runtime._convertForScratchBlocks = function (blockInfo, categoryInfo) {
        if (blockInfo.blockType === Scratch.BlockType.XML) {
          return {
            info: blockInfo,
            xml: blockInfo.xml,
          };
        }
        return origFun.call(this, blockInfo, categoryInfo);
      };
    }
  };

  const PICTRUE = {
    plus: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNzFjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MWMwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==",
    minus:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAwIDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K",
  };

  let expandableBlockInit = false;
  const setExpandableBlocks = ((runtime, extension) => {
    if (expandableBlockInit) return;
    expandableBlockInit = true;
    // 在编辑器获取scratchBlocks与获取VM的方法来自https://github.com/FurryR/lpp-scratch
    const hijack = (fn) => {
      const _orig = Function.prototype.apply;
      Function.prototype.apply = (thisArg) => thisArg;
      const result = fn();
      Function.prototype.apply = _orig;
      return result;
    };
    const getScratch = (runtime) => {
      function getEvent(e) {
        return e instanceof Array ? e[e.length - 1] : e;
      }
      const vm =
        hijack(getEvent(runtime._events["QUESTION"])).props.vm;
      const scratchBlocks =
        hijack(getEvent(vm._events["EXTENSION_ADDED"]))
          ?.ScratchBlocks;
      return {
        scratchBlocks: scratchBlocks,
        vm: vm,
      };
    };
    // 创建按钮
    const createButtons = (Blockly) => {
      // 按钮
      class FieldButton extends Blockly.FieldImage {
        constructor(src) {
          super(src, 25, 25, undefined, false);
          this.initialized = false;
        }
        init() {
          // Field has already been initialized once.
          super.init();
          if (!this.initialized) {
            // 初始化按钮
            Blockly.bindEventWithChecks_(
              this.getSvgRoot(),
              "mousedown",
              this,
              (e) => {
                e.stopPropagation();
                // 阻止事件冒泡，要不然你点按钮就会执行积木（点击积木）
              }
            );
            Blockly.bindEventWithChecks_(
              this.getSvgRoot(),
              "mouseup",
              this,
              this.handleClick.bind(this)
            );
            // 绑定上这个按钮点击事件
          }
          this.initialized = true;
        }
        handleClick(e) {
          if (!this.sourceBlock_ || !this.sourceBlock_.workspace) {
            return false;
          }
          if (this.sourceBlock_.workspace.isDragging()) {
            return false;
          }
          if (this.sourceBlock_.isInFlyout) {
            return false;
          }
          this.onclick(e);
        }
        onclick(e) {
          // 子类实现
        }
      }
      // + 按钮
      class PlusButton extends FieldButton {
        constructor() {
          super(plusImage);
        }
        onclick() {
          const block = this.sourceBlock_;
          // 增加积木数量改变
          block.itemCount_ += 1;
          block.updateShape(); // 更新
        }
      }
      // - 按钮
      class MinusButton extends FieldButton {
        constructor() {
          super(minusImage);
        }
        onclick() {
          // 获取这个 field 的积木
          const block = this.sourceBlock_;
          // 增加积木数量改变
          block.itemCount_ -= 1;
          if (block.itemCount_ < 0) {
            // 不能有 -1 个参数
            block.itemCount_ = 0;
          }
          block.updateShape(); // 更新
        }
      }
      // 图片
      const minusImage = PICTRUE.minus;
      const plusImage = PICTRUE.plus;

      return {
        PlusButton,
        MinusButton,
      };
    };

    const createExpandableBlock = (runtime, Blockly) => {
      const { PlusButton, MinusButton } = createButtons(Blockly);
      // 这个是scratch函数的utils
      const ProcedureUtils = Blockly.ScratchBlocks.ProcedureUtils;

      return {
        attachShadow_: function (input, argumentType, text) {
          if (argumentType == "number" || argumentType == "string") {
            let blockType = argumentType == "number" ? "math_number" : "text";
            Blockly.Events.disable();
            let newBlock;
            try {
              newBlock = this.workspace.newBlock(blockType);
              if (argumentType == "number") {
                newBlock.setFieldValue(Scratch.Cast.toString(text), "NUM");
              } else if (argumentType == "string") {
                newBlock.setFieldValue(Scratch.Cast.toString(text), "TEXT");
              }
              newBlock.setShadow(true);
              if (!this.isInsertionMarker()) {
                newBlock.initSvg();
                newBlock.render(false);
              }
            } finally {
              Blockly.Events.enable();
            }
            if (Blockly.Events.isEnabled()) {
              Blockly.Events.fire(new Blockly.Events.BlockCreate(newBlock));
            }
            newBlock.outputConnection.connect(input.connection);
          }
        },
        updateShape: function () {
          let wasRendered = this.rendered;
          this.rendered = false;

          this.oldItemCount=this.itemCount_;
          // 更新参数
          Blockly.Events.setGroup(true);
          // 先记录现在的 mutation
          let oldExtraState = Blockly.Xml.domToText(this.mutationToDom(this));

          // 创建新的积木
          let opcode_ = this.opcode_,
            expandableArgs = this.expandableArgs,
            inputKeys = Object.keys(expandableArgs),
            i;
          for (i = 1; i <= this.itemCount_; i++) {
            if (!this.getInput(`${inputKeys[0]}_${i}`)) {
              for (let j = 0; j < inputKeys.length; j++) {
                let inputKey = inputKeys[j],
                  inputKeyID = `${inputKey}_${i}`;

                this.ARGS.push(inputKeyID);
                let input,
                  type = expandableArgs[inputKey][0],
                  text = expandableArgs[inputKey][1] || null,
                  canEndInput = expandableArgs[inputKey][2] || 0;

                input =
                  // type === "substack"
                  //   ? this.appendStatementInput(inputKeyID)
                  //   :
                    type === "list" || type === "text"
                      ? this.appendDummyInput(inputKeyID)
                      : this.appendValueInput(inputKeyID);
                if (type === "text") {
                  input.appendField('text');
                } else if (type === "boolean") {
                  input.setCheck("Boolean");
                } else if (type === "list") {
                  input.appendField(
                    new Blockly.FieldDropdown(text),
                    inputKeyID
                  );
                  const fields = runtime
                    .getEditingTarget()
                    ?.blocks.getBlock(this.id)?.fields;
                  if (fields) {
                    fields[inputKeyID] = {
                      id: null,
                      name: inputKeyID,
                      value: "+",
                    };
                  }
                  this.moveInputBefore(inputKeyID, "END");
                // } else if (type === "substack") {
                //   input.setCheck(null);
                } else {
                  this.attachShadow_(
                    input,
                    type,
                    text
                  );
                }

              }
            }
          }
          if (runtime._editingTarget) {
            // 移除 input 并记录

            // if (this.getInput('SUBSTACK')) {
            //   try {
            //     const blocks = runtime._editingTarget.blocks;
            //     const targetBlock = blocks.getBlock(this.id);
            //     const input = targetBlock.inputs['SUBSTACK'];
            //     if (input) {
            //       if (input.block !== null) {
            //         const blockInInput = targetBlock.getBlock(input.block);
            //         blockInInput.topLevel = true;
            //         blockInInput.parent = null;
            //         blocks.moveBlock({
            //           id: blockInInput.id,
            //           oldParent: this.id,
            //           oldInput: 'SUBSTACK',
            //           newParent: undefined,
            //           newInput: undefined,
            //         });
            //       }
            //       if (input.shadow !== null && input.shadow == input.block) {
            //         blocks.deleteBlock(input.shadow);
            //       }
            //     }
            //     this.removeInput('SUBSTACK');
            //     delete targetBlock.inputs['SUBSTACK'];
            //   } catch {
            //     // nothing
            //   }
            // }

            // if (this.getInput('SUBSTACK')) {
            //   try {
            //     const blocks = runtime._editingTarget.blocks;
            //     const targetBlock = blocks.getBlock(this.id);
            //     const input = targetBlock.inputs['SUBSTACK'];
            //     if (input) {
            //       if (input.block !== null) {
            //         const blockInInput = targetBlock.getBlock(input.block);
            //         blockInInput.topLevel = true;
            //         blockInInput.parent = null;
            //         blocks.moveBlock({
            //           id: blockInInput.id,
            //           oldParent: this.id,
            //           oldInput: 'SUBSTACK',
            //           newParent: undefined,
            //           newInput: undefined,
            //         });
            //       }
            //       if (input.shadow !== null && input.shadow == input.block) {
            //         blocks.deleteBlock(input.shadow);
            //       }
            //     }
            //     this.removeInput('SUBSTACK');
            //     delete targetBlock.inputs['SUBSTACK'];
            //   } catch {
            //     // nothing
            //   }
            // }

            let iTemp = i;
            for (let j = 0; j < inputKeys.length; j++) {
              i = iTemp;
              const blocks = runtime._editingTarget.blocks;
              const targetBlock = blocks.getBlock(this.id);
              const toDel = [];
              let inputKey = inputKeys[j],
                type = expandableArgs[inputKey][0],
                inputKeyID = `${inputKey}_${i}`;
              while (this.getInput(inputKeyID)) {
                this.ARGS.pop(inputKeyID);
                const input = targetBlock.inputs[inputKeyID];
                if (input) {
                  if (input.block !== null) {
                    const blockInInput = blocks.getBlock(input.block);
                    blockInInput.topLevel = true;
                    blockInInput.parent = null;
                    blocks.moveBlock({
                      id: blockInInput.id,
                      oldParent: this.id,
                      oldInput: inputKeyID,
                      newParent: undefined,
                      newInput: undefined,
                      //newCoordinate: e.newCoordinate
                    });
                  }
                  if (input.shadow !== null) {
                    if (input.shadow == input.block) blocks.deleteBlock(input.shadow);
                    else blocks.deleteBlock(input.block);
                  }
                }
                this.removeInput(inputKeyID);
                if (type === "list") {
                  const fields = runtime
                    .getEditingTarget()
                    ?.blocks.getBlock(this.id)?.fields;
                  if (fields) {
                    delete fields[inputKeyID];
                  }
                } else {
                  toDel.push(inputKeyID);
                }
                i++;
              }
              setTimeout(() => {
                toDel.forEach((i) => {
                  delete targetBlock.inputs[i];
                });
              }, 0);
            }
          }

          // 移动按钮
          this.removeInput("BEGIN");
          if (this.itemCount_ > 0) {
            this.appendDummyInput("BEGIN").appendField(this.textBegin);
            this.moveInputBefore("BEGIN", "BEGIN");
          }

          const getArg = (str) => {
            let str_ = str.match(/^[A-Z0-9]+/);
            if (Array.isArray(str_)) {
              str_ = str_[0];
              let num_ = Number(str.replace(str_ + '_', ''));
              return [str_, isNaN(num_) ? 1 : num_];
            } else {
              return false;
            }
          };
          //console.log(this.inputList)
          let inputList = this.inputList;
          for (i = 0; i < inputList.length; i++) {
            let name = inputList[i].name,
              args = getArg(name);
            if (
              args === false &&
              this.defaultText &&
              Array.isArray(this.defaultText) &&
              i === this.defaultIndex
            ) {
              if (this.inputList[i].fieldRow.length !== 0) {
                this.inputList[this.defaultIndex].fieldRow[0].setText(
                  (this.itemCount_ === 0 ? this.defaultText[0] : this.defaultText[1]),
                );
              }
            } else {
              if (expandableArgs[args[0]]) {
                let arg = expandableArgs[args[0]],
                  type = arg[0],
                  text = arg[1],
                  rule = arg[2] || 0;
                if (this.inputList[i].fieldRow.length !== 0) {
                  if (type === 'text') {
                    if (rule === 1) {
                      if (Array.isArray(text)) {
                        this.inputList[i].fieldRow[0].setText(args[1] === 1 ? text[0] : text[1]);
                      } else this.inputList[i].fieldRow[0].setText(text);
                    } else {
                      let flag1 = (args[1] !== 1 && args[1] !== this.itemCount_),
                        index = inputKeys.indexOf(args[0]),
                        flag2 = index > 0 && index < (inputKeys.length - 1),
                        flag3 = args[1] > 1 || index > 0,
                        flag4 = args[1] < this.itemCount_ || (index < inputKeys.length - 1);
                      if (flag1 || flag2 || flag3 && flag4) {
                        this.inputList[i].fieldRow[0].setText(text);
                        this.inputList[i].setVisible(true);
                      } else {
                        this.inputList[i].fieldRow[0].setText('');
                        this.inputList[i].setVisible(false);
                      }
                    }
                  }
                }
              }
            }
          }
          for (i = 1; i <= this.itemCount_; i++) {
            for (let j = 0; j < inputKeys.length; j++) {
              this.moveInputBefore(`${inputKeys[j]}_${i}`, null);
            }
          }
          this.removeInput("END");
          if (this.itemCount_ > 0) {
            this.appendDummyInput("END").appendField(this.textEnd);
            this.moveInputBefore("END", null);
          }
          this.removeInput("MINUS");
          if (this.itemCount_ > 0) {
            this.minusButton = new MinusButton();
            this.appendDummyInput("MINUS").appendField(this.minusButton);
            this.moveInputBefore("MINUS", null);
          }
          this.moveInputBefore("PLUS", null);

          // 更新 oldItemCount，oldItemCount用于生成domMutation的
          this.oldItemCount = this.itemCount_;
          // 新的 mutation
          const newExtraState = Blockly.Xml.domToText(this.mutationToDom(this));
          if (oldExtraState != newExtraState) {
            // 判断是否一样，不一样就fire一个mutation更新事件
            Blockly.Events.fire(
              new Blockly.Events.BlockChange(
                this,
                "mutation",
                null,
                oldExtraState,
                newExtraState // 状态
              )
            );
            setTimeout(() => {
              const target = runtime._editingTarget;
              const block = target.blocks._blocks[this.id];
              try {
                Object.keys(block.inputs).forEach((name) => {
                  let argName = name.match(/^[A-Z0-9]+/)[0];
                  if (!this.ARGS.includes(name) && this.expandableArgs[argName] && this.expandableArgs[argName][0] !== 'text') {
                    target.blocks.deleteBlock(block.inputs[name].shadow, {
                      source: "default",
                      targetId: target.id,
                    });
                    delete block.inputs[name];
                    if (runtime.emitTargetBlocksChanged) {
                      runtime.emitTargetBlocksChanged(target.id, [
                        "deleteInput",
                        { id: block.id, inputName: name },
                      ]);
                    }
                  }
                });
              } catch {
                // nothing
              }
            }, 0);
          }
          Blockly.Events.setGroup(false);

          this.rendered = wasRendered;
          if (wasRendered && !this.isInsertionMarker()) {
            this.initSvg();
            this.render();
          }
        },
        mutationToDom: function () {
          // 可以保存别的数据，会保存到sb3中，oldItemCount就是有多少个参数
          const container = document.createElement("mutation");
          container.setAttribute("items", `${this.oldItemCount}`);
          return container;
        },
        domToMutation: function (xmlElement) {
          // 读取 mutationToDom 保存的数据
          this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 0);
          this.updateShape(); // 读了之后更新
        },
        init: function (type) {
          // 积木初始化
          //this.inputList=[];
          this.itemCount_ = 0;
          this.oldItemCount = this.itemCount_;
          this.opcode_ = type.opcode;
          this.expandableBlock = type.expandableBlock;
          this.expandableArgs = this.expandableBlock.expandableArgs;
          this.textBegin = this.expandableBlock.textBegin;
          this.textEnd = this.expandableBlock.textEnd;
          this.defaultIndex = this.expandableBlock.defaultIndex || 0;
          this.defaultText = this.expandableBlock.defaultText;
          this.plusButton = new PlusButton();
          this.ARGS = [];

          if (this.removeInput) this.removeInput("PLUS");
          this.appendDummyInput("PLUS").appendField(this.plusButton);
          if (this.moveInputBefore) this.moveInputBefore("PLUS", null);
        }
      };
    };
    const { id, blocks: blocksInfo } = extension.getInfo();
    let expandableBlocks = {};
    blocksInfo.forEach((block) => {
      if (block.expandableBlock) expandableBlocks[`${id}_${block.opcode}`] = {
        opcode: block.opcode,
        expandableBlock: block.expandableBlock,
      };
    });
    const { scratchBlocks } = getScratch(runtime);
    if (!scratchBlocks) return;
    const expandableAttr = createExpandableBlock(runtime, scratchBlocks);
    scratchBlocks.Blocks = new Proxy(scratchBlocks.Blocks, {
      set(target, property, value) {
        // 设置
        if (expandableBlocks[property]) {
          Object.keys(expandableAttr).forEach((key) => {
            if (key != "init") {
              // 除了init设置
              value[key] = expandableAttr[key];
            }
          });
          const orgInit = value.init;
          value.init = function () {
            // 先用原本的init
            orgInit.call(this);
            // init expandable
            expandableAttr.init.call(this, expandableBlocks[property]);
          };
        }
        return Reflect.set(target, property, value);
      },
    });
  });

  class ExpandableBlocksExample {
    constructor(runtime) {
      this.runtime = runtime ?? Scratch?.vm?.runtime;
      if (!this.runtime) return;

      hackFun(runtime);

      // 注册可拓展积木
      setExpandableBlocks(
        this.runtime,
        this
      );
    }

    getInfo() {
      return {
        id: 'sb',
        name: "expandable blocks's example",
        color1: "#53aae7",
        color2: "#53aae7",
        blocks: [
          {
            opcode: "connect",
            blockType: Scratch.BlockType.REPORTER,
            text: "connect ",
            disableMonitor: true,
            arguments: {},
            expandableBlock: {
              expandableArgs: {
                'TEXT': ['text', ',', 0],
                'ADD': ['string', 'text'],
              },
              defaultText: ['connect', 'connect'],
              textBegin: '',
              textEnd: ''
            },
          },
          {
            opcode: "arit",
            blockType: Scratch.BlockType.REPORTER,
            text: "[DEFAULT] [OPER] [DEFAULT2] ",
            disableMonitor: true,
            arguments: {
              DEFAULT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "arit.List",
              },
              DEFAULT2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2",
              },
            },
            expandableBlock: {
              expandableArgs: {
                'OPER': [
                  'list',
                  [
                    ["+", "+"],
                    ["-", "-"],
                    ["*", "*"],
                    ["/", "/"],
                    ["**", "**"],
                    ["//", "//"],
                    ["%", "%"],
                  ]
                ],
                'ADD': ['string', '1'],
              },
              textBegin: '',
              textEnd: ''
            },
          },
          {
            opcode: "array",
            blockType: Scratch.BlockType.REPORTER,
            text: "empty array",
            disableMonitor: true,
            arguments: {},
            expandableBlock: {
              expandableArgs: {
                'VAL': ['string', 'value'],
                'TEXT': ['text', ',', 0],
              },
              defaultText: ['empty array', 'array '],
              textBegin: '[',
              textEnd: ']'
            }

          },
          {
            opcode: "object",
            blockType: Scratch.BlockType.REPORTER,
            text: "empty object",
            disableMonitor: true,
            arguments: {},
            expandableBlock: {
              expandableArgs: {
                'KEY': ['string', 'key'],
                'TEXT': ['text', ':', 1],
                'VAL': ['string', 'value'],
                'TEXT2': ['text', ',', 0],
              },
              defaultText: ['empty object', 'object '],
              textBegin: '{',
              textEnd: '}'
            }

          },
          {
            opcode: "broadcastWithData",
            blockType: Scratch.BlockType.COMMAND,
            text: "broadcast [BROADCAST_OPTION] with empty data",
            arguments: {
              BROADCAST_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "broadcast",
              },
            },
            expandableBlock: {
              expandableArgs: {
                'DATA': ['string', 'data'],
                'TEXT': ['text', ':', 1],
                'VAL': ['string', 'value'],
                'TEXT2': ['text', ',', 0],
              },
              defaultIndex: 1,
              defaultText: ['with empty data', 'with data:'],
              textBegin: '',
              textEnd: ''
            }

          },
          {
            opcode: "receivedData",
            blockType: Scratch.BlockType.REPORTER,
            allowDropAnywhere: true,
            disableMonitor: true,
            text: "received data",
          },
          // {
          //   opcode: "if",
          //   blockType: Scratch.BlockType.CONDITIONAL,
          //   text: "if",
          //   branchCount: 0,
          //   expandableBlock: {
          //     expandableArgs: {
          //       'IF': ['text', ['', 'else if'], 1],
          //       'BOOL': ['boolean'],
          //       'SUBSTACK': ['substack'],
          //     },
          //     textBegin: '',
          //     textEnd: ''
          //   }
          // },
        ],
        menus: {
          "arit.List": {
            items: ["+", "-", "*", "/", "**", "//", "%"],
          },
        },
      };
    }

    _broadcast(name, data, util) {
      if (!name) return [];
      let startedThreads = [];
      startedThreads = [
        ...util.startHats("event_whenbroadcastreceived", {
          BROADCAST_OPTION: name,
        }),
      ];
      if (data)
        startedThreads.forEach((thread) => (thread.receivedData = data));
      return startedThreads;
    }
    toNum(val) {
      return isNaN(Number(val)) ? 0 : Number(val);
    }

    connect(args) {
      let string = '',
        i = 1;
      while (args[`ADD_${i}`]) {
        string += String(args[`ADD_${i}`]);
        i++;
      }
      return string;
    }
    arit(args) {
      let operList = [],
        num = this.toNum(args.DEFAULT),
        num2,
        num3,
        oper;
      operList.push([args.OPER, args.DEFAULT2]);
      let i = 1;
      while (args[`OPER_${i}`]) {
        operList.push([
          args[`OPER_${i}`],
          args[`ADD_${i}`],
        ]);
        i++;
      }
      for (let i = 0; i < operList.length; i++) {
        (num2 = this.toNum(operList[i][1])), (oper = operList[i][0]), num3;
        if (oper === "+") num3 = num + num2;
        else if (oper === "-") num3 = num - num2;
        else if (oper === "*") num3 = num * num2;
        else if (oper === "/") num3 = num / num2;
        else if (oper === "**") num3 = num ** num2;
        else if (oper === "//") num3 = Math.floor(num / num2);
        else if (oper === "%") num3 = num % num2;
        num = num3;
      }
      return num;
    }
    array(args) {
      let array = [],
        i = 1;
      while (args[`VAL_${i}`]) {
        array.push(args[`VAL_${i}`]);
        i++;
      }
      return JSON.stringify(array);
    }
    object(args) {
      let object = {},
        i = 1;
      while (args[`KEY_${i}`]) {
        object[String(args[`KEY_${i}`])] =
          args[`VAL_${i}`];
        i++;
      }
      return JSON.stringify(object);
    }
    broadcastWithData(args, util) {
      let object = {},
        i = 1;
      while (args[`DATA_${i}`]) {
        object[args[`DATA_${i}`]] =
          args[`VAL_${i}`];
        i++;
      }
      if (!util.stackFrame.broadcastVar)
        util.stackFrame.broadcastVar = Scratch.Cast.toString(
          args.BROADCAST_OPTION
        );
      const data = JSON.stringify(object);
      if (util.stackFrame.broadcastVar) {
        const name = util.stackFrame.broadcastVar;
        if (!util.stackFrame.startedThreads) {
          util.stackFrame.startedThreads = this._broadcast(name, data, util);
          if (util.stackFrame.startedThreads.length === 0) return;
        }
      }
    }
    receivedData(args, util) {
      const received = util.thread.receivedData;
      return received ? received : "";
    }
    // if(args, util) {
    //   let i = 1;
    //   while (args[`BOOL_${i}`]) {
    //     if (args[`BOOL_${i}`]) {
    //       util.startBranch(i);
    //       return;
    //     }
    //     i++;
    //   }
    // }
  }
  Scratch.extensions.register(new ExpandableBlocksExample());
})(Scratch);
