(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.Suffix = "ztree"; //ztree的id后缀名
    $.AKjs.isSingleChecked = false; //是否单选
    //  $.AKjs.treeId = ""; //树对象id
    //默认设置
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid"
            }
        },
        view: {
            selectedMulti: false
        },
        async: {
            enable: true,
            url: ""

        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "ps", "N": "s" }
        },
        callback: {
            onCheck: singleChecked,
            onAsyncSuccess: null,
            beforeAsync: null
        }
    };
    //    //对象
    //    $.fn.AtawZTree = {
    //        getSelectedNodesID: function () {//获取节点id
    //            if (this.id == undefined) {
    //                this.init();
    //            }
    //            var treeObj = $.fn.zTree.getZTreeObj(this.id);
    //            var nodes = treeObj.getCheckedNodes(true);
    //            var list = new Array();
    //            for (var i = 0; i < nodes.length; i++) {
    //                list.push(nodes[i].id);
    //            }
    //            return list;
    //        },
    //        init: function (options) {//初始化
    //            var defaults = {
    //                id: "atawztree",
    //                setting: setting,
    //                data: [],
    //                url: ""
    //            };
    //            opts = $.extend(defaults, options);
    //            this.id = opts.id;
    //            opts.setting.async.url = opts.url;
    //            $.fn.zTree.init($("#" + opts.id), opts.setting, opts.data); //实例树
    //        },
    //        isCheckedAll: function (arg) {//是否全选
    //            var treeObj = $.fn.zTree.getZTreeObj(this.id);
    //            if (arg || arg == "true") {
    //                treeObj.checkAllNodes(true);
    //            }
    //            else if (!arg || arg == "false") {
    //                treeObj.checkAllNodes(false);
    //            }
    //        },
    //        setNodesChecked: function (jsonvalue) {//设置节点选中状态
    //            var treeObj = $.fn.zTree.getZTreeObj(this.id);
    //            jsonvalue = eval(jsonvalue);
    //            $.each(jsonvalue, function (i, item) {
    //                var node = treeObj.getNodeByParam("id", item.id, null);
    //                treeObj.checkNode(node, true);
    //            })      
    //        }

    //    }


    //对象
    $.fn.AtawRightTree = function (options) {
        var defaults = {
            setting: setting,
            data: [],
            url: "",
            isCheckedAll: false,
            multi: true,
            onClick: null,
            chk: true
        };
        var opts = $.extend(defaults, options);
        new atawZtreeObj(this, opts);
    }

    function atawZtreeObj(divobj, options) {
        var id = $(divobj).attr("id") + $.AKjs.Suffix;
        $.AKjs.isSingleChecked = !options.multi;
        var strHtml = '';
        var ul = '<ul id="' + id + '" class="ztree"></ul>'
        if (options.isCheckedAll && options.multi) {
            strHtml = '<span>全选</span>：<input type="checkbox" id="' + id + 'chkall" />' + ul;
        }
        else {
            strHtml = ul;
        }
        var _$html = strHtml;
        $(divobj).html(_$html);
        options.setting.async.url = options.url;
        options.setting.check.enable = options.chk;
        options.setting.callback.onAsyncSuccess = options.asyncSuccess;
        options.setting.callback.beforeAsync = options.beforeAsync;
        if (!options.multi) {//单选

            options.setting.check.chkboxType = { "Y": "", "N": "" };
            options.setting.callback.onCheck = singleChecked;
        }
        else {
            options.setting.callback.onCheck = "";

        }
        if (options.onClick != null && options.onClick != undefined && typeof (options.onClick) == "function") {

            options.setting.callback.onClick = options.onClick;
        }

        $.fn.zTree.init($("#" + id), options.setting, options.data); //实例树      
        //全选按钮的事件
        $("#" + id + "chkall").change(function () {
            var treeObj = $.fn.zTree.getZTreeObj(id);
            var flag = $(this).is(":checked")
            treeObj.checkAllNodes(flag);
        })
    }

    //设置ztree只能单选
    function singleChecked(event, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        treeObj.checkAllNodes(false);
        treeObj.checkNode(treeNode, true);
    }


    //获取id集合
    $.fn.getSelectedNodesID = function () {
        var id = $(this).attr("id") + $.AKjs.Suffix;
        var list = ZtreeGetValue(id);
        return list;
    }

    //获取选中的节点
    $.fn.getSelectedNodes = function () {
        var id = $(this).attr("id") + $.AKjs.Suffix;
        var treeObj = $.fn.zTree.getZTreeObj(id);
        var nodes = treeObj.getCheckedNodes(true);
        return nodes;
    }

    function ZtreeGetValue(treeId) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        var nodes = treeObj.getCheckedNodes(true);
        var idlist = new Array(); //id的集合
        for (var i = 0; i < nodes.length; i++) {
            idlist.push(nodes[i].id);
        }
        return idlist;
    }


    //是否全选
    $.fn.isCheckedAll = function (arg) {
        var id = $(this).attr("id") + $.AKjs.Suffix;
        var treeObj = $.fn.zTree.getZTreeObj(id);
        if (arg || arg == "true") {
            treeObj.checkAllNodes(true);
        }
        else if (!arg || arg == "false") {
            treeObj.checkAllNodes(false);
        }
    }
    //设置节点选中状态
    $.fn.setNodesChecked = function (jsonvalue) {
        var id = $(this).attr("id") + $.AKjs.Suffix;
        var issinglechecked = $.AKjs.isSingleChecked; //是否单选
        var treeObj = $.fn.zTree.getZTreeObj(id);
        jsonvalue = eval(jsonvalue);
        $.each(jsonvalue, function (i, item) {
            var node = treeObj.getNodeByParam("id", item.id, null);
            if (node != null)
                treeObj.checkNode(node, true);
            if (issinglechecked) {//如果单选，则只能单选json数据中的第一个
                return false;
            }
        })
    }

    //更新节点
    $.fn.UpdateNode = function (node) {
        var id = $(this).attr("id") + $.AKjs.Suffix;
        var treeObj = $.fn.zTree.getZTreeObj(id);
        var nodes = treeObj.getNodesByParam("id", node.id);
        if (nodes.length > 0) {
            nodes[0].name = node.name;
            treeObj.updateNode(nodes[0]);
        }
    }

})(jQuery);