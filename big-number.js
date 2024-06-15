(function (Scratch) {
  "use strict";
  let i10ndefaultValue = {
    "qxsckbignumber.name": "Big Number",

    "qxsckbignumber.arithmetic": "📏Arithmetic",
    "qxsckbignumber.logic": "🔎Logic",
  };

  Scratch.translate.setup({
    en: {
      ...i10ndefaultValue,
    },
    zh: {
      "qxsckbignumber.name": "高精度运算",

      "qxsckbignumber.arithmetic": "📏运算",
      "qxsckbignumber.logic": "🔎逻辑",
    },
  });
  class bigNumber {
    constructor(runtime) {
      this.runtime = runtime ?? Scratch?.vm?.runtime;

      this.tenTimes = function (val) {
        return 10n ** BigInt(val);
      };
      this.times = function (val, num) {
        return val.repeat(num);
      };
      this.toNum = function (val) {
        return isNaN(Number(val)) ? 0 : Number(val);
      };
      this.removeLeft = function (str, pattern) {
        const regex = new RegExp("^" + pattern + "+");
        return str.replace(regex, "");
      };
      this.removeRight = function (str, pattern) {
        const regex = new RegExp(pattern + "+$");
        return str.replace(regex, "");
      };
      this.formatNum = function (result, len) {
        result = String(result);
        let flag = 0;
        if (result.startsWith("-")) {
          result = result.replace("-", "");
          flag = 1;
        }
        result = this.times("0", len * 2) + result;
        let int = result.slice(0, result.length - len),
          dec = result.slice(result.length - len);
        int = this.removeLeft(int, '0');
        dec = this.removeRight(dec, '0');
        if (int === "") int = "0";
        dec = dec === "" ? "" : "." + dec;
        let result_ = int + dec;
        result_ = (flag ? "-" : "") + result_;
        return result_;
      };

      this.toBigNumber = function (num) {
        let str = String(num),
          P = str.indexOf(".");
        P = P === -1 ? str.length - 1 : P;
        let noDecNumber=str.replace(".", "");
        let try_ = Number(noDecNumber);
        let [str_, len_] = isNaN(try_)
          ? ["0", 0]
          : noDecNumber.indexOf(".") === -1
            ? [noDecNumber, str.length - P - 1]
            : ["0", 0];
        return {
          num: BigInt(str_),
          len: len_,
        };
      };
      this.toSamePer = function (num, num2) {
        let a = this.toBigNumber(num),
          b = this.toBigNumber(num2);
        let len = Math.max(a.len, b.len);
        if (len === a.len) b.num = b.num * this.tenTimes(len - b.len);
        else a.num = a.num * this.tenTimes(len - a.len);
        a.len = b.len = len;
        return {
          num: a,
          num2: b,
        };
      };

      this.addFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num + b.num;
        return this.formatNum(result, a.len);
      };
      this.subFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num - b.num;
        return this.formatNum(result, a.len);
      };
      this.mulFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num * b.num;
        return this.formatNum(result, a.len * 2);
      };
      this.divFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        if (b.num === 0n) return Infinity;
        let result = (a.num * this.tenTimes(100)) / b.num;
        return this.formatNum(result, 100);
      };
      this.powFunc = function (num, num2) {
        let a = this.toBigNumber(num),
          b = Math.trunc(this.toNum(num2)),
          flag = 0;
        if (a.num === 0n) return '0';
        else if (b.num === 0n) return '1';
        if (b < 0) (flag = 1), (b = -b);
        let result = a.num ** BigInt(b);
        if (!flag) return this.formatNum(result, a.len * b);
        else return this.divFunc("1", this.formatNum(result, a.len * b));
      };
      this.modFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        if (b.num === 0n) return '0';
        let result = a.num % b.num;
        return this.formatNum(result, a.len);
      };

      this.formatMessage = function (id) {
        return Scratch.translate({ id: id, default: i10ndefaultValue[id] });
      };
    }

    getInfo() {
      return {
        id: "qxsckbignumber",
        name: this.formatMessage("qxsckbignumber.name"),
        color1: "#ff8c3b",
        blocks: [
          "---" + this.formatMessage("qxsckbignumber.arithmetic"),
          {
            opcode: "add",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] + [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "sub",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] - [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "mul",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] * [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "div",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] / [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.3",
              },
            },
          },
          {
            opcode: "pow",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] ** [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2",
              },
            },
          },
          {
            opcode: "mod",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] % [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.3",
              },
            },
          },
          "---" + this.formatMessage("qxsckbignumber.logic"),
          {
            opcode: "lt",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] < [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "le",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] ≤ [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "gt",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] > [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "ge",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] ≥ [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "eq",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] = [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "neq",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] ≠ [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
        ],
        menus: {},
      };
    }

    add(args) {
      return this.addFunc(args.NUM, args.NUM2);
    }
    sub(args) {
      return this.subFunc(args.NUM, args.NUM2);
    }
    mul(args) {
      return this.mulFunc(args.NUM, args.NUM2);
    }
    div(args) {
      return this.divFunc(args.NUM, args.NUM2);
    }
    pow(args) {
      return this.powFunc(args.NUM, args.NUM2);
    }
    mod(args) {
      return this.modFunc(args.NUM, args.NUM2);
    }

    lt(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num < b.num;
    }
    le(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num <= b.num;
    }
    gt(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num > b.num;
    }
    ge(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num >= b.num;
    }
    eq(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num === b.num;
    }
    neq(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num !== b.num;
    }
  }
  Scratch.extensions.register(new bigNumber(Scratch?.vm?.runtime));
})(Scratch);