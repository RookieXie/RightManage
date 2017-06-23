//function FCKeditor_OnComplete(editorInstance){                
//         editorInstance.Events.AttachEvent("OnFocus",FCKeditor_OnFocus);             
//}      
//           
//function FCKeditor_OnFocus(editorInstance){   
//   alert();
//}  

(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //对UI控件的扩展
    $.fn.AtawEditor = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawEditor", options);
    }

    //继承基类
    $.AKjs.AtawEditor = function (options) {
        return $.extend({}, $.AKjs.AtawTextArea(options), new AtawEditorControl()).sysCreator();
    }

    function AtawEditorControl() {
        // this.$TextArea = $("<textarea></textarea>"); //装载html标签的类
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initLegal", function () {
        //            this.LegalObj = $.AKjs.AtawAreaLegal(this);
        //        });

        this.OnFocusEventFun = null; //void(this) 获取焦点的钩子
        this.OnBlurEventFun = null; //void(this) 失去焦点的钩子
        this.CkEditorObj = null;
        this.Ckid = "";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("OnFocusEventFun", "OnFocusEventFun");
            this.setProByOptName("OnBlurEventFun", "OnBlurEventFun");
        });

        //初始化文本编辑器
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.AtawBaseTextControl_init();
            if ($.AKjs.IsEmpty(this.Options.feildName)) {
                this.Options.feildName = "FIELD_NAME" + $.AKjs.getUniqueID();
            }
            //  var _jObj = this.$JObj;
            //
            var $_j = $("<div  class='ACT-AEDIT editbox' />")
            this.$JObjText.wrap($_j);
            _jObjControl = this.$JObjText;
            var _options = this.Options;
            //_jObj.append(_jObjControl);
            _jObjControl.attr("id", _options.feildName);
            _jObjControl.attr("name", _options.feildName);
            this.Ckid = _options.feildName;
            var _width = 600;
            var _height = 300;
            if (_options.width) {
                _width = _options.width
            }
            if (_options.width) {
                _height = _options.height
            }
            var _this = this;
            var _editor = null;
            var myConfig = {};
            if (_options.IsAll) {

            } else {
                myConfig.toolbar = [
                    { name: 'document', items: ['Source'] },
                    { name: 'insert', items: ['Image', 'Smiley'] }
                ];
            }

            if (_options.IsHaveElementPath) {

            } else {
                myConfig.removePlugins = 'elementspath';
                myConfig.resize_enabled = false;
            }

            if (_options.Width != 0) {
                myConfig.width = Number(_options.Width);
            } else { }
            if (_options.Height != 0) {
                myConfig.height = Number(_options.Height);
            } else { }
            var _this = this;
            myConfig.on = {
                focus: function () {
                    //alert('focus');
                    if (_this.OnFocusEventFun) {
                        _this.OnFocusEventFun(_this);
                    }
                }
                ,
                blur: function () {
                    if (_this.OnBlurEventFun) {
                        _this.OnBlurEventFun(_this);
                    }
                }
            };

            myConfig.toolbarCanCollapse = true;

            //工具栏的位置

            myConfig.toolbarLocation = 'top'; //可选：bottom

            //工具栏默认是否展开

            myConfig.toolbarStartupExpanded = false;

            _editor = CKEDITOR.replace(_options.feildName, myConfig);
            this.CkEditorObj = _editor;
            if (_editor) {
                _editor.on("change", function () {
                    _this.triggerChangeEvent();
                    _this.legal();
                    return true;

                });
                var re = /^[0-9,]+$/;

                var _val = this.DataValue.getValue();
                if (_val != null) {
                    if (re.test(_val)) {
                        //  _editor.insertHtml(_val);
                        _editor.setData(_val.hexToString());
                    } else {
                        _editor.setData(_val);
                    }
                }
            }
            _jObjControl.data("editor", _editor);

        })





        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Set", function (val) {
            var _editor = this.$JObjText.data("editor");
            //_editor.html(val.htmlDecode())
            if (val != null) {
                _editor.setData(val.hexToString());
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "focus", function () {
            var _editor = this.$JObjText.data("editor");
            _editor.focus();
        });

        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            var _editor = this.$JObjText.data("editor");
            //_editor.sync(); //同步数据
            //            return this.$JObjText.val().htmlEncode();
            return _editor.getData().stringToHex();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getReadOnlyText", function () {
            var _val = this.DataValue.getValue();
            if (_val != null) {
                var re = /^[0-9,]+$/;
                if (re.test(_val)) {
                    //  _editor.insertHtml(_val);
                    return _val.hexToString();
                } else {
                    //                    return _val.htmlDecode().htmlDecode();
                    return _val;
                }
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            // this.CkEditorObj.destroy();
            if (CKEDITOR.instances[this.Ckid]) {
                CKEDITOR.remove(CKEDITOR.instances[this.Ckid]);
            }


            this.AtawBaseDom_dispose();
        });
    }

})(jQuery);
