
(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawTest = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTest", options);
    }

    $.AKjs.AtawTest = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawTestControl());
    };
    //------------------------------------测试控件 TestOptions ,ControlName
    function AtawTestControl() {
        this.$AtawControl = $("<div  style='width:100%;'  />");
        this.ControlName = null;
        this.$Input = $("<TextArea  style='width:100%;height:100px'   />");
        this.$btGetData = $("<button>获取数据</button>");
        this.$btSetData = $("<button>设置数据</button>");
        this.$btLegal = $("<button>合法性验证</button>");
        this.$btReadOnly = $("<button>转换控件只读状态</button>");
        this.$Detail = $("<div />");

        this.ChangeEventFun = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.setProByOptName("ChangeEventFun", "ChangeEventFun");
            this.ControlName = this.Options.ControlName;
            this.$JObj.append("<h5>测试控件&nbsp&nbsp" + this.ControlName + "</h5>");
            this.$JObj.append(this.$AtawControl);
            this.$JObj.append(this.$Input);
            this.$JObj.append(this.$btReadOnly);
            var _$Detail = this.$Detail;
            $.extend(this.Options.TestOptions.Legal, { Kind: "notNull" });
            //var _cef = 
            var _changeEventFun = function (col) {

                var _str = $.AKjs.CreateBuffer(new Date().toLocaleTimeString())
                    .ad("值变更为 ：")
                    .ad(col.dataValue()).toString();
                var _obj = _$Detail.AtawControl();
                if (_obj) {
                    _obj.addWriteBr(_str);
                }
                if (_this.Options.TestOptions.ChangeEventFun) {
                    _this.Options.TestOptions.ChangeEventFun(col);
                }

            };
            var _testOpion = $.extend({},
            {
                Legal: { Kind: "notNull" }
            },
             this.Options.TestOptions, { ChangeEventFun: _changeEventFun });
            if (_testOpion.DataValue == null) {
                _testOpion.DataValue = $.AKjs.AtawJsDataValueObj("", null);
            }
            else {
                if (typeof (_testOpion.DataValue) == "string") {
                    _testOpion.DataValue = $.AKjs.AtawJsDataValueObj(_testOpion.DataValue, null);
                }
            }
            this.$AtawControl[this.ControlName](_testOpion);
            var _atawControlObj = this.$AtawControl.data("ATAW_CONTROL");

            var _$btGetData = this.$btGetData;
            var _$btSetData = this.$btSetData;
            var _$Input = this.$Input;

            this.$JObj.append(this.$btGetData);
            this.$JObj.append(this.$btSetData);
            this.$JObj.append(this.$btLegal);
            this.$JObj.append(_$Detail);
            this.$Detail.AtawDetail({ DataValue: $.AKjs.AtawJsDataValueObj("日志记录 ：") });

            this.$btGetData.click(function () {
                _$Input.val(_atawControlObj.dataValue());
            });
            this.$btSetData.click(function () {
                _atawControlObj.dataValue(_$Input.val());
            });

            this.$btLegal.click(function () {
                _atawControlObj.legal();
            });
            this.$btReadOnly.click(function () {
                var _isReadOnly = _atawControlObj.IsReadOnly;
                _atawControlObj.toReadStatus(!_isReadOnly);
            });
        });
    }


})(jQuery);