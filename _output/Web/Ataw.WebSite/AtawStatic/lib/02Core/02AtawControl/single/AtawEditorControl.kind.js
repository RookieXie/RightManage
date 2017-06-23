(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //对UI控件的扩展
    $.fn.AtawEditor = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawEditor", options);
    };

    //继承基类
    $.AKjs.AtawEditor = function (options) {
        return $.extend({}, $.AKjs.AtawTextArea(options), new AtawEditorControl()).sysCreator();
    };

    function AtawEditorControl() {
        this.OnFocusEventFun = null; //void(this) 获取焦点的钩子
        this.OnBlurEventFun = null; //void(this) 失去焦点的钩子
        this.EditorObj = null;
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

            //            var $_j = $("<div  class='ACT-AEDIT editbox' />");
            //            this.$JObjText.wrap($_j);
            _jObjControl = this.$JObjText;
            var _options = this.Options;
            _jObjControl.attr("id", _options.feildName);
            _jObjControl.attr("name", _options.feildName);
            // if()
            var _width = _options.Width || "100%";
            var _height = _options.Height || 150;
            var _this = this;
            var _editor = null;

            var b = ["source", "|", "undo", "redo", "|", "preview", "print", "template", "code", "cut", "copy", "paste", "plainpaste", "wordpaste", "|", "justifyleft", "justifycenter", "justifyright", "justifyfull", "insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript", "superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", "/", "formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "strikethrough", "lineheight", "removeformat", "|", "image", "multiimage", "flash", "media", "table", "hr", "emoticons", "baidumap", "pagebreak", "anchor", "link", "unlink"];


            var myConfig = {
                items: b,
                urlType: "relative"
                , width: _width
                , height: _height
                , resizeType: 0
                , autoHeightMode: true
                , themeType: 'default'
                , useContextmenu: true,
                filterMode: !1,

                uploadJson: '/core/Uploader/UploadKindFile'
                //                upLinkUrl: '/core/Uploader/UploadXhFile',
                //                upLinkExt: "*.*",
                //                upImgUrl: '/core/Uploader/UploadXhFile',
                //                upImgExt: "jpg,jpeg,gif,png",
                //                upFlashUrl: '/core/Uploader/UploadXhFile',
                //                upFlashExt: "swf",
                //                upMediaUrl: '/core/Uploader/UploadXhFile',
                //                upMediaExt: "avi",
                //                html5Upload: false,
                , afterCreate: function () {
                    this.loadPlugin('autoheight');  //死变态的kindEditor,只有“autoheight”插件是需要手动加载的，其他都可以自动加载进来，靠！
                }
                , afterFocus: function () {
                    if (_this.OnFocusEventFun) {
                        _this.OnFocusEventFun(_this);
                    }
                }
                , afterBlur: function () {
                    if (_this.OnBlurEventFun) {
                        _this.OnBlurEventFun(_this);
                    }
                }
                , afterChange: function () {
                    if (_this.EditorObj) {
                    _this.triggerChangeEvent();
                    _this.legal();
                    }
                }
            };
            if (_options.IsAll) {
                myConfig.items = ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                    'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                    'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                    'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                    'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
                    'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
                    'anchor', 'link', 'unlink', '|', 'about'];
            } else {
                myConfig.items = ['cut', 'copy', 'paste', 'plainpaste', 'source', 'table', '|', 'image', 'flash', 'insertfile', 'emoticons', '|', 'about'];
            }
            var _this = this;

            this.asynJs(["/AtawStatic/lib/03Extend/kindeditor/kindeditor-min.js"], function () {
               // alert(_options.feildName);
                _editor = KindEditor.create($("#" + _options.feildName), myConfig); //_jObjControl.xheditor(myConfig);

                var re = /^[0-9,]+$/;
                var _val = _this.DataValue.getValue();
                if (_val != null) {
                    if (re.test(_val)) {
                        _editor.html(_val.AhexToString());
                    } else {
                        _editor.html(_val);
                    }
                }
                _this.EditorObj = _editor;
                //_jObjControl.data("editor", _editor);
            });
        });

        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Set", function (val) {
            var _editor = this.EditorObj;
            _editor.html(val.AhexToString());
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "focus", function () {
            var _editor = this.EditorObj;
            _editor.focus();
        });
        //insertHtml
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "insertHtml", function (b) {
            var _editor = this.EditorObj;
            _editor.insertHtml(b);
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getHtml", function () {
            var _editor = this.EditorObj;
            return _editor.html();
        });

        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            // var _editor = this.$JObjText.data("editor");
            return this.getHtml().AstringToHex();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getReadOnlyText", function () {
            var _val = this.DataValue.getValue();
            if (_val != null) {
                var re = /^[0-9,]+$/;
                if (re.test(_val)) {
                    //  _editor.insertHtml(_val);
                    return _val.AhexToString();
                } else {
                    //                    return _val.htmlDecode().htmlDecode();
                    return _val;
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            try {
                KindEditor.remove(this.$JObjText);
            }
            catch (ee) {
                if (console && console.log)
                    console.log(ee);
            }
            this.AtawBaseDom_dispose();
        });
    }
} (jQuery));