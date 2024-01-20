(function(Scratch){
  "use strict";

  const Icon="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS41IiBoZWlnaHQ9Ijc5LjUiIHZpZXdCb3g9IjAsMCw3OS41LDc5LjUiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDAuMjUsLTE0MC4yNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjAwLjI1LDE4MGMwLC0yMS45NTMzMiAxNy43OTY2OCwtMzkuNzUgMzkuNzUsLTM5Ljc1YzIxLjk1MzMyLDAgMzkuNzUsMTcuNzk2NjggMzkuNzUsMzkuNzVjMCwyMS45NTMzMiAtMTcuNzk2NjgsMzkuNzUgLTM5Ljc1LDM5Ljc1Yy0yMS45NTMzMiwwIC0zOS43NSwtMTcuNzk2NjggLTM5Ljc1LC0zOS43NXoiIGZpbGw9IiMwZTdiZWQiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMi41Ij48cGF0aCBkPSJNMjIxLjg1OTM2LDE4OC44NjM3NGw3LjEzNTQsLTQuMTgzMDgiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIyMi4wMTk4MiwxODkuNDIxMzRjMS45ODU2NSwzLjM4NzA4IDAuODQ5NTcsNy43NDI1NCAtMi41Mzc1MSw5LjcyODJjLTMuMzg3MDgsMS45ODU2NSAtNy43NDI1NSwwLjg0OTU3IC05LjcyODIsLTIuNTM3NTFjLTEuOTg1NjUsLTMuMzg3MDggLTAuODQ5NTcsLTcuNzQyNTQgMi41Mzc1MSwtOS43MjgyYzMuMzg3MDgsLTEuOTg1NjUgNy43NDI1NSwtMC44NDk1NyA5LjcyODIsMi41Mzc1MXoiIHN0cm9rZT0iI2ViNTk1OSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTljMGViIiBzdHJva2Utd2lkdGg9IjIuNSI+PHBhdGggZD0iTTIzOS45OTc5NCwxNTguNTA0ODd2OC4yNzExNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIzMi44MTM1NiwxNTEuMzA3NTJjMCwtMy45Njc4MyAzLjIxNjU2LC03LjE4NDM5IDcuMTg0MzksLTcuMTg0MzljMy45Njc4MiwwIDcuMTg0MzgsMy4yMTY1NiA3LjE4NDM4LDcuMTg0MzljMCwzLjk2NzgzIC0zLjIxNjU2LDcuMTg0MzggLTcuMTg0MzgsNy4xODQzOGMtMy45Njc4MiwwIC03LjE4NDM5LC0zLjIxNjU2IC03LjE4NDM5LC03LjE4NDM4eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyLjUiPjxwYXRoIGQ9Ik0yNTguMTQwNjQsMTg4Ljg2Mzc0bC03LjEzNTQsLTQuMTgzMDgiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI2Ny43MDgzOCwxODYuODgzODNjMy4zODcwOCwxLjk4NTY1IDQuNTIzMTYsNi4zNDExMSAyLjUzNzUxLDkuNzI4MmMtMS45ODU2NSwzLjM4NzA4IC02LjM0MTEyLDQuNTIzMTYgLTkuNzI4MiwyLjUzNzUxYy0zLjM4NzA4LC0xLjk4NTY1IC00LjUyMzE2LC02LjM0MTExIC0yLjUzNzUxLC05LjcyODJjMS45ODU2NSwtMy4zODcwOCA2LjM0MTExLC00LjUyMzE2IDkuNzI4MiwtMi41Mzc1MXoiIHN0cm9rZT0iIzZmZWI1OSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiPjxnIGZpbGw9IiM4YmQ3ZjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PGc+PHBhdGggZD0iTTI0MS45NTUxNywxNjMuMjQ5MTRsMC45MDUxOCwzLjUxMjA3bDMuNDM5NjUsMS41OTMxbC0xLjYyOTMxLDIuODk2NTVsLTkuNjY3MjQsLTAuMTA4NjJsLTEuMzAzNDUsLTIuODk2NTVsMy40NzU4NiwtMS40NDgyN2wwLjg2ODk3LC0zLjU0ODI4eiIvPjxwYXRoIGQ9Ik0yMzguMDQ0ODIsMTk2Ljc1MDg2bC0wLjg2ODk3LC0zLjU0ODI3bC0zLjQ3NTg2LC0xLjQ0ODI3bDEuMzAzNDUsLTIuODk2NTVsOS42NjcyNCwtMC4xMDg2MmwxLjYyOTMxLDIuODk2NTVsLTMuNDM5NjUsMS41OTMxbC0wLjkwNTE4LDMuNTEyMDd6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48Zz48cGF0aCBkPSJNMjIzLjI0OTE0LDE3OC4wNDQ4M2wzLjUxMjA3LC0wLjkwNTE4bDEuNTkzMSwtMy40Mzk2NmwyLjg5NjU1LDEuNjI5MzFsLTAuMTA4NjIsOS42NjcyNGwtMi44OTY1NSwxLjMwMzQ1bC0xLjQ0ODI3LC0zLjQ3NTg2bC0zLjU0ODI4LC0wLjg2ODk3eiIvPjxwYXRoIGQ9Ik0yNTYuNzUwODYsMTgxLjk1NTE3bC0zLjU0ODI3LDAuODY4OTdsLTEuNDQ4MjcsMy40NzU4NmwtMi44OTY1NSwtMS4zMDM0NWwtMC4xMDg2MiwtOS42NjcyNGwyLjg5NjU1LC0xLjYyOTMxbDEuNTkzMSwzLjQzOTY2bDMuNTEyMDcsMC45MDUxOHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0yNTMuMjI3MTYsMTY5LjUzNzg3bC0xLjg0MzM1LDMuMTIzNDZsMS4zMDU3MSwzLjU1ODdsLTMuMjAwMjcsMC44OTYwN2wtNi43NTg5NywtNi45MTI1OGwxLjEyNjQ5LC0yLjk2OTg1bDMuNDgxODksMS40MzM3MmwzLjEyMzQ2LC0xLjg5NDU2eiIvPjxwYXRoIGQ9Ik0yMjYuNzcyODMsMTkwLjQ2MjEzbDEuODk0NTYsLTMuMTIzNDZsLTEuNDMzNzIsLTMuNDgxODlsMi45Njk4NSwtMS4xMjY0OWw2LjkxMjU4LDYuNzU4OTdsLTAuODk2MDgsMy4yMDAyN2wtMy41NTg3LC0xLjMwNTcxbC0zLjEyMzQ2LDEuODQzMzV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48Zz48cGF0aCBkPSJNMjI5LjUzNzg3LDE2Ni43NzI4NGwzLjEyMzQ2LDEuODQzMzVsMy41NTg3LC0xLjMwNTcxbDAuODk2MDgsMy4yMDAyN2wtNi45MTI1OCw2Ljc1ODk3bC0yLjk2OTg1LC0xLjEyNjQ5bDEuNDMzNzIsLTMuNDgxODlsLTEuODk0NTYsLTMuMTIzNDZ6Ii8+PHBhdGggZD0iTTI1MC40NjIxMywxOTMuMjI3MTZsLTMuMTIzNDYsLTEuODk0NTZsLTMuNDgxODksMS40MzM3MmwtMS4xMjY0OSwtMi45Njk4NWw2Ljc1ODk3LC02LjkxMjU4bDMuMjAwMjcsMC44OTYwN2wtMS4zMDU3MSwzLjU1ODdsMS44NDMzNSwzLjEyMzQ2eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48L2c+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNMjI5LjQ1NDE1LDE3OS43YzAsLTUuODI0MzEgNC43MjE1NCwtMTAuNTQ1ODUgMTAuNTQ1ODUsLTEwLjU0NTg1YzUuODI0MzEsMCAxMC41NDU4NCw0LjcyMTU0IDEwLjU0NTg0LDEwLjU0NTg1YzAsNS44MjQzMSAtNC43MjE1NCwxMC41NDU4NSAtMTAuNTQ1ODQsMTAuNTQ1ODVjLTUuODI0MzEsMCAtMTAuNTQ1ODUsLTQuNzIxNTMgLTEwLjU0NTg1LC0xMC41NDU4NXoiIGZpbGw9IiM1OWMwZWIiLz48cGF0aCBkPSJNMjMxLjk4MDcyLDE3OS43YzAsLTQuNDI4OTIgMy41OTAzNiwtOC4wMTkyOCA4LjAxOTI4LC04LjAxOTI4YzQuNDI4OTIsMCA4LjAxOTI4LDMuNTkwMzUgOC4wMTkyOCw4LjAxOTI4YzAsNC40Mjg5MiAtMy41OTAzNSw4LjAxOTI4IC04LjAxOTI4LDguMDE5MjhjLTQuNDI4OTIsMCAtOC4wMTkyOCwtMy41OTAzNSAtOC4wMTkyOCwtOC4wMTkyOHoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjM5Ljc1OjM5Ljc1LS0+";

  Scratch.translate.setup({
    'en':{
      //qxsckeasystruct
      'qxsckeasystruct.name':'Easy struct',

      'qxsckeasystruct.type':"type",
      'qxsckeasystruct.length':"length",
      'qxsckeasystruct.memberLength':"number of members",
      'qxsckeasystruct.members':"members",

      'qxsckeasystruct.structTypes':"struct types",
      'qxsckeasystruct.structs':"structs",
      'qxsckeasystruct.structLists':"struct lists",

      'qxsckeasystruct.clearAll':"clear all",
      'qxsckeasystruct.clearData':'clear all [TYPE]',

      'qxsckeasystruct.setStructType':'set struct type,name = [NAME] , members = [MEMBERS]',
      'qxsckeasystruct.setStruct':'set struct,name = [NAME] , type = [TYPE]',
      'qxsckeasystruct.setStructList':'set struct list,name = [NAME] , type = [TYPE]',
      'qxsckeasystruct.getStructTypeData':'[TYPE] in struct type [NAME]',
      'qxsckeasystruct.getData':'all [TYPE]',
      'qxsckeasystruct.deleteData':'delete [TYPE] [NAME]',

      'qxsckeasystruct.checkData':'have [TYPE] [NAME] ?',
      'qxsckeasystruct.checkDataMember':'[TYPE] [NAME] have member [MEMBER] ?',

      'qxsckeasystruct.getStructType':'type in struct [NAME]',
      'qxsckeasystruct.setStructMemberData':'set member [MEMBER] in struct [NAME] to [DATA]',
      'qxsckeasystruct.getStructMember':'member [MEMBER] in struct [NAME]',
      'qxsckeasystruct.getStructMemberIndex':'item [INDEX] of members in struct [NAME]',

      'qxsckeasystruct.getStructListData':'[TYPE] in struct list [NAME]',
      'qxsckeasystruct.structListPushData':'push [NUM] none datas to struct list [NAME]',

      'qxsckeasystruct.setStructListMemberData':'set item [INDEX] of member [MEMBER] in struct list [NAME] to [DATA]',
      'qxsckeasystruct.getStructListMember':'item [INDEX] of member [MEMBER] in struct list [NAME]',
      'qxsckeasystruct.getStructListMemberIndex':'item [INDEX2] of the [INDEX] member in the struct list [NAME]',
      'qxsckeasystruct.deleteStructListMember':'delete item [INDEX] in struct list [NAME]',
      'qxsckeasystruct.structListSort':'sort struct list [NAME] with rule [RULE]',
    },
    'zh': {
      //qxsckeasystruct
      'qxsckeasystruct.name':'简易结构体',

      'qxsckeasystruct.type':"类型",
      'qxsckeasystruct.length':"长度",
      'qxsckeasystruct.memberLength':"成员数量",
      'qxsckeasystruct.members':"成员",

      'qxsckeasystruct.structTypes':"结构体定义",
      'qxsckeasystruct.structs':"结构体",
      'qxsckeasystruct.structLists':"结构体列表",

      'qxsckeasystruct.clearAll':"清空所有数据",
      'qxsckeasystruct.clearData':'清空所有 [TYPE]',

      'qxsckeasystruct.setStructType':'设置结构体类型，类型名称 = [NAME] ，成员 = [MEMBERS]',
      'qxsckeasystruct.setStruct':'设置结构体，结构体名称 = [NAME] ，结构体类型名称 = [TYPE]',
      'qxsckeasystruct.setStructList':'设置结构体列表，结构体列表名称 = [NAME] ，结构体类型名称 = [TYPE]',
      'qxsckeasystruct.getStructTypeData':'结构体类型 [NAME] 的 [TYPE]',
      'qxsckeasystruct.getData':'所有 [TYPE]',
      'qxsckeasystruct.deleteData':'删除 [TYPE] [NAME]',

      'qxsckeasystruct.checkData':'存在 [TYPE] [NAME] ？',
      'qxsckeasystruct.checkDataMember':'[TYPE] [NAME] 存在成员 [MEMBER] ？',

      'qxsckeasystruct.getStructType':'结构体 [NAME] 的类型',
      'qxsckeasystruct.setStructMemberData':'设置结构体 [NAME] 的成员 [MEMBER] 的数据为 [DATA]',
      'qxsckeasystruct.getStructMember':'结构体 [NAME] 的成员 [MEMBER]',
      'qxsckeasystruct.getStructMemberIndex':'结构体 [NAME] 的第 [INDEX] 个成员',

      'qxsckeasystruct.getStructListData':'结构体列表 [NAME] 的 [TYPE]',
      'qxsckeasystruct.structListPushData':'结构体列表 [NAME] 增加 [NUM] 项空白项',

      'qxsckeasystruct.setStructListMemberData':'设置结构体列表 [NAME] 的第 [INDEX] 项的成员 [MEMBER] 的数据为 [DATA]',
      'qxsckeasystruct.getStructListMember':'结构体列表 [NAME] 的第 [INDEX] 项的成员 [MEMBER]',
      'qxsckeasystruct.getStructListMemberIndex':'结构体列表 [NAME] 的第 [INDEX] 项的第 [INDEX2] 个成员',
      'qxsckeasystruct.deleteStructListMember':'删除结构体列表 [NAME] 的第 [INDEX] 项',
      'qxsckeasystruct.structListSort':'使用规则 [RULE] 排序结构体列表 [NAME]',
    },
  });

  class struct {
    constructor() {
      this.structs=Object.create(null);
      this.useStructs=Object.create(null);
      this.useStructLists=Object.create(null);
      this.structListsortFunc=function(rule_member,rule_type,rule_order){
        return(a,b)=>{
          for(let i=0;i<rule_member.length;i++){
            let key=rule_member[i],value=rule_order[i],type_=rule_type[i];
            //console.log(key,value,type_,i);
            if(value==='none') continue;
            let cmp_;
            if(type_==='str'){
              let aval=a[key],bval=b[key];
              cmp_=(value==='asc' ?
                aval<bval?-1 : aval>bval?1:0
                : aval>bval?-1 : aval<bval?1:0
              );
            }else{
              let aval=isNaN(Number(a[key]))?0:Number(a[key]),
                  bval=isNaN(Number(b[key]))?0:Number(b[key]);
              cmp_=(value==='asc' ? aval-bval : bval-aval);
            }
            if(cmp_!=0) return cmp_;
          }
          return 0;
        };
      };
    }
    getInfo() {
      return {
      id: "qxsckeasystruct",
      name: Scratch.translate({id: "qxsckeasystruct.name",default: "Easy struct"}),
      color1: '#0e7bed',
      color2: '#0e7bed',
      color3: '#0e7bed',
      blockIconURI: Icon,
      menuIconURI: Icon,
        blocks: [
          //command,reporter,Boolean,hat
          {
            opcode: "clearAll",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.clearAll",default: "clear all"}),
            arguments: {},
          },
          {
            opcode: "clearData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.clearData",default: "clear all [TYPE]"}),
            arguments: {
              TYPE:{
                type: 'string',
                defaultValue: 'structTypes',
                menu: 'structData.List',
              },
            },
          },

          '---',

          {
            opcode: "setStructType",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.setStructType",default: "set struct type,name = [NAME],members = [MEMBERS]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              MEMBERS: {
                type: 'string',
                defaultValue: 'mem1 mem2'
              },
            },
          },
          {
            opcode: "setStruct",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.setStruct",default: "set struct,name = [NAME],type = [TYPE]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              TYPE: {
                type: 'string',
                defaultValue: 'struct_'
              },
            },
          },
          {
            opcode: "setStructList",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.setStructList",default: "set struct list,name = [NAME],type = [TYPE]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              TYPE: {
                type: 'string',
                defaultValue: 'struct_'
              },
            },
          },
          {
            opcode: "getStructTypeData",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getStructTypeData",default: "[TYPE] in struct type [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              TYPE:{
                type: 'string',
                defaultValue: 'length',
                menu: 'getStructTypeData.List',
              },
            },
          },
          {
            opcode: "getData",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getData",default: "get [TYPE]"}),
            arguments: {
              TYPE:{
                type: 'string',
                defaultValue: 'structTypes',
                menu: 'structData.List',
              },
            },
          },
          {
            opcode: "deleteData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.deleteData",default: "delete [TYPE] [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              TYPE:{
                type: 'string',
                defaultValue: 'structTypes',
                menu: 'structData.List',
              },
            },
          },

          '---',

          {
            opcode: "checkData",
            blockType: 'Boolean',
            text: Scratch.translate({id: "qxsckeasystruct.checkData",default: "have [TYPE] [NAME] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              TYPE:{
                type: 'string',
                defaultValue: 'structTypes',
                menu: 'structData.List',
              },
            },
          },
          {
            opcode: "checkDataMember",
            blockType: 'Boolean',
            text: Scratch.translate({id: "qxsckeasystruct.checkDataMember",default: "[TYPE] [NAME] have member [MEMBER] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              TYPE:{
                type: 'string',
                defaultValue: 'structTypes',
                menu: 'structData.List',
              },
            },
          },

          '---',

          {
            opcode: "getStructType",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getStructType",default: "type in struct [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
            },
          },
          {
            opcode: "setStructMemberData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.setStructMemberData",default: "set member [MEMBER] in struct [NAME] to [DATA]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              DATA: {
                type: 'string',
                defaultValue: 'data'
              },
            },
          },
          {
            opcode: "getStructMember",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getStructMember",default: "member [MEMBER] in struct [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
            },
          },
          {
            opcode: "getStructMemberIndex",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getStructMemberIndex",default: "item [INDEX] of members in struct [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },

          '---',

          {
            opcode: "getStructListData",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getStructListData",default: "[TYPE] in struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              TYPE:{
                type: 'string',
                defaultValue: 'type',
                menu: 'getStructListData.List',
              }
            },
          },
          {
            opcode: "structListPushData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.structListPushData",default: "push [NUM] datas to struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              NUM: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "setStructListMemberData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.setStructListMemberData",default: "set item [INDEX] of member [MEMBER] in struct list [NAME] to [DATA]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              DATA: {
                type: 'string',
                defaultValue: 'data'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "getStructListMember",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getStructListMember",default: "item [INDEX] of member [MEMBER] in struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "getStructListMemberIndex",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasystruct.getStructListMemberIndex",default: "item [INDEX2] of the [INDEX] member in the struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
              INDEX2: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "deleteStructListMember",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.deleteStructListMember",default: "delete item [INDEX] in struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "structListSort",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasystruct.structListSort",default: "sort struct list [NAME] with rule [RULE]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              RULE: {
                type: 'string',
                defaultValue: 'mem1 num asc mem2 str none'
              },
            },
          },
        ],
        menus: {
          'getStructListData.List':[
            {
              text: Scratch.translate({id: "qxsckeasystruct.type",default: "type"}),
              value: 'type'
            },
            {
              text: Scratch.translate({id: "qxsckeasystruct.length",default: "length"}),
              value: 'length'
            },
          ],
          'structData.List':[
            {
              text: Scratch.translate({id: "qxsckeasystruct.structTypes",default: "struct types"}),
              value: 'structTypes'
            },
            {
              text: Scratch.translate({id: "qxsckeasystruct.structs",default: "structs"}),
              value: 'structs'
            },
            {
              text: Scratch.translate({id: "qxsckeasystruct.structLists",default: "structLists"}),
              value: 'structLists'
            },
          ],
          'getStructTypeData.List':[
            {
              text: Scratch.translate({id: "qxsckeasystruct.memberLength",default: "number of members"}),
              value: 'length'
            },
            {
              text: Scratch.translate({id: "qxsckeasystruct.members",default: "members"}),
              value: 'members'
            },
          ],
        }
      };
    }

    clearAll(){
      this.structs=Object.create(null);
      this.useStructs=Object.create(null);
      this.useStructLists=Object.create(null);
    }
    clearData(args){
      let type_=String(args.TYPE);
      if(type_==='structTypes'){
        this.structs=Object.create(null);
        this.useStructs=Object.create(null);
        this.useStructLists=Object.create(null);
      }
      else if(type_==='structs') this.useStructs=Object.create(null);
      else if(type_==='structLists') this.useStructLists=Object.create(null);
    }

    setStructType(args){
      let name=String(args.NAME),members=String(args.MEMBERS).split(' ');
      if(!(name in this.structs)){
        let flag=0,v={};
        for(let i in members){
          if(v[members[i]]) flag=1;
          v[members[i]] = true;
        }
        if(flag===0){
          this.structs[name]=members;
        }
      }
    }
    setStruct(args){
      let name=String(args.NAME),type=String(args.TYPE);
      if(!(name in this.useStructs)){
        if(type in this.structs){
          let members=this.structs[type];
          let json={"type":type,"data":{}};
          for(let i in members) json['data'][members[i]]="";
          this.useStructs[name]=json;
        }
      }
    }
    setStructList(args){
      let name=String(args.NAME),type=String(args.TYPE);
      if(!(name in this.useStructLists)){
        if(type in this.structs){
          let members=this.structs[type];
          let json={"type":type,"members":members,"data":[]};
          this.useStructLists[name]=json;
        }
      }
    }
    getStructTypeData(args){
      let name=String(args.NAME),type_=String(args.TYPE);
      if(name in this.structs){
        if(type_==='length') return this.structs[name].length;
        else if(type_==='members'){
          let members=this.structs[name];
          return '['+members.map(value=>'"'+String(value)+'"').join(',')+']';
        }
      }else return '';
    }
    getData(args){
      let type_=String(args.TYPE);
      if(type_==='structTypes') return '['+Object.keys(this.structs).map(value=>'"'+String(value)+'"').join(',')+']';
      else if(type_==='structs') return '['+Object.keys(this.useStructs).map(value=>'"'+String(value)+'"').join(',')+']';
      else if(type_==='structLists') return '['+Object.keys(this.useStructLists).map(value=>'"'+String(value)+'"').join(',')+']';
      else return '';
    }
    deleteData(args){
      let type_=String(args.TYPE),name=String(args.NAME);
      if(type_==='structTypes'){
        if((name in this.structs)){
          delete this.structs[name];
          for(let key in Object.keys(this.useStructs)){
            if(this.useStructs[key].type===name){
              delete this.useStructs[key];
            }
          }
          for(let key in Object.keys(this.useStructLists)){
            if(this.useStructLists[key].type===name){
              delete this.useStructLists[key];
            }
          }
        }
      }
      else if(type_==='structs'){
        if((name in this.useStructs)) delete this.useStructs[name];
      }
      else if(type_==='structLists'){
        if((name in this.useStructLists)) delete this.useStructLists[name];
      }
    }

    checkData(args){
      let type_=String(args.TYPE),name=String(args.NAME);
      if(type_==='structTypes') return (name in this.structs);
      else if(type_==='structs') return (name in this.useStructs);
      else if(type_==='structLists') return (name in this.useStructLists);
      else return '';
    }
    checkDataMember(args){
      let type_=String(args.TYPE),name=String(args.NAME),member=String(args.MEMBER);
      if(type_==='structTypes'){
        if(name in this.structs) return (this.structs[name].indexOf(member)>-1);
        else return false;
      }
      else if(type_==='structs'){
        if(name in this.useStructs) return (member in this.useStructs[name]['data']);
        else return false;
      }
      else if(type_==='structLists'){
        if(name in this.useStructLists) return (this.useStructLists[name]['members'].indexOf(member)>-1);
        else return false;
      }
      else return '';
    }

    getStructType(args){
      let name=String(args.NAME);
      if(name in this.useStructs) return this.useStructs[name]['type'];
      else return '';
    }
    setStructMemberData(args){
      let name=String(args.NAME),member=String(args.MEMBER),data=String(args.DATA);
      if(name in this.useStructs) if(member in this.useStructs[name]['data']) this.useStructs[name]['data'][member]=data;
    }
    getStructMember(args){
      let name=String(args.NAME),member=String(args.MEMBER);
      if(name in this.useStructs){
        if(member in this.useStructs[name]['data']) return this.useStructs[name]['data'][member];
        else return '';
      }
      else return '';
    }
    getStructMemberIndex(args){
      let name=String(args.NAME),index=Number(args.INDEX);
      if(name in this.useStructs){
        let members=Object.keys(this.useStructs[name]['data']);
        if(index<=members.length) return this.useStructs[name]['data'][members[index-1]];
        else return '';
      }
      else return '';
    }

    getStructListData(args){
      let type_=String(args.TYPE),name=String(args.NAME);
      if(type_==="type"){
        if(name in this.useStructLists) return this.useStructLists[name]['type'];
        return '';
      }else if(type_==='length'){
        if(name in this.useStructLists) return this.useStructLists[name]['data'].length;
        else return -1;
      }else return '';
    }
    structListPushData(args){
      let name=String(args.NAME),num=Number(args.NUM);
      if(name in this.useStructLists){
        let type=this.useStructLists[name]['type'],members=this.structs[type],json={};
        for(let i in members) json[members[i]]="";
        for(let i=0;i<num;i++) this.useStructLists[name]['data'].push(json);
      }
    }
    setStructListMemberData(args){
      let name=String(args.NAME),member=String(args.MEMBER),data=String(args.DATA),index=Number(args.INDEX);
      if(name in this.useStructLists)
        if(index<=this.useStructLists[name]['data'].length)
          if(member in this.useStructLists[name]['data'][index-1]) this.useStructLists[name]['data'][index-1][member]=data;
    }
    getStructListMember(args){
      let name=String(args.NAME),member=String(args.MEMBER),index=Number(args.INDEX);
      if(name in this.useStructLists){
        if(index<=this.useStructLists[name]['data'].length){
          if(member in this.useStructLists[name]['data'][index-1]) return this.useStructLists[name]['data'][index-1][member];
          else return '';
        }
        else return '';
      }
      else return '';
    }
    getStructListMemberIndex(args){
      let name=String(args.NAME),index=Number(args.INDEX),index2=Number(args.INDEX2);
      if(name in this.useStructLists) if(index<=this.useStructLists[name]['data'].length){
        let members=Object.keys(this.useStructLists[name]['data'][index-1]);
        if(index2<=members.length) return this.useStructLists[name]['data'][index-1][members[index2-1]];
        else return '';
      }
      else return '';
    }
    deleteStructListMember(args){
      let name=String(args.NAME),index=Number(args.INDEX);
      if(name in this.useStructLists)
        if(index<=this.useStructLists[name]['data'].length)
          this.useStructLists[name]['data'].splice(index-1, 1);
    }
    sortHelp(){
      return this.formatMessage("qxsckeasystruct.sort.tip");
    }
    structListSort(args){
      let name=String(args.NAME),rule_arr=String(args.RULE).split(" ");
      if(name in this.useStructLists){
        let type=this.useStructLists[name]['type'],members=this.structs[type];
        let flag=0;
        if(members.length===rule_arr.length/3 && rule_arr.length%3===0){
          let rule_member=[],rule_type=[],rule_order=[];
          for(let i=0;i<rule_arr.length/3;i++){
            if( (rule_arr[i*3+2]!='asc' && rule_arr[i*3+2]!='desc' && rule_arr[i*3+2]!='none') || (rule_arr[i*3+1]!='num' && rule_arr[i*3+1]!='str') ){
              flag=i;break;
            }
            else rule_member.push(rule_arr[i*3]),rule_type.push(rule_arr[i*3+1]),rule_order.push(rule_arr[i*3+2]);
          }
          if(flag===0){
            let arr=this.useStructLists[name]['data'];
            //console.log(rule_member,rule_type,rule_order);
            let result=arr.sort(this.structListsortFunc(rule_member,rule_type,rule_order));
            //console.log(result);
            this.useStructLists[name]['data']=result;
          }else{
            console.log('第'+String(flag)+'个排序项的排序规则或者排序类型有问题：');
            console.log('请确保排序规则为升序“asc”，降序“desc”，不作排序“none”，');
            console.log('请确保排序类型为字符串“str”以进行字典序排序，数字“num”以进行大小排序。');
            console.log('There is an issue with the sorting rule or type of the '+String(flag)+' th sorting item:');
            console.log('Please ensure that the sorting rule is one of ascending is "asc",descending is "desc" or not sorting is "none",');
            console.log('the sorting type is one of string "str" for lexicographic sorting or number "num" for size sorting.');
          }

        }
      }
    }
  }
  Scratch.extensions.register(new struct());
})(Scratch);
