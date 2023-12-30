class xiaoma {
    get VALUE1() {
        return [
            {text:'用户ID', value:'1'},
            {text:'用户名', value:'2'},
        ];
    }
    getInfo(){
        return {
            id: 'xiaoma',
            name: '小码王积木',
            color1: '#0fbd8c',
            color2: '#0fbd8c',
            blockIconURI: 'data:image/png;base64,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',
            menuIconURI: 'data:image/png;base64,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',
            blocks: [
                {
                    opcode: 'getXiaomaUserInfo',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '小码王 [USER_TYPE]',
                    arguments: {
                        USER_TYPE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'value1',
                            defaultValue: '用户ID'
                        },
                    },
                    disableMonitor: true,
                },
                {
                    opcode: 'xiaomaPurchase',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '花费 [MONEY] 金币购买 [COMMODITY]',
                    arguments: {
                        MONEY: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        COMMODITY: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '小码君'
                        },
                    }
                },
            ],
            menus: {
                value1: this.VALUE1
            }
        };
    }

    getXiaomaUserInfo(args){
        return 'nothing';
    }
    xiaomaPurchase(args){
        1+1;
    }
}

Scratch.extensions.register(new xiaoma());
