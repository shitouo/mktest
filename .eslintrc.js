// https://github.com/AlloyTeam/eslint-config-alloy
module.exports = {
    extends: [
        'eslint-config-alloy',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        //
        // jQuery: false,
        // $: false
        OMReport: false,
        g_userStatus: false, //全局用户状态
        g_publishStatus: false, //全局发布状态
        g_userInfo: false, //全局用户信息
        document: false, // 浏览器环境
        location: false,
        define: false,
        $: false,
        utils: false,
        layer: false,
        tvp: false,
        window: false,
        WdatePicker: false,
        rsa_encrypt: false,
        $body: false,
        allWhiteListStatus: false,
        UE: false,
        OMOperationReport: false,
        OMTimeoutReport: false,
        UEDITOR_CONFIG: false,
        OM_BASE: false,
        jQuery: false,
    },
    rules: {
        'no-throw-literal': ['warn'],
        'no-unused-vars': ['warn'],
        'no-param-reassign': ['warn'],
        'no-undefined': ['warn'],
        'no-control-regex': ['warn'],
        'eqeqeq': ['warn'],
        // 这里填入你的项目需要的个性化配置，比如：
        //
        // // @fixable 一个缩进必须用两个空格替代
        // 'indent': [
        //     'error',
        //     2,
        //     {
        //         SwitchCase: 1,
        //         flatTernaryExpressions: true
        //     }
        // ]
    },
    "settings": {
        // "propWrapperFunctions": [
        //     // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        //     "forbidExtraProps",
        //     { "property": "freeze", "object": "Object" },
        //     { "property": "myFavoriteWrapper" }
        // ]
    }
  };
  
  