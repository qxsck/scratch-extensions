(function (Scratch) {
  "use strict";
  Scratch.translate.setup({
    zh: {
      "Big Decimal": "高精度运算",

      '🗂️Settings': '🗂️设置',
      "📏Arithmetic": "📏运算",
      "🔎Logic": "🔎逻辑",
      "🧪Math": "🧪数学",

      'notice: exponent of pow only support integer.': '注意：幂运算的指数只支持整数',

      "set max precision to [NUM]": '设置最大精度为 [NUM]',
    },
  });

  class BigDecimal {
    constructor() {
      this.maxPrecision = 100;

      this.tenTimes = function (val) {
        if (typeof val === "bigint") return 10n ** val;
        return 10n ** BigInt(val);
      };
      this.times = function (val, num) {
        return val.repeat(num);
      };
      this.isInteger = function (num) {
        if (num.len === 0) return true;
        return num.num % this.tenTimes(num.len) === 0n;
      };

      this.removeLeft = function (str, pattern) {
        const regex = new RegExp("^" + pattern + "+");
        return str.replace(regex, "");
      };
      this.removeRight = function (str, pattern) {
        const regex = new RegExp(pattern + "+$");
        return str.replace(regex, "");
      };

      this.formatNum = function (number) {
        console.log(number);
        let { num, len, Inf = false } = number;
        if (Inf) return "Infinity";
        let result = num,
          flag = 0,
          int,
          dec,
          result_;
        if (result < 0n) {
          result = result * -1n;
          flag = 1;
        }

        result = String(result);
        (int = result.slice(0, result.length - len)),
          (dec = result.slice(result.length - len));

        if (dec.length >= len) {
          (int = result.slice(0, result.length - len)),
            (dec = result.slice(result.length - len));
        } else {
          (int = ""), (dec = result);
          dec = this.times("0", len - dec.length) + dec;
        }

        result_ = flag ? "-" : "";
        result_ = result_ + (this.removeLeft(int, "0") === "" ? "0" : int);
        result_ =
          result_ +
          (this.removeRight(dec, "0") === ""
            ? ""
            : dec === "0"
              ? ""
              : "." + this.removeRight(dec, "0"));
        return result_;
      };

      this._BigDecimal = function (num, len, Inf = false) {
        return {
          num: num,
          len: len,
          Inf: Inf,
        };
      };

      this.toBigInt = function (num) {
        if (num.len === 0) return num.num;
        return num.num / this.tenTimes(num.len);
      };
      this.toBigDecimal = function (num) {
        let str = String(num);

        if (str === "Infinity") return this._BigDecimal(0n, 0, true);

        // Handle scientific notation
        if (str.includes("e") || str.includes("E")) {
          const [base, exponent] = str.split(/e|E/),
            bigBase = this.toBigDecimal(base),
            expInt = this._trunc(this.toBigDecimal(exponent));
          let ten = {
            num: 10n,
            len: 0,
            Inf: false,
          };
          let result = this._mul(bigBase, this._pow(ten, expInt));
          return result;
        }

        let P = str.indexOf(".");
        P = P === -1 ? str.length - 1 : P;
        let noDecNumber = str.replace(".", "");
        let try_ = Number(noDecNumber);
        let [str_, len_] = isNaN(try_)
          ? ["0", 0]
          : noDecNumber.indexOf(".") === -1
            ? [noDecNumber, str.length - P - 1]
            : ["0", 0];
        return this._BigDecimal(BigInt(str_), len_);
      };

      this.toSamePer = function (num, num2) {
        let a = num,
          b = num2,
          flag = 0,
          flagList = [null, null];
        flag = a.Inf || b.Inf;
        flagList = [a.Inf, b.Inf];
        let len = Math.max(a.len, b.len);
        if (len === a.len) b.num = b.num * this.tenTimes(len - b.len);
        else a.num = a.num * this.tenTimes(len - a.len);
        a.len = b.len = len;
        return {
          num: a,
          num2: b,
          flag: flag,
          flagList: flagList,
        };
      };

      this.simplify = function (number) {
        let { num, len, Inf = false } = number;
        while (num % 10n === 0n && len > 0) (num /= 10n), len--;
        return this._BigDecimal(num, len, Inf);
      };

      this._add = function (num, num2) {
        let { num: a, num2: b, flag: flag } = this.toSamePer(num, num2);
        if (flag) return this._BigDecimal(0n, 0, true);
        let result = a.num + b.num;
        result = this._BigDecimal(result, a.len);
        return this.simplify(result);
      };
      this._sub = function (num, num2) {
        let { num: a, num2: b, flag: flag } = this.toSamePer(num, num2);
        if (flag) return this._BigDecimal(0n, 0, true);
        let result = a.num - b.num;
        result = this._BigDecimal(result, a.len);
        return this.simplify(result);
      };
      this._mul = function (num, num2) {
        let { num: a, num2: b, flag: flag } = this.toSamePer(num, num2);
        if (flag) return this._BigDecimal(0n, 0, true);
        let result = a.num * b.num;
        result = this._BigDecimal(result, a.len * 2);
        return this.simplify(result);
      };
      this._div = function (num, num2) {
        let { num: a, num2: b, flag: flag } = this.toSamePer(num, num2);
        if (a.Inf || b.Inf) return this._BigDecimal(0n, 0, true);
        if (a.num === 0n) return this._BigDecimal(0n, 0);
        if (b.num === 0n) return this._BigDecimal(0n, 0, true);
        let result = (a.num * this.tenTimes(this.maxPrecision)) / b.num;
        result = this._BigDecimal(result, this.maxPrecision);
        return this.simplify(result);
      };
      this._mod = function (num, num2) {
        let { num: a, num2: b, flag: flag } = this.toSamePer(num, num2);
        if (flag) return this._BigDecimal(0n, 0, true);
        let result = a.num % b.num;
        return this.simplify(this._BigDecimal(result, a.len));
      };

      this.fastPow = function (base, exponent) {
        let result = this._BigDecimal(1n, 0),
          current = base,
          exp = exponent;

        while (exp > 0n) {
          if (exp % 2n === 1n) result = this._mul(result, current);

          current = this._mul(current, current);
          exp = exp / 2n;
        }

        return result;
      };
      this._pow = function (base, exponent) {
        let expInt;
        if (this.isInteger(exponent)) expInt = this.toBigInt(exponent);
        else expInt = this.toBigInt(this._floor(exponent));

        if (base.Inf) return this._BigDecimal(0n, 0, true);
        if (base.num === 0n && expInt < 0n) return this._BigDecimal(0n, 0, true);
        if (expInt === 0n) return this._BigDecimal(1n, 0);

        let flag = false,
          absExp = expInt;
        if (expInt < 0n) (flag = true), (absExp = -expInt);

        let result = this.fastPow(base, absExp);

        return flag ? this._div(this._BigDecimal(1n, 0), result) : result;
      };
      this._sqrt = function (x) {
        if (x.Inf) return this._BigDecimal(0n, 0, true);
        if (x.num < 0n) return this._BigDecimal(0n, 0, true);
        if (x.num === 0n) return this._BigDecimal(0n, 0);
        let last = this._BigDecimal(0n, 0),
          res = this._BigDecimal(1n, 0),
          two = this._BigDecimal(2n, 0);
        while (true) {
          last = Object.assign({}, res);
          res = this._div(this._add(res, this._div(x, res)), two);
          if (
            this._compare(
              this._abs(this._sub(last, res)),
              this._BigDecimal(1n, 10)
            ) === -1
          )
            break;
        }
        return res;
      };
      this._floor = function (num) {
        if (num.Inf) return num;

        let divisor = this.tenTimes(num.len),
          integerPart = num.num / divisor,
          fractionalPart = num.num % divisor;

        if (num.num >= 0n || fractionalPart === 0n)
          return this._BigDecimal(integerPart, 0);

        return this._BigDecimal(integerPart - 1n, 0);
      };
      this._ceil = function (num) {
        if (num.Inf) return num;

        let divisor = this.tenTimes(num.len),
          integerPart = num.num / divisor,
          fractionalPart = num.num % divisor;

        if (num.num <= 0n || fractionalPart === 0n)
          return this._BigDecimal(integerPart, 0);

        return this._BigDecimal(integerPart + 1n, 0);
      };

      this._abs = function (num) {
        if (num.Inf) return this._BigDecimal(0n, 0, true);
        if (num.num < 0n) {
          num.num = -num.num;
        }
        return num;
      };
      this._neg = function (num) {
        if (num.Inf) return this._BigDecimal(0n, 0, true);
        num.num = -num.num;
        return num;
      };
      this._trunc = function (num) {
        if (num.Inf) return this._BigDecimal(0n, 0, true);
        if (num.len === 0) return num;
        return this.simplify(this._BigDecimal(num.num - (num.num % this.tenTimes(num.len)), num.len));
      };
      this._sign = function (num) {
        if (num.Inf) return this._BigDecimal(0n, 0, true);
        if (num.num > 0n) return this._BigDecimal(1n, 0);
        if (num.num === 0n) return this._BigDecimal(0n, 0);
        else return this._BigDecimal(-1n, 0);
      }

      this._round = function (num, x) {
        if (num.Inf) return num;
        if (x.Inf) return this._BigDecimal(0n, 0, true);
        num = this.simplify(num);
        if (x >= num.len) return num;

        let flag = 0;
        if (num.num < 0n) (flag = 1), (num.num = num.num * -1n);

        const factor = this.tenTimes(num.len - x),
          remainder = num.num % factor,
          base = num.num / factor,
          halfFactor = factor / 2n;

        let roundedBase;
        if (remainder >= halfFactor) {
          roundedBase = base >= 0n ? base + 1n : base - 1n;
        } else {
          roundedBase = base;
        }
        return this._BigDecimal(roundedBase * (flag ? -1n : 1n), x);
      };

      this._compare = function (num, num2) {
        const { num: a, num2: b, flagList: flagList } = this.toSamePer(num, num2);
        if (flagList[0]) {
          if (flagList[1]) return 0;
          else return 1;
        } else if (flagList[1]) return -1;

        if (a.num > b.num) return 1;
        if (a.num < b.num) return -1;
        return 0;
      };

      this._random = function (num, num2) {
        let { num: a, num2: b, flag: flag } = this.toSamePer(num, num2);
        if (flag) return this._BigDecimal(0n, 0, true);
        if (this._compare(num, num2) === 1) [num, num2] = [num2, num];
        let diff = this._sub(num2, num),
          seed = String(Math.random()),
          per = num.len;
        seed = this.toBigDecimal(seed);
        let result = this._add(num, this._mul(diff, seed));
        return this._round(result, per);
      };
    }
  }


  let bigDecimal = new BigDecimal();

  class BigDecimalExtension {
    constructor() {
      this.formatMessage = function (id) {
        return Scratch.translate({ id: id, default: id });
      };
    }

    getInfo() {
      return {
        id: "qxsckbigdecimal",
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
            blockType: "label",
            text: this.formatMessage("notice: exponent of pow only support integer."),
          },
          {
            opcode: "arithmeticOper",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] [OPER] [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "arithmeticOper.list",
                defaultValue: "+",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            blockType: "label",
            text: this.formatMessage("🔎Logic"),
          },
          {
            opcode: "compare",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] [OPER] [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "compare.list",
                defaultValue: "=",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
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
            text: this.formatMessage("[OPER] ( [NUM] )"),
            arguments: {
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "unaryOper.list",
                defaultValue: "sqrt",
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "binaryOper",
            blockType: Scratch.BlockType.REPORTER,
            text: this.formatMessage("[OPER] ( [NUM] , [NUM2] )"),
            arguments: {
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "binaryOper.list",
                defaultValue: "round",
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.5",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          }
        ],
        menus: {
          "arithmeticOper.list": {
            acceptReporters: true,
            items: [
              '+',
              '-',
              '*',
              '/',
              '%',
              '**',
            ],
          },
          "compare.list": {
            acceptReporters: true,
            items: [
              "=",
              '!=',
              "<",
              ">",
              "<=",
              ">=",
            ],
          },
          "unaryOper.list": {
            acceptReporters: true,
            items: [
              "abs",
              "neg",
              "floor",
              "ceil",
              "trunc",
              "sign",
              "sqrt",
            ],
          },
          "binaryOper.list": {
            acceptReporters: true,
            items: [
              "round",
              "random",
              "max",
              "min",
            ],
          }
        },
      };
    }

    toNum(val) {
      return isNaN(Number(val)) ? 0 : Number(val);
    };

    setPrecision(args) {
      let num = Number(args.NUM);
      num = Math.trunc(num);
      if (num < 0) num = 0;
      bigDecimal.maxPrecision = num;
    }

    arithmeticOper(args) {
      let num = bigDecimal.toBigDecimal(args.NUM),
        num2 = bigDecimal.toBigDecimal(args.NUM2),
        oper = args.OPER;
      let result;
      switch (oper) {
        case '+':
          result = bigDecimal._add(num, num2);
          break;
        case '-':
          result = bigDecimal._sub(num, num2);
          break;
        case '*':
          result = bigDecimal._mul(num, num2);
          break;
        case '/':
          result = bigDecimal._div(num, num2);
          break;
        case '%':
          result = bigDecimal._mod(num, num2);
          break;
        case '**':
          result = bigDecimal._pow(num, num2);
          break;
      }
      return bigDecimal.formatNum(result);
    }

    compare(args) {
      let num = bigDecimal.toBigDecimal(args.NUM),
        num2 = bigDecimal.toBigDecimal(args.NUM2),
        oper = args.OPER;
      let result = bigDecimal._compare(num, num2),
        result_;
      switch (oper) {
        case '=':
          result_ = (result === 0);
          break;
        case '!=':
          result_ = (result !== 0);
          break;
        case '<':
          result_ = (result < 0);
          break;
        case '>':
          result_ = (result > 0);
          break;
        case '<=':
          result_ = (result <= 0);
          break;
        case '>=':
          result_ = (result >= 0);
          break;
      }
      return result_;
    }

    unaryOper(args) {
      let num = bigDecimal.toBigDecimal(args.NUM),
        oper = args.OPER;
      let result;
      switch (oper) {
        case 'abs':
          result = bigDecimal._abs(num);
          break;
        case 'neg':
          result = bigDecimal._neg(num);
          break;
        case 'floor':
          result = bigDecimal._floor(num);
          break;
        case 'ceil':
          result = bigDecimal._ceil(num);
          break;
        case 'trunc':
          result = bigDecimal._trunc(num);
          break;
        case 'sign':
          result = bigDecimal._sign(num);
          break;
        case 'sqrt':
          result = bigDecimal._sqrt(num);
          break;
      }
      return bigDecimal.formatNum(result);
    }

    binaryOper(args) {
      let num = bigDecimal.toBigDecimal(args.NUM),
        num2 = bigDecimal.toBigDecimal(args.NUM2),
        oper = args.OPER;
      let result;
      switch (oper) {
        case 'round':
          result = bigDecimal._round(num, this.toNum(args.NUM2));
          break;
        case 'random':
          result = bigDecimal._random(num, num2);
          break;
        case 'max':
          result = bigDecimal._compare(num, num2) === 1? num : num2;
          break;
        case 'min':
          result = bigDecimal._compare(num, num2) === -1? num : num2;
          break;
      }
      return bigDecimal.formatNum(result);
    }
  }
  Scratch.extensions.register(new BigDecimalExtension());
})(Scratch);
