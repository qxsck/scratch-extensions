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
        constructor(id) {
          super(plusImage);
          this.id = id;
        }
        onclick() {
          const block = this.sourceBlock_;
          //console.log(block);
          block.itemCount_[this.id] += 1;
          block.updateShape(); // 更新
        }
      }
      // - 按钮
      class MinusButton extends FieldButton {
        constructor(id) {
          super(minusImage);
          this.id = id;
        }
        onclick() {
          const block = this.sourceBlock_;
          if (block.itemCount_[this.id] > 0) {
            block.itemCount_[this.id] -= 1;
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
        addInput_: function (id, type, text) {
          let input;
          input =
            type === "list" || type === "text"
              ? this.appendDummyInput(id)
              : this.appendValueInput(id);
          if (type === "text") {
            input.appendField('text');
          } else if (type === "boolean") {
            input.setCheck("Boolean");
          } else if (type === "list") {
            input.appendField(
              new Blockly.FieldDropdown(text),
              id
            );
            const fields = runtime
              .getEditingTarget()
              ?.blocks.getBlock(this.id)?.fields;
            if (fields) {
              fields[id] = {
                id: null,
                name: id,
                value: text[0][1],
              };
            }
            this.moveInputBefore(id, "END");
          } else {
            this.attachShadow_(
              input,
              type,
              text
            );
          }
        },
        deleteInput_: function (id, type) {
          const blocks = runtime._editingTarget.blocks;
          const targetBlock = blocks.getBlock(this.id);

          this.ARGS.pop(id);
          const input = targetBlock.inputs[id];
          if (input) {
            if (input.block !== null) {
              const blockInInput = blocks.getBlock(input.block);
              blockInInput.topLevel = true;
              blockInInput.parent = null;
              blocks.moveBlock({
                id: blockInInput.id,
                oldParent: this.id,
                oldInput: id,
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
          this.removeInput(id);
          if (type === "list") {
            const fields = runtime
              .getEditingTarget()
              ?.blocks.getBlock(this.id)?.fields;
            if (fields) {
              delete fields[id];
            }
          } else {
            delete targetBlock.inputs[id];
          }
        },
        mutationToDom: function () {
          // 保存数据到sb3中
          const container = document.createElement("mutation");
          //console.log(this.itemCount_)
          container.setAttribute("items", JSON.stringify(this.itemCount_));
          return container;
        },
        domToMutation: function (xmlElement) {
          // 读取sb3保存的数据
          this.itemCount_ = JSON.parse(xmlElement.getAttribute("items"));
          this.updateShape(); // 读了之后更新
        },
        updateShape: function () {
          let wasRendered = this.rendered;
          this.rendered = false;

          // 更新参数
          Blockly.Events.setGroup(true);
          // 先记录现在的 mutation
          let oldExtraState = Blockly.Xml.domToText(this.mutationToDom(this));

          // 创建新的积木
          let opcode_ = this.opcode_,
            expandableArguments = this.expandableArguments;

          let argumentTypes={};
          //console.log(this.itemCount_)
          for (let i = 0; i < this.itemCount_.length; i++) {
            for (let j = 0; j < expandableArguments[i][2].length; j++) {
              let argumentName = expandableArguments[i][2][j][0],
                argumentType = expandableArguments[i][2][j][1],
                argumentText = expandableArguments[i][2][j][2];
                argumentTypes[argumentName]=argumentType;
              //console.log(argumentName, argumentType, argumentText)
              for (let k = 0; k < this.itemCount_[i]; k++) {
                let argumentKey = `${argumentName}_${k}`;
                //console.log(argumentKey)
                //console.log(!this.getInput(argumentKey), argumentKey);
                if (!this.getInput(argumentKey)) {
                  this.ARGS.push(argumentKey);
                  this.addInput_(argumentKey, argumentType,
                    typeof argumentText === 'function'
                      ? argumentText(k, this.itemCount_)
                      : argumentText
                  );
                }
              }
            }
          }
          if (runtime._editingTarget) {
            // 移除 input 并记录

            for (let i = 0; i < this.itemCount_.length; i++) {
              for (let j = 0; j < expandableArguments[i][2].length; j++) {
                let argumentName = expandableArguments[i][2][j][0],
                  argumentType = expandableArguments[i][2][j][1];

                let k = this.itemCount_[i],
                  argumentKey = `${argumentName}_${k}`;
                while (this.getInput(argumentKey)) {
                  argumentKey = `${argumentName}_${k}`;
                  this.deleteInput_(argumentKey, argumentType);
                  k++;
                }
              }
            }
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
          const getIndex = (arr, key) => {
            return arr.findIndex(obj => obj.name === key);
          }

          //console.log(this.inputList)
          let inputList = this.inputList;
          for (let i = 0; i < this.itemCount_.length; i++) {
            for (let k = 0; k < this.itemCount_[i]; k++) {
              for (let j = 0; j < expandableArguments[i][2].length; j++) {
                let argumentName = expandableArguments[i][2][j][0],
                  argumentType = expandableArguments[i][2][j][1],
                  argumentText = expandableArguments[i][2][j][2],
                  argumentKey = `${argumentName}_${k}`;
                //未完工
                if (argumentType === 'text') {
                  let index = getIndex(inputList, argumentKey);
                  let text = typeof argumentText === 'function'
                    ? argumentText(k, this.itemCount_)
                    : argumentText;

                  if (text === '') {
                    this.inputList[index].fieldRow[0].setText('');
                    this.inputList[index].setVisible(false);
                  } else {
                    this.inputList[index].fieldRow[0].setText(text);
                    this.inputList[index].setVisible(true);
                  }
                }

                this.moveInputBefore(argumentKey, null);
              }
            }
            if (expandableArguments[i][0]) {
              let minusButton = `MINUS${i}`;
              this.removeInput(minusButton);
              if (this.itemCount_[i] > 0) {
                this.appendDummyInput(minusButton).appendField(new this.minusButton(i));
                this.moveInputBefore(minusButton, null);
              }

              let plusButton = `PLUS${i}`;
              this.removeInput(plusButton);
              this.appendDummyInput(plusButton).appendField(new this.plusButton(i));
              this.moveInputBefore(plusButton, null);
            }
          }

          // 新的 mutation
          const newExtraState = Blockly.Xml.domToText(this.mutationToDom(this));
          console.log(newExtraState)
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
                  console.log(argName)
                  if (!this.ARGS.includes(name) && argumentTypes[argName] && argumentTypes[argName] !== 'text') {
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
          Blockly.Events.setGroup(false);

          this.rendered = wasRendered;
          if (wasRendered && !this.isInsertionMarker()) {
            this.initSvg();
            this.render();
          }
        },
        init: function (input) {
          //console.log(input.expandableArguments)
          this.inputList = [];
          this.opcode_ = input.opcode;
          this.expandableArguments = input.expandableArguments;

          let itemCounts = Array(this.expandableArguments.length).fill(0);
          for (let i = 0; i < this.expandableArguments.length; i++) {
            itemCounts[i] = this.expandableArguments[i][1];
          }

          this.itemCount_ = itemCounts;

          this.plusButton = PlusButton;
          this.minusButton = MinusButton;
          this.ARGS = [];
          this.updateShape();
        }
      };
    };
    const { id, blocks: blocksInfo } = extension.getInfo();
    let expandableBlocks = {};
    blocksInfo.forEach((block) => {
      if (block.isExpandableBlock)
        expandableBlocks[`${id}_${block.opcode}`] = {
          opcode: block.opcode,
          expandableArguments: block.expandableArguments,
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
        id: 'expandableBlockExample',
        name: "expandable block example",
        color1: "#53aae7",
        color2: "#53aae7",
        blocks: [
          {
            opcode: "connect",
            blockType: Scratch.BlockType.REPORTER,
            text: "",
            disableMonitor: true,
            isExpandableBlock: true,
            expandableArguments: [
              [
                false,
                1,
                [
                  [
                    'TEXT',
                    'text',
                    function (index, length) {
                      if (length[1] > 0) return 'join';
                      else return 'empty text'
                    }
                  ]
                ]
              ],
              [
                true,
                0,
                [
                  [
                    "INPUT",
                    'string',
                    function (index, length) {
                      return `text${index}`;
                    }
                  ]
                ]
              ]
            ]
          },
          {
            opcode: "connectTwo",
            blockType: Scratch.BlockType.REPORTER,
            text: "",
            disableMonitor: true,
            isExpandableBlock: true,
            expandableArguments: [
              [
                false,
                1,
                [
                  [
                    'TEXT',
                    'text',
                    function (index, length) {
                      if (length[1] > 0) return 'join';
                      else return 'empty text'
                    }
                  ]
                ]
              ],
              [
                true,
                0,
                [
                  [
                    "INPUT",
                    'string',
                    function (index, length) {
                      return `text${index}`;
                    }
                  ]
                ]
              ],
              [
                true,
                0,
                [
                  [
                    "INPUTT",
                    'string',
                    function (index, length) {
                      return `textt${index}`;
                    }
                  ]
                ]
              ]
            ]
          },
          {
            opcode: "connectOptions",
            blockType: Scratch.BlockType.REPORTER,
            text: "",
            disableMonitor: true,
            isExpandableBlock: true,
            expandableArguments: [
              [
                false,
                1,
                [
                  [
                    'TEXT',
                    'text',
                    function (index, length) {
                      if (length[1] > 0) return 'join';
                      else return 'empty option'
                    }
                  ]
                ]
              ],
              [
                true,
                0,
                [
                  [
                    "INPUT",
                    'list',
                    [
                      ["a", "a"],
                      ["b", "b"],
                      ["c", "c"],
                    ]
                  ]
                ]
              ]
            ]
          },
          {
            opcode: "array",
            blockType: Scratch.BlockType.REPORTER,
            text: "",
            disableMonitor: true,
            arguments: {},
            isExpandableBlock: true,
            expandableArguments: [
              [
                false,
                1,
                [
                  [
                    'BEGIN',
                    'text',
                    function (index, length) {
                      if (length[1] > 0) return 'array [';
                      else return 'empty array'
                    }
                  ]
                ]
              ],
              [
                true,
                0,
                [
                  [
                    "VALUE",
                    'string',
                    function (index, length) {
                      return `value${index}`;
                    }
                  ],
                  [
                    "GAP",
                    'text',
                    function (index, length) {
                      if (index < length[1] - 1) return ',';
                      else return ''
                    }
                  ]
                ]
              ],
              [
                false,
                1,
                [
                  [
                    'END',
                    'text',
                    function (index, length) {
                      if (length[1] > 0) return ']';
                      else return ''
                    }
                  ]
                ]
              ],
            ],
          },
          {
            opcode: "object",
            blockType: Scratch.BlockType.REPORTER,
            text: "empty object",
            disableMonitor: true,
            arguments: {},
            isExpandableBlock: true,
            expandableArguments: [
              [
                false,
                1,
                [
                  [
                    'BEGIN',
                    'text',
                    function (index, length) {
                      if (length[1] > 0) return 'object {';
                      else return 'empty object'
                    }
                  ]
                ]
              ],
              [
                true,
                0,
                [
                  [
                    "KEY",
                    'string',
                    function (index, length) {
                      return `key${index}`;
                    }
                  ],
                  [
                    "TO",
                    'text',
                    ':'
                  ],
                  [
                    "VALUE",
                    'string',
                    function (index, length) {
                      return `value${index}`;
                    }
                  ],
                  [
                    "GAP",
                    'text',
                    function (index, length) {
                      if (index < length[1] - 1) return ',';
                      else return ''
                    }
                  ]
                ]
              ],
              [
                false,
                1,
                [
                  [
                    'END',
                    'text',
                    function (index, length) {
                      if (length[1] > 0) return '}';
                      else return ''
                    }
                  ]
                ]
              ],
            ],
          },
        ],
        menus: {},
      };
    }

    connect(args) {
      let string = '',
        i;

      i = 0;
      while (args[`INPUT_${i}`]) {
        string += String(args[`INPUT_${i}`]);
        i++;
      }

      return string;
    }
    connectTwo(args) {
      let string = '',
        i;

      i = 0;
      while (args[`INPUT_${i}`]) {
        string += String(args[`INPUT_${i}`]);
        i++;
      }

      string += ' ';

      i = 0;
      while (args[`INPUTT_${i}`]) {
        string += String(args[`INPUTT_${i}`]);
        i++;
      }

      return string;
    }
    connectOptions(args) {
      let string = '',
        i;

      i = 0;
      while (args[`INPUT_${i}`]) {
        string += String(args[`INPUT_${i}`]);
        i++;
      }

      return string;
    }
    array(args) {
      let array = [],
        i;

      i = 0;
      while (args[`VALUE_${i}`]) {
        array.push(args[`VALUE_${i}`]);
        i++;
      }

      return JSON.stringify(array);
    }

    object(args) {
      let object = {},
        i;

      i = 0;
      while (args[`KEY_${i}`]) {
        object[String(args[`KEY_${i}`])] =
          args[`VALUE_${i}`];
        i++;
      }

      return JSON.stringify(object);
    }
  }
  Scratch.extensions.register(new ExpandableBlocksExample());
})(Scratch);
