(function (Scratch) {
  "use strict";
  Scratch.translate.setup({
    zh: {
      "Big Decimal": "高精度运算",

      '🗂️Settings': '🗂️设置',
      "📏Arithmetic": "📏运算",
      "🔎Logic": "🔎逻辑",
      "🧪Math": "🧪数学",

      "set max precision to [NUM]": '设置最大精度为 [NUM]',

      "round [NUM] to [NUM2] decimal places": '四舍五入 [NUM] 到第 [NUM2] 位小数',
      "[OPER] of [NUM]": '[OPER] ( [NUM] )',
      '[OPER] of [NUM] and [NUM2]': '[OPER] ( [NUM] , [NUM2] )',
      "pick random [NUM] to [NUM2]": '获取从 [NUM] 到 [NUM2] 的随机数',
    },
  });
  class bigNumber {
    constructor() {
      this.maxPrecision = 100;

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
        let noDecNumber = str.replace(".", "");
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
        let num_ = this.formatNum(result, a.len);
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.subFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num - b.num;
        let num_ = this.formatNum(result, a.len);
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.mulFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num * b.num;
        let num_ = this.formatNum(result, a.len * 2);
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.divFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        if (b.num === 0n) return Infinity;
        let result = (a.num * this.tenTimes(this.maxPrecision + 1)) / b.num;
        return this.formatNum(result, this.maxPrecision + 1);
      };
      this.powFunc = function (num, num2) {
        let a = this.toBigNumber(num),
          b = Math.trunc(this.toNum(num2)),
          flag = 0;
        if (a.num === 0n) return '0';
        else if (b.num === 0n) return '1';
        if (b < 0) (flag = 1), (b = -b);
        let aa=a.num,
          bb=BigInt(b),
          result=1n;
        while(bb){
          if(bb&1n) result*=aa;
          aa*=aa;
          bb/=2n;
        }
        let num_=this.formatNum(result, a.len * b);
        if (flag) num_ = this.divFunc("1", num_);
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.modFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        if (b.num === 0n) return '0';
        let result = a.num % b.num;
        if (result < 0n) result += b.num < 0n ? -b.num : b.num;
        let num_ = this.formatNum(result, a.len);
        return this.roundFunc(num_, this.maxPrecision);
      };

      this.absFunc = function (num) {
        return num.replace('-', '');
      }
      this.maxMinFunc = function (oper, num, num2) {
        let a, b;
        switch (oper) {
          case 'max':
            ({ num: a, num2: b } = this.toSamePer(num, num2));
            return a.num < b.num ? num2 : num;
          case 'min':
            ({ num: a, num2: b } = this.toSamePer(num, num2));
            return a.num > b.num ? num2 : num;
        }
      };
      this.roundFunc = function (num, num2) {
        let a = this.toBigNumber(num),
          round = Math.trunc(this.toNum(num2)),
          flag = a.num >= 0n;
        if (round >= a.len) {
          return this.formatNum(a.num, a.len);
        }
        for (let i = 0; i < a.len - round - 1; i++) a.num = a.num / 10n;
        let lastNum = a.num % 10n, flag2;
        a.num = a.num / 10n;
        if (flag) {
          flag2 = lastNum % 10n >= 5n;
          a.num = a.num + BigInt(flag2);
        }
        else {
          flag2 = lastNum % 10n <= -5n;
          a.num = a.num - BigInt(flag2);
        }
        for (let i = 0; i < a.len - round; i++) a.num = a.num * 10n;
        return this.formatNum(a.num, a.len);
      };
      this.randomFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let aa = this.formatNum(a.num, a.len),
          bb = this.formatNum(b.num, b.len),
          temp1 = aa, temp2 = bb,
          per = a.len;
        aa = this.maxMinFunc('min', temp1, temp2);
        bb = this.maxMinFunc('max', temp1, temp2);
        let random_ = String(Math.random());
        random_ = this.roundFunc(random_, 10);
        let nums = this.toSamePer(aa, random_),
          nums2 = this.toSamePer(bb, random_);
        a = nums.num, b = nums2.num, random_ = nums.num2;
        a = this.formatNum(a.num, a.len),
          b = this.formatNum(b.num, b.len),
          random_ = this.formatNum(random_.num, random_.len);
        let different = this.mulFunc(this.subFunc(b, a), random_),
          randomNum = this.addFunc(different, a);
        return this.roundFunc(randomNum, per);
      };
      this.sqrtFunc = function (x) {
        if (x <= '0') {
          return '0';
        }
        let last = '0';
        let res = '1';
        while (true) {
          last = res;
          res = this.divFunc(this.addFunc(res, this.divFunc(x, res)), '2');
          if (
            this.roundFunc(res, Math.trunc(this.maxPrecision / 2.5)) ===
            this.roundFunc(last, Math.trunc(this.maxPrecision / 2.5))
          ) break;
        }
        return res;
      }

      this.toRadians = function (degrees) {
        return this.divFunc(this.mulFunc(degrees, '3.141592653589793'), "180");
      }
      this.toDegrees = function (degrees) {
        return this.divFunc(this.mulFunc(degrees, '180'), "3.141592653589793");
      }
      this.factorial = function (n) {
        n = BigInt(n);
        let result = 1n;
        for (let i = 1n; i <= n; i++) {
          result *= i;
        }
        return String(result);
      }

      this.sinFunc111 = function (num) {
        let x = this.toRadians(num);
        let result = "0";
        for (let i = 0; i < 20; i++) {
          let symbol = String((-1) ** i),
            cnt = 2 * i + 1,
            son = this.powFunc(x, cnt);
          let term = this.divFunc(this.mulFunc(symbol, son), this.factorial(cnt));
          result = this.addFunc(result, term);
        }
        return this.roundFunc(result, this.maxPrecision);
      }
      this.sinFunc = function (num) {
        let x = this.toRadians(num);
        let term = x;
        let result = x;
        let x2 = this.mulFunc(x, x);
        for (let i = 1; i < 100; i++) {
          term = this.divFunc(this.mulFunc(term, this.mulFunc(x2, -1)), (2 * i) * (2 * i + 1));
          result = this.addFunc(result, term);
        }
        return this.roundFunc(result, this.maxPrecision);
      };
      this.cosFunc = function (num) {
        let x = this.toRadians(num);
        let result = "0";
        for (let i = 0; i < 10; i++) {
          let symbol = String((-1) ** i),
            cnt = 2 * i,
            son = this.powFunc(x, cnt);
          let term = this.divFunc(this.mulFunc(symbol, son), this.factorial(cnt));
          result = this.addFunc(result, term);
        }
        return this.roundFunc(result, this.maxPrecision);
      }
      this.tanFunc = function (num) {
        let sin = this.sinFunc(num);
        let cos = this.cosFunc(num);
        return this.divFunc(sin, cos);
      }
      this.asinFunc = function (num) {
        let x = num;
        let result = this.absFunc(
          this.atanFunc(
            this.divFunc(
              x,
              this.sqrtFunc(
                this.subFunc(
                  '1',
                  this.powFunc(x, '2')
                )
              )
            )
          )
        );
        result = this.roundFunc(result, this.maxPrecision);
        return result;
      }
      this.acosFunc = function (num) {
        let x = num;
        let one = this.mulFunc(
          this.divFunc('8', '3'),
          this.sqrtFunc(
            this.subFunc(
              '2',
              this.sqrtFunc(
                this.addFunc(
                  '2',
                  this.mulFunc('2', x)
                )
              )
            )
          )
        ),
          two = this.mulFunc(
            this.divFunc('1', '3'),
            this.sqrtFunc(
              this.subFunc(
                '2',
                this.mulFunc('2', x)
              )
            )
          );
        let result=this.subFunc(one,two);
        result=this.toDegrees(result);
        return this.roundFunc(result, this.maxPrecision);
      }
      this.atanFunc = function (num) {
        let x = num;
        let half2Pi = this.divFunc('3.141592653589793', '4'),
          one = this.mulFunc(half2Pi, x),
          two = this.mulFunc(
            x,
            this.mulFunc(
              this.subFunc(
                this.absFunc(x),
                '1'
              ),
              this.addFunc(
                '0.2447',
                this.mulFunc(
                  '0.0663',
                  this.absFunc(x),
                )
              )
            )
          );
        let result = this.subFunc(one, two);
        result = this.roundFunc(result, this.maxPrecision);
        return this.toDegrees(result);
      }

      this.formatMessage = function (id) {
        return Scratch.translate({ id: id, default: id });
      };
    }

    getInfo() {
      return {
        id: "qxsckbignumber",
        name: this.formatMessage("Big Decimal"),
        color1: "#ff8c3b",
        blocks: [
          {
            blockType: "label",
            text: this.formatMessage("🗂️Settings"),
          },
          {
            opcode: "setPrecision",
            blockType: Scratch.BlockType.COMMAND,
            text: this.formatMessage("set max precision to [NUM]"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "100",
              },
            },
          },
          {
            blockType: "label",
            text: this.formatMessage("📏Arithmetic"),
          },
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
          {
            blockType: "label",
            text: this.formatMessage("🔎Logic"),
          },
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
          {
            blockType: "label",
            text: this.formatMessage("🧪Math"),
          },
          {
            opcode: "unaryOper",
            blockType: Scratch.BlockType.REPORTER,
            text: this.formatMessage("[OPER] of [NUM]"),
            arguments: {
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "unaryOper.List",
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "-0.1",
              },
            },
          },
          {
            opcode: "binaryOper",
            blockType: Scratch.BlockType.REPORTER,
            text: this.formatMessage("[OPER] of [NUM] and [NUM2]"),
            arguments: {
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "binaryOper.List",
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "-0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
            },
          },
          {
            opcode: "round",
            blockType: Scratch.BlockType.REPORTER,
            text: this.formatMessage("round [NUM] to [NUM2] decimal places"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "123.45",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "random",
            blockType: Scratch.BlockType.REPORTER,
            text: this.formatMessage("pick random [NUM] to [NUM2]"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.999",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1.001",
              },
            },
          },
        ],
        menus: {
          "unaryOper.List": {
            items: ["abs", "ceil", "floor", 'trunc', 'sqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan'],
          },
          "binaryOper.List": {
            items: ["max", "min",],
          },
        },
      };
    }

    replaceString(str, str2, index) {
      return str.slice(0, index) + str2 + str.slice(index + 1);
    }

    setPrecision(args) {
      let num = Number(args.NUM);
      num = Math.trunc(num);
      if (num < 0) num = 0;
      this.maxPrecision = num;
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

    unaryOper(args) {
      let oper = args.OPER,
        str = String(args.NUM);
      switch (oper) {
        case 'abs':
          return this.absFunc(str);
        case 'ceil':
          if (str.indexOf('-') !== -1) {
            if (str.indexOf('.') !== -1)
              str = this.replaceString(str, '0', str.indexOf('.') + 1);
            return this.roundFunc(str, 0);
          } else {
            if (str.indexOf('.') !== -1)
              str = this.replaceString(str, '9', str.indexOf('.') + 1);
            return this.roundFunc(str, 0);
          }
        case 'floor':
          if (str.indexOf('-') !== -1) {
            if (str.indexOf('.') !== -1)
              str = this.replaceString(str, '9', str.indexOf('.') + 1);
            return this.roundFunc(str, 0);
          } else {
            if (str.indexOf('.') !== -1)
              str = this.replaceString(str, '0', str.indexOf('.') + 1);
            return this.roundFunc(str, 0);
          }
        case 'trunc':
          if (str.indexOf('.') !== -1)
            str = this.replaceString(str, '0', str.indexOf('.') + 1);
          return this.roundFunc(str, 0);
        case 'sqrt':
          return this.sqrtFunc(str);
        case 'sin':
          return this.sinFunc(str);
        case 'cos':
          return this.cosFunc(str);
        case 'tan':
          return this.tanFunc(str);
        case 'asin':
          return this.asinFunc(str);
        case 'acos':
          return this.acosFunc(str);
        case 'atan':
          return this.atanFunc(str);
      }
    }
    binaryOper(args) {
      let oper = args.OPER,
        str = String(args.NUM),
        str2 = String(args.NUM2);
      switch (oper) {
        case 'max':
          return this.maxMinFunc('max', str, str2);
        case 'min':
          return this.maxMinFunc('min', str, str2);
      }
    }
    round(args) {
      return this.roundFunc(args.NUM, args.NUM2);
    }
    random(args) {
      return this.randomFunc(args.NUM, args.NUM2);
    }
  }
  Scratch.extensions.register(new bigNumber());
})(Scratch);
