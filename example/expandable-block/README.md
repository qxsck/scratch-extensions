### 如何使用此模板制作自己的可拓展积木

在 `getInfo().blocks` 中，积木可以通过设置`isExpandableBlock`和`expandableArguments` ，定义可扩展积木的动态结构。

### 结构

每个可扩展积木包含：
1. **opcode**: 积木标识符
2. **blockType**: 积木类型（包括 `REPORTER` 等）
3. **isExpandableBlock**: 标记为可扩展积木
4. **expandableArguments**: 定义积木的动态结构

### expandableArguments 结构介绍

`expandableArguments` 数组包含多个组件，每个组件由三部分组成：
```
[
  是否是可拓展参数组（即是否会显示加减按钮）,
  初始数量（非可拓展参数组即固定长度）,
  [
    [参数名称, 参数类型, 显示内容],
    ...
  ]
],
...
```

### 示例解析

#### 1. connect 积木

```js
expandableArguments: [
  [
    false,  //填入false表示非可拓展参数组（隐藏加减按钮）
    1,      //固定显示1个
    [
      [
        'TEXT', //参数名称
        'text', //参数类型
        function (index, length) { //参数内容
          if (length[1] > 0) return 'join';
          else return 'empty text'
          /*
            参数内容可以是一个字符串，也可以是一个函数
            函数的参数有
            1. index：当前参数在参数组里的索引
            2. length（array）：各参数组的数量
          */
        }
      ] //通过function动态获取参数内容
    ]
  ],
  [
    true,   //填入true表示可拓展参数组（显示加减按钮）
    0,      //初始0个输入
    [
      [
        'INPUT',
        'string',
        function (index, length) {
          return `text${index}`;
        }

    ]
  ]
]
```

#### 2. connectOptions 积木

```js
expandableArguments: [
  [
    false, 1,
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
    true, 0,
    [
      [
        'INPUT',
        'list',
        [
          ["a","a"],
          ["b","b"],
          ["c","c"]
        ]
      ] //下拉列表选项
    ]
  ]
]
```

#### 3. array 积木

```js
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
    ] //数组开始符号
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
      ] //逗号分隔符
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
]
```

### 说明
#### **动态文本生成**：
 使用函数动态生成显示内容，如：
```js
function (index, length) {
   if (length[1] &gt; 0) return 'join';
   else return 'empty text'
}
 ```
函数参数:
  1. index：当前参数在参数组里的索引
  2. length（array）：各参数组的数量

####  **参数类型支持**：
   - `text`: 文本
   - `string`: 字符串输入框
   - `list`: 下拉菜单
   - `boolean`: 布尔值输入

#### **参数组类型**：
   - 定义了 `false` 的参数组表示固定长度
   - 定义了 `true` 的参数组表示可拓展参数
