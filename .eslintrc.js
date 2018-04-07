module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "globals": {
        "__env": false //全局变量__env不可被重写
    },
    "extends": [
        "eslint:recommended",  //启用推荐的规则
        "plugin:react/recommended"
    ],
    'parser': 'babel-eslint',
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module", //ECMAScript 模块。
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true //如果你的代码是 ECMAScript 模块。
        }
    },
    "rules": {
        "indent": [
            "error",
            4,
            {
                "VariableDeclarator": {  //之前设置为4个,多行变量声明将会分别为 var 和 let 语句缩进 8 个空格，const 语句缩进 12 个空格语句。
                    "var": 2,
                    "let": 2,
                    "const": 3
                },
                "SwitchCase": 1  // 强制 switch 语句中的 case 子句的缩进级别,即缩进4个
            }
        ],
        "quotes": [
            "error",
            "double"
        ],
        "comma-dangle": [  //禁止使用拖尾逗号,即对象最后一个属性不能有逗号
            "error",
            "never"
        ],
        "no-empty": [  //禁止空语块,就是{}内什么都没有,试试对象是否可以?
            "error",
            {
                "allowEmptyCatch": true  //允许出现空的 catch 子句 (也就是说，不包含注释)
            }
        ],
        "no-unused-vars": [  //禁止未使用的声明
            "error",
            { 
                "args": "none",  //do not check arguments,形参除外
                "caughtErrors": "none" //此规则不用于catch语块,及时有形参error,未使用也可以
            }
        ],
        "no-console": "off",
        "no-mixed-spaces-and-tabs": "off"  //允许空格tab混合缩进
    }
};