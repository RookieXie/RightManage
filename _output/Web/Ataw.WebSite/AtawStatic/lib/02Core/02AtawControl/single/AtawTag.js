(function () {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //标签控件
    $.fn.AtawTag = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTag", options);
    }

    $.AKjs.AtawTag = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawTagControl());
    };

    //控制tag显示效果
    function AtawTagControl() {
        this.$html = $('<div class="ui-tagbox clearfix"><div class="ui-tag-on pull-left"></div></div>');
        this.$input = $('<input type="text" class="tag-txt" />')
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "creator", function () {

        })
        //创建tags标签
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            var _this = this;
            this.$JObj.append(this.$html); //this.$JObj 为外围DIV容器的变量
            //var _onFocus = $(".ui-tag-on");
            var _onFocus = this.$html.find(".ui-tag-on");
            var _input = this.$input;

            _onFocus.off("click").on("click", function () {
                //插入文本框
                $(this).append(_input);
                //是插入文本框获得焦点 
                _input[0].focus();
                var _val = "";
                _input.val(_val);
            });
            _onFocus.click(function () {
                //文本框失去焦点
                _input.blur(function () {
                    var _val = $(this).val();
                    //alert(_val);
                    var _tags = '<div class="ui-tag-item pull-left" onclick="remove()"><span>' + _val + '</span><a class="tagclose" >X</a></div>';
                    //如果输入文本为空则不添加tag标签
                    if (_val.trim() == "") {
                        _input.remove();
                        return false;
                    } else {

                        //添加标签
                        var returnsvalue = isRepeatTags(_this);
                        if (returnsvalue) {
                            $(".ui-tagbox").append(_tags);
                            //移除文本框
                            _input.remove();
                            _this.triggerChangeEvent();
                        }
                    }
                })
            });

        });
        //获得数据
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            var selVals = [];
            this.$html.find(".ui-tag-item").each(function () {
                var _value = $(this).find("span").text();
                selVals.push(_value);
            })
            return selVals.join(" , ");
        });
        //设定数据
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (val) {
            var _itemtags = val.split("，");
            var _this = this;
            var _isItem = _this.$html.find(".ui-tag-item").length;
            var _tags = _this.$html.find(".ui-tag-item");
            _tags.remove();
            for (var i = 0; i < _itemtags.length; i++) {
                var _item = _itemtags[i];
                for (var j = 0; j < _itemtags.length; j++) {
                    if (i != j && _itemtags[i] == _itemtags[j]) {
                        alert("重复");
                        return false;
                    }
                }
                var _tags = '<div class="ui-tag-item pull-left" onclick="remove()"><span>' + _item + '</span><a class="tagclose" >X</a></div>';
                $(".ui-tagbox").append(_tags);

            }
        });
        //设为只读
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getReadOnlyText", function () {
            var _tagVal = [];
            var _this = this;
            _this.$html.find(".ui-tag-item").each(function () {
                _tagVal.push($(this)[0].innerText);
            });
            return _tagVal.join(",");
        });
        //销毁
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            _onFocus.off("click");
            this.AtawBaseDom_dispose();
        });

        //判断是否存在同样的标签
        function isRepeatTags(_this) {
            var _isItem = _this.$html.find(".ui-tag-item").length;
            if (_isItem > 0) {
                for (var i = 0; i < _isItem; i++) {
                    //var _vals = _this.$html.find("span");
                    var _vals = _this.$html.find("span")[i].innerText;
                    var _tagInput = _this.$input.val();
                    if (_tagInput == _vals) {
                        alert("已存在相同标签！");
                        _this.$input.remove();
                        return false;
                    }
                }
            }
            return true;
        };
        //tag 标签移除
        function tagsRemove() {
            var _this = this;
            _this.remove();
            _this.triggerChangeEvent();
        }
    }

})(jQuery);