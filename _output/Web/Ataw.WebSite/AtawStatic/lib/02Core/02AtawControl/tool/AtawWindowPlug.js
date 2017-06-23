(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawWindow = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawWindowPlug()).sysCreator();
    }
    $.fn.AtawWindow = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawWindow", options);
    }
    $.AKjs.AtawWindowIndex = 9100;
    $.AKjs.AtawWindowStack = 0;
    //列的基类
    function AtawWindowPlug() {
        this.Width = null;
        this.Height = null;
        this.Left = null;
        this.Top = null;
        this.IsLock = true;
        this.Title = null;
        //this.ZIndex = $.AKjs.AtawWindowIndex++;
        this.Fixed = false;
        this.Button = null;
        this.windowObj = null;
        this.WindowCloseFun = null; //(winobj):void
        this.WindowOpenFun = null;
        this.IsSingle = false;
        this.$Panel = $('<div class="modal fade" id="modal" style="overflow:scroll">' +
		'<div class="modal-dialog hzTB-modal"  >' +
            '<div class="modal-content">' +
                '<div class="modal-header Hu-naiv">' +
                    '<h3 class=" ACT_TITLE Hu-modals-title pull-left"></h3>' +
                    '<a class=" ACT-MODAL-CLOSE Hu-close Hu-pointer pull-right"  data-dismiss="modal"><i class="icon-remove fa fa-times"></i></a>' +
                '</div>' +
                '<div class="modal-body clear ACT_INNER"></div>' +
                '<div class="modal-footer ACT_MODE_FOOTER" ><a style="display:none" href="#" data-dismiss="modal" class="btn"><i class="icon-remove fa fa-times">关闭</i></a></div>' +
            '</div>' +
        '</div></div>');
    

        //给列的集合赋值
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Width", "Width");
            this.setProByOptName("Height", "Height");
            this.setProByOptName("Left", "Left");
            this.setProByOptName("Top", "Top");
            this.setProByOptName("IsLock", "IsLock");
            this.setProByOptName("Title", "Title");
            this.setProByOptName("Fixed", "Fixed");
            this.setProByOptName("Button", "Button");
            this.setProByOptName("WindowCloseFun", "WindowCloseFun");
            this.setProByOptName("WindowOpenFun", "WindowOpenFun");
            //this.IsSingle
            this.setProByOptName("IsSingle", "IsSingle");
            //this.setProByOptName("ZIndex", $.AKjs.AtawWindowIndex++);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.AtawBaseJPlugIn_init();
            if (this.Width) {
                this.$Panel.find(".modal-dialog").css("width", this.Width);
            }
            this.setButtons();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setButtons", function () {
            var _this = this;
            if (this.Button) {
                for (var i = 0; i < this.Button.length; i++) {
                    var _item = this.Button[i];
                    var _bt = $('<a href="#" class="btn btn-primary">' + _item.name + '</a>');
                    this.$Panel.find(".ACT_MODE_FOOTER").append(_bt);
                    _bt.unbind('click').bind('click', function () {
                        return _item.callback.apply(_this);
                    });
                }
            }
        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getDialog", function () {
            //this.
            var _this = this;
            if (this.windowObj) {
                // return 
            }
            else {
                this.$Panel.find(".ACT_INNER").append(this.$JObj);
                this.$Panel.find(".ACT_TITLE").append(this.Title);

                // $("html").css("overflow", "hidden");

                this.$Panel.on("hide.bs.modal", function () {
                    $.AKjs.AtawWindowStack--;
                    if ($.AKjs.AtawWindowStack <= 0) {
                        $("html,body").css("overflow", "");

                    };
                    var _mobj = $(this).data('bs.modal');
                    if (_mobj) {
                        _mobj.$element.clear();
                    }

                });
                var _modelOn = "shown.bs.modal";
                // alert(_modelOn);

                //alert(this.$Panel.find(".modal-dialog").length);
                this.$Panel.on(_modelOn, function (e) {
                    if (_this.WindowOpenFun) {
                        _this.WindowOpenFun(_this);
                    }
                    // alert();
                    $("html,body").css("overflow", "hidden");

                });
                this.$Panel.modal();
                this.windowObj = this.$Panel;
                if ($.AKjs.IsIframe) {
                    var _top = $.AKjs.Iframe("GetScrollTop");
                    //alert(this.$Panel.find(".modal-dialog").css("margin-top"));
                    //alert(_top + " , " + (_top+30));
                    this.$Panel.find(".modal-dialog").css("margin-top", _top + 30 + "px");
                }
                this.$Panel.find(".ACT-MODAL-CLOSE").bind("click", function () {
                    _this.close();
                    //  $("html,body").css("overflow", "");
                });

                // alert();
                //modal-dialog
            }
            //this.windowObj.hide();
            return this.windowObj;

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "close", function () {
            // alert();
            var _this = this;
            if (_this.WindowCloseFun) {
                _this.WindowCloseFun(this);
            }
            // this.getDialog().hide();


            $.AKjs.AtawWindowStack--;
            if ($.AKjs.AtawWindowStack <= 0) {
                $("html,body").css("overflow", "");

            }
            this.getDialog().modal("hide");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "open", function () {
            //  $.AKjs.AtawWindowIndex++;
            // this.$JObj.attr("z-index", $.AKjs.AtawWindowIndex);
            var diag = this.getDialog();

            // alert();
            diag.modal("show");
            $("html").css("overflow", "hidden");
            $.AKjs.AtawWindowStack++;
            //            diag.zIndex();
            //            diag.show();
            //            var pos = this.winPositionFun();
            //            diag.position(pos.left, pos.top);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "hide", function () {
            var _this = this;
            if (_this.WindowCloseFun) {
                _this.WindowCloseFun(this);
            }
            $.AKjs.AtawWindowStack--;
            if ($.AKjs.AtawWindowStack <= 0) {
                $("html,body").css("overflow", "");

            }
            this.getDialog().modal("hide");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "title", function (str) {
            //this.getDialog().title(str);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "winPositionFun", function () {
            //var _scroll = $.browser.screen();
            var winwidth = $(window).width();
            var winheight = $(window).height();
            //var scrollTop = $(document).scrollTop();
            var cenleft = winwidth / 2 - parseInt(this.$JObj.width()) / 2;
            var _h = parseInt(this.$JObj.height()) / 2;
            var centop = winheight / 2 - _h;
            return { top: (centop - 50), left: cenleft };
        });
    }

})(jQuery);
