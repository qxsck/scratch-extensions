let i10ndefaultValue={
  'qxsckdataanalysis.name': 'data analysis',
  'qxsckdataanalysis.average': 'average of [NUMBERS]',
  'qxsckdataanalysis.maximum': 'maximum of [NUMBERS]',
  'qxsckdataanalysis.minimum': 'minimum of [NUMBERS]',
  'qxsckdataanalysis.median': 'median of [NUMBERS]',
  'qxsckdataanalysis.mode': 'mode of [NUMBERS]',
  'qxsckdataanalysis.variance': 'variance of [NUMBERS]',
  'qxsckdataanalysis.standardDeviation': 'standard deviation of [NUMBERS]',
  'qxsckdataanalysis.countNumebrs':'[TYPE] for each datas in [NUMBERS]',
  'qxsckdataanalysis.averageInList': 'average of list [NUMBERS]',
  'qxsckdataanalysis.maximumInList': 'maximum of list [NUMBERS]',
  'qxsckdataanalysis.minimumInList': 'minimum of list [NUMBERS]',
  'qxsckdataanalysis.medianInList': 'median of list [NUMBERS]',
  'qxsckdataanalysis.modeInList': 'mode of list [NUMBERS]',
  'qxsckdataanalysis.varianceInList': 'variance of list [NUMBERS]',
  'qxsckdataanalysis.standardDeviationInList': 'standard deviation of list [NUMBERS]',
  'qxsckdataanalysis.countNumebrsInList':'[TYPE] for each datas in list [NUMBERS]',

  'qxsckdataanalysis.value.count': 'count',
  'qxsckdataanalysis.value.fre': 'frequency',
};

(function(Scratch) {
  'use strict';
  const vm = Scratch.vm;
  const Icon='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCwwLDgwLDgwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLC0xNDApIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwMCwxODBjMCwtMjIuMDkxMzkgMTcuOTA4NjEsLTQwIDQwLC00MGMyMi4wOTEzOSwwIDQwLDE3LjkwODYxIDQwLDQwYzAsMjIuMDkxMzkgLTE3LjkwODYxLDQwIC00MCw0MGMtMjIuMDkxMzksMCAtNDAsLTE3LjkwODYxIC00MCwtNDB6IiBmaWxsPSIjZmY5NDk0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjE1LjU5OTEyLDIwNC4yOTA5N3YtMzguMDQ2NDRNMjIxLjY5OTU3LDIwNC4yOTA5N3YtNDguNTgxOTRNMjI3Ljc5OTcxLDIwNC4yOTA5N3YtMzIuNjU1OTlNMjMzLjkwMDE2LDIwNC4yOTA5N3YtMjguOTgwODZNMjQwLDIwNC4yOTA5N3YtMTguNDQ1MzVNMjQ2LjEwMDQ1LDIwNC4yOTA5N3YtMzguMDQ2NDRNMjUyLjIwMDU5LDIwNC4yOTA5N3YtMjguOTgwODZNMjU4LjMwMDc0LDIwNC4yOTA5N3YtNDguNTgxOTRNMjY0LjQwMDg4LDIwNC4yOTA5N3YtMzIuNjU1OTkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxnIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNMjM2LjMzMDIyLDE3NS4xMDQ0MmMtMy4xMTA4LC01LjQ0NTg4IC0xLjIxODE1LC0xMi4zODI4OCA0LjIyNzczLC0xNS40OTM5M2M1LjQ0NjEzLC0zLjExMDggMTIuMzgyODgsLTEuMjE4MTUgMTUuNDkzOTMsNC4yMjc5OWMzLjExMTA1LDUuNDQ1ODggMS4yMTgxNSwxMi4zODI2MiAtNC4yMjc3MywxNS40OTM2N2MtNS40NDYxMywzLjExMTA1IC0xMi4zODI4OCwxLjIxODE1IC0xNS40OTM5MywtNC4yMjc3M3oiIGZpbGwtb3BhY2l0eT0iMC41IiBmaWxsPSIjNTk1OTU5IiBzdHJva2U9IiM0ZTRlNGUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0yNDQuMDg2NjQsMTYyLjQzMTk2YzAuNzY1NSwtMC44NzE4MiAyLjYwNzAzLC0wLjk4NTMgNC4zMDQxNSwtMC43NDI3NWMxLjcwMDQ1LDAuMjQzMDcgMy41MTU5MSwyLjEzOTMgMy4wNTA5OSwzLjIwNTExYy0wLjMzODE1LDAuNzc0NyAtMS40NjgzNywtMS4wMTExMiAtMy4zNTMzNSwtMS41MzY2MWMtMS42NTMxNiwtMC40NjA1OCAtNC42NTEyNSwtMC4xODYwNyAtNC4wMDE3OSwtMC45MjU3NXpNMjQ0LjgxNDU3LDE2NC44MDk0N2MwLjQ3MDAzLC0wLjUzNTIxIDEuNjAwMjYsLTAuNjA0NzMgMi42NDE3OSwtMC40NTU3MmMxLjA0MzgzLDAuMTQ5MDEgMi4xNTgyMSwxLjMxMjk3IDEuODcyNzIsMS45NjcwM2MtMC4yMDcyOCwwLjQ3NTQgLTAuOTAxMjEsLTAuNjIwNTggLTIuMDU4MjcsLTAuOTQzMTNjLTEuMDE0NywtMC4yODI2OCAtMi44NTQ5NSwtMC4xMTQyNSAtMi40NTYyMywtMC41NjgxOHoiIGZpbGwtb3BhY2l0eT0iMC43MDUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI2OC4xMDY1OCwxODguMzY5MzRsLTE0LjE3NDU3LC0xMC4wNTI2NWwyLjg0MzcxLC00LjAwOTk3bDE0LjE3NDU3LDEwLjA1MjY1eiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjNGU0ZTRlIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0yNTYuMjU5NDIsMTc5LjI1MDg3bC0xLjUwOTUyLC0xLjA3MDQybDIuMTU5NzQsLTMuMDQ1MzdsMS41MDk1MiwxLjA3MDY3eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NDA6NDAtLT4=';

  Scratch.translate.setup({
    zh: {
      'qxsckdataanalysis.name': '数据分析',
      'qxsckdataanalysis.average': '[NUMBERS] 的平均数',
      'qxsckdataanalysis.maximum': '[NUMBERS] 的最大数',
      'qxsckdataanalysis.minimum': '[NUMBERS] 的最小数',
      'qxsckdataanalysis.median': '[NUMBERS] 的中位数',
      'qxsckdataanalysis.mode': '[NUMBERS] 的众数',
      'qxsckdataanalysis.variance': '[NUMBERS] 的方差',
      'qxsckdataanalysis.standardDeviation': '[NUMBERS] 的标准差',
      'qxsckdataanalysis.countNumebrs':'[NUMBERS] 中每个数据出现的 [TYPE]',
      'qxsckdataanalysis.averageInList': '列表 [NUMBERS] 里所有数据的平均数',
      'qxsckdataanalysis.maximumInList': '列表 [NUMBERS] 里所有数据的最大数',
      'qxsckdataanalysis.minimumInList': '列表 [NUMBERS] 里所有数据的最小数',
      'qxsckdataanalysis.medianInList': '列表 [NUMBERS] 里所有数据的中位数',
      'qxsckdataanalysis.modeInList': '列表 [NUMBERS] 里所有数据的众数',
      'qxsckdataanalysis.varianceInList': '列表 [NUMBERS] 里所有数据的方差',
      'qxsckdataanalysis.standardDeviationInList': '列表 [NUMBERS] 里所有数据的标准差',
      'qxsckdataanalysis.countNumebrsInList':'列表 [NUMBERS] 中每个数据出现的 [TYPE]',

      'qxsckdataanalysis.value.count': '次数',
      'qxsckdataanalysis.value.fre': '频率',
    },
    en: {
      'qxsckdataanalysis.name': 'data analysis',
      'qxsckdataanalysis.average': 'average of [NUMBERS]',
      'qxsckdataanalysis.maximum': 'maximum of [NUMBERS]',
      'qxsckdataanalysis.minimum': 'minimum of [NUMBERS]',
      'qxsckdataanalysis.median': 'median of [NUMBERS]',
      'qxsckdataanalysis.mode': 'mode of [NUMBERS]',
      'qxsckdataanalysis.variance': 'variance of [NUMBERS]',
      'qxsckdataanalysis.standardDeviation': 'standard deviation of [NUMBERS]',
      'qxsckdataanalysis.countNumebrs':'[TYPE] for each datas in [NUMBERS]',
      'qxsckdataanalysis.averageInList': 'average of list [NUMBERS]',
      'qxsckdataanalysis.maximumInList': 'maximum of list [NUMBERS]',
      'qxsckdataanalysis.minimumInList': 'minimum of list [NUMBERS]',
      'qxsckdataanalysis.medianInList': 'median of list [NUMBERS]',
      'qxsckdataanalysis.modeInList': 'mode of list [NUMBERS]',
      'qxsckdataanalysis.varianceInList': 'variance of list [NUMBERS]',
      'qxsckdataanalysis.standardDeviationInList': 'standard deviation of list [NUMBERS]',
      'qxsckdataanalysis.countNumebrsInList':'[TYPE] for each datas in list [NUMBERS]',

      'qxsckdataanalysis.value.count': 'count',
      'qxsckdataanalysis.value.fre': 'frequency',
    }
  });

  class dataAnalysis {
    constructor(){
      this.formatMessage=function(id){
        return Scratch.translate({id: id,default: i10ndefaultValue[id]});
      }
      this.getData=function(numbers_,type){
        let numbers;
        if(type===1){
          try{
            let arr=JSON.parse(numbers_);
            numbers=arr;
          }catch(error){
            numbers=String(numbers_).split(' ');
          }
        }else{
          numbers=numbers_.value;
        }
        return numbers;
      }
      this.averageFunc=function(numbers_,type){
        let numbers=this.getData(numbers_,type).map(Number);

        let sum=numbers.reduce((a,b)=>a+b,0);
        return sum/numbers.length;
      }
      this.maximumFunc=function(numbers_,type){
        let numbers=this.getData(numbers_,type).map(Number);

        return Math.max(...numbers);
      }
      this.minimumFunc=function(numbers_,type){
        let numbers=this.getData(numbers_,type);
        console.log(numbers);
        return Math.min(...numbers);
      }
      this.medianFunc=function(numbers_,type){
        let numbers=this.getData(numbers_,type).map(Number);

        let sorted=numbers.sort((a,b)=>a-b);
        let middle=Math.floor(sorted.length/2);
        if (sorted.length%2===0) {
          return (sorted[middle-1]+sorted[middle])/2;
        } else {
          return sorted[middle];
        }
      }
      this.modeFunc=function(numbers_,type){
        let numbers=this.getData(numbers_,type).map(Number);

        let counts=new Map();
        let maxCount=0;
        let mode=0;
        for(const number of numbers){
          let count=counts.get(number)||0;
          count++;
          counts.set(number,count);
          if(count>maxCount) maxCount=count,mode=number;
        }
        return mode;
      }
      this.varianceFunc=function(numbers_,type){
        let numbers=this.getData(numbers_,type).map(Number);

        let mean=numbers.reduce((a,b)=>a+b,0)/numbers.length;
        let squaredDifferences=numbers.map(x=>(x-mean)**2);
        let sum=squaredDifferences.reduce((a,b)=>a+b,0);
        return sum/numbers.length;
      }
      this.standardDeviationFunc=function(numbers_,type){
        return Math.sqrt(this.varianceFunc(numbers_,type));
      }
      this.countNumebrsFunc=function(numbers_,type,type_){
        let numbers=this.getData(numbers_,type).map(String);

        const counts=new Map();
        for(const number of numbers){
          counts.set(number,counts.get(number)+1||1);
        }
        let result=new Object;
        if(type_==='count'){
          for(const [key,value] of counts) result[String(key)]=value;
          return JSON.stringify(result);
        }else if(type_==='fre'){
          let length=numbers.length;
          for(const [key,value] of counts){
            result[String(key)]=(Math.round((value/length)*100)/100);
          }
          return JSON.stringify(result);
        }else return 0;
      }
    }
    getInfo() {
      return {
        id: 'qxsckdataanalysis',
        name: Scratch.translate({ id: 'qxsckdataanalysis.name', default: 'Data Analysis' }),
        color1: '#ff9494',
        color2: '#ff9494',
        blockIconURI: Icon,
        menuIconURI: Icon,
        blocks: [
          {
            opcode: 'average',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.average'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'maximum',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.maximum'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '[1,2,3,4,5]'
              }
            }
          },
          {
            opcode: 'minimum',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.minimum'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '["1","2","3","4","5"]'
              }
            }
          },
          {
            opcode: 'median',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.median'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'mode',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.mode'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 2 3 4 5'
              }
            }
          },
          {
            opcode: 'variance',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.variance'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'standardDeviation',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.standardDeviation'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'countNumebrs',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.countNumebrs'),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              },
              TYPE: {
                type: 'string',
                menu: 'countNumebrsList'
              },
            }
          },

          {
            opcode: 'averageInList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.averageInList'),
            arguments: {
                NUMBERS: {
                    type: 'string',
                    menu: 'listMenu'
                }
            },
            disableMonitor: true,
          },
          {
              opcode: 'maximumInList',
              blockType: 'reporter',
              text: this.formatMessage('qxsckdataanalysis.maximumInList'),
              arguments: {
                  NUMBERS: {
                      type: 'string',
                      menu: 'listMenu'
                  }
              },
              disableMonitor: true,
          },
          {
              opcode: 'minimumInList',
              blockType: 'reporter',
              text: this.formatMessage('qxsckdataanalysis.minimumInList'),
              arguments: {
                  NUMBERS: {
                      type: 'string',
                      menu: 'listMenu'
                  }
              },
              disableMonitor: true,
          },
          {
              opcode: 'medianInList',
              blockType: 'reporter',
              text: this.formatMessage('qxsckdataanalysis.medianInList'),
              arguments: {
                  NUMBERS: {
                      type: 'string',
                      menu: 'listMenu'
                  }
              },
              disableMonitor: true,
          },
          {
              opcode: 'modeInList',
              blockType: 'reporter',
              text: this.formatMessage('qxsckdataanalysis.modeInList'),
              arguments: {
                  NUMBERS: {
                      type: 'string',
                      menu: 'listMenu'
                  }
              },
              disableMonitor: true,
          },
          {
            opcode: 'varianceInList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.varianceInList'),
            arguments: {
                NUMBERS: {
                    type: 'string',
                    menu: 'listMenu'
                }
            },
            disableMonitor: true,
        },
        {
          opcode: 'standardDeviationInList',
          blockType: 'reporter',
          text: this.formatMessage('qxsckdataanalysis.standardDeviationInList'),
          arguments: {
              NUMBERS: {
                  type: 'string',
                  menu: 'listMenu'
              }
          },
          disableMonitor: true,
        },
          {
            opcode: 'countNumebrsInList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckdataanalysis.countNumebrsInList'),
            arguments: {
              NUMBERS: {
                type: 'string',
                menu: 'listMenu'
              },
              TYPE: {
                type: 'string',
                menu: 'countNumebrsList'
              },
            },
            disableMonitor: true,
          },
        ],
        menus: {
          listMenu: {
            items: 'findAllList'
          },
          countNumebrsList:[
            {
              text:Scratch.translate({ id: 'qxsckdataanalysis.value.count', default: 'count' }),
              value:'count',
            },
            {
              text:Scratch.translate({ id: 'qxsckdataanalysis.value.fre', default: 'frequency' }),
              value:'fre',
            }
          ],
        }
      };
    }

    findAllList() {
      const list = [];
      const variables = vm.runtime.targets[0].variables;
      Object.keys(variables).forEach(obj => {
        if (variables[obj].type === 'list') {
        list.push({
            text: variables[obj].name,
            value: variables[obj].name,
        });
        }
      });
      if (list.length === 0) {
          list.push({
            text: `-`,
            value: 'empty'
          });
      }
      return list;
    }

    average(args) {
      return this.averageFunc(args.NUMBERS,1);
    }
    maximum(args) {
      return this.maximumFunc(args.NUMBERS,1);
    }
    minimum(args) {
      return this.minimumFunc(args.NUMBERS,1);
    }
    median(args) {
      return this.medianFunc(args.NUMBERS,1);
    }
    mode(args) {
      return this.modeFunc(args.NUMBERS,1);
    }
    variance(args) {
      return this.varianceFunc(args.NUMBERS,1);
    }
    standardDeviation(args) {
      return this.standardDeviationFunc(args.NUMBERS,1);
    }
    countNumebrs(args){
      let type_=String(args.TYPE);
      return this.countNumebrsFunc(args.NUMBERS,1,type_);
    }

    averageInList(args, util) {
      if(args.NUMBERS!='empty'){
        return this.averageFunc(util.target.lookupVariableById(args.NUMBERS),2);
      }
      return -1;
    }
    maximumInList(args, util) {
      if(args.NUMBERS!='empty'){
        return this.maximumFunc(util.target.lookupVariableById(args.NUMBERS),2);
      }
      return -1;
    }
    minimumInList(args, util) {
      if(args.NUMBERS!='empty'){
        return this.minimumFunc(util.target.lookupVariableById(args.NUMBERS),2);
      }
      return -1;
    }
    medianInList(args, util) {
      if(args.NUMBERS!='empty'){
        return this.medianFunc(util.target.lookupVariableById(args.NUMBERS),2);
      }
      return -1;
    }
    modeInList(args, util) {
      if(args.NUMBERS!='empty'){
        return this.modeFunc(util.target.lookupVariableById(args.NUMBERS),2);
      }
      return -1;
    }
    varianceInList(args, util) {
      if(args.NUMBERS!='empty'){
        return this.varianceFunc(util.target.lookupVariableById(args.NUMBERS),2);
      }
      return -1;
    }
    standardDeviationInList(args,util) {
      if(args.NUMBERS!='empty'){
        return this.standardDeviationFunc(util.target.lookupVariableById(args.NUMBERS),2);
      }
      return -1;
    }
    countNumebrsInList(args,util){
      if(args.NUMBERS!='empty'){
        let type_=String(args.TYPE);
        return this.countNumebrsFunc(util.target.lookupVariableById(args.NUMBERS),2,type_);
      }
      return '{}';
    }
  }

  Scratch.extensions.register(new dataAnalysis());
})(Scratch);
