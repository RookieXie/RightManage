(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //自动完成控件
    $.fn.AtawComboTreeSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawComboTreeSelector", options);
    }

    //继承基类
    $.AKjs.AtawComboTreeSelector = function (options) {
        return $.extend({}, $.AKjs.AtawBaseSelector(options), new AtawComboTreeSelectorControl());
    }


    //控制div的显示效果
    var spanindex = 0;
    function AtawComboTreeSelectorControl() {
        this.IsAsk = false;
        this.$TreeMenu = $("<div  class=\"ATAW-TREE-MENU\" style=\"display:none; position: absolute;height:150px;overflow:auto;background: none repeat scroll 0 0 #F0F6E4;z-index:99;\"><ul  id=\"ACT-TREEID_" + $.AKjs.getUniqueID() + "\" class=\"ztree\" style=\"margin-top:0; width:140px;\"></ul>\</div>");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.AtawBaseSelectorControl_init();
           // this.
            this.$Menu.append(this.$TreeMenu);
            this.$JObjText.attr("readonly", "readonly").addClass("ACT-TEXT inputAutoCon");
            var _url = "/core/Selector/LoadTree?regName=" + this.RegName;
            if (this.Options.DataValue && this.Options.DataValue.getValue() != "") {
                _url = _url + "&id=" + this.Options.DataValue.getValue();
            }

            //树形选择器初始化配置
            var _setting = {
                data:
                {
                    key:
                    {
                        name: "CODE_TEXT",
                        title: "CODE_TEXT",
                        children: "Children",
                        keyId: "CODE_VALUE"
                        //url: _url
                    }
                },

                async: {
                    enable: true,
                    autoParam: ["CODE_VALUE"],
                    url: getUrl
                },
                callback: {
                    onClick: onClick
                }
            };


            function getUrl(treeId, treeNode) {
                return _url;
            }
            var _zTree = null;

            var _jObj = this.$JObj;
            var _$JObjText = this.$JObjText;
            var _$TreeMenu = this.$TreeMenu;
            var _options = this.Options;
            var _this = this;

            //文本框事件
            var _isAsk = this.IsAsk;
            this.$JObjText.click(function (event) {
                if (_isAsk == false) {
                    $.fn.zTree.init(_$TreeMenu.find(".ztree"), _setting);
                    _zTree = $.fn.zTree.getZTreeObj("SelItem");
                    _isAsk = true;
                }
                showMenu(event);
            });

            //选择节点后触发事件
            function onClick(e, treeId, treeNode) {
                //alert(treeNode[_setting.data.key.name]);
                _$JObjText.val(treeNode[_setting.data.key.name]);
                _this.dataValue(treeNode[_setting.data.key.keyId]);
                _$TreeMenu.hide();
            }

            //显示树所在的层
            function showMenu(event) {
                var _offset = _$JObjText.position();
                _$TreeMenu.css({ border: "1px solid #EDEDED", left: _offset.left + "px", top: _offset.top + _$JObjText.outerHeight() + "px", width: (_$JObjText.width() + 10) + "px", position: "absolute" }).slideDown("fast");
                var _event = window.event || event;
                if (_event.stopPropagation) {
                    _event.stopPropagation();
                } else {
                    _event.cancelBubble = true;
                }
                _$TreeMenu.show();
            }

            _$TreeMenu.click(function (event) {
                var _event = window.event || event;
                if (_event.stopPropagation) {
                    _event.stopPropagation();
                } else {
                    _event.cancelBubble = true;
                }
            });
            _$TreeMenu.parents("body").click(function () {
                _$TreeMenu.hide();
            });
            _$TreeMenu.parent().click(function () {
                _$TreeMenu.hide();
            });
            

        })
    }
})(jQuery);
