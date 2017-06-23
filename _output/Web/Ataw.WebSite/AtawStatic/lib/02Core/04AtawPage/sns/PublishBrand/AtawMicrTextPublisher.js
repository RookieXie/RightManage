(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawMicrTextPublisher = function (options) {
        return $.extend({}, $.AKjs.AtawBasePublisher(options), new AtawMicrTextPublisher()).sysCreator();
    }
    $.fn.AtawMicrTextPublisher = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMicrTextPublisher", options);
    }
    function AtawMicrTextPublisher() {

        this.$BodyAdd = $('<div class="  ACT-PUBLISH-BRAND-HEADER">添加：' +
                                      ' <a class=" btn   publishWeibo "><i class="  icon-paper-clip fa fa-paperclip">文件</i> </a>' +
                                      ' <a class=" btn   publishWeibo "><i class=" icon-picture fa fa-picture-o">图片</i> </a>' +
                                      ' <div class="btn-group">' +
                                          '  <a  class="btn  dropdown-toggle" data-toggle="dropdown"><i class="  icon-coffee fa fa-coffee">日常事务</i> <span class="caret"></span></a>' +
                                            '<ul class="dropdown-menu" role="menu">' +
                                             ' <li><a href="#">请假</a></li>' +
                                             ' <li><a href="#">加班</a></li>' +
                                             ' <li><a href="#">周报</a></li>' +
                                             ' <li><a href="#">办公用品领用</a></li>' +
                                             ' <li><a href="#">出差申请</a></li>' +
                                             ' <li><a href="#">报销申请</a></li>' +
                                             '</ul>' +
                                      '</div>' +
                                      '<a class=" btn  publishWeibo "><i class=" icon-tasks fa fa-tasks"> 综合事务</i> </a>' +
                                      '<a class=" btn  publishWeibo "><i class=" icon-sort-down fa fa-sort-down"></i> 全部</a>' +
                          '</div>' +
                          '<div  class="ACT-LIMIT"  />' +
                          '<div   id="ACT-PUBLISHER-BTN"><a class="btn btn-primary">发布</a><a class="btn btn-default" id="ACT-PUBLISH-CANCLE">取消</a></div>');


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            // this.setProByOptName("Title", "Title");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setBody", function () {
            var _$body = this.BrandObj.$Body;
            var _$text = _$body.find("textarea");
            //_$text.css("height", "65px");
            //_$text.css("width", "60%");
            //_$body.css("width", "95%");
            //_$body.css("position", "relative");
            _$body.find(".arrow").hide(500);
            //_$body.css("top", "5px");
            this.BrandObj.$Header.remove();
            _$body.find(".ACT-SELF").show(500);
            var _$bodyInner = this.BrandObj.$Body.find(".ACT-BODY");
            _$bodyInner.append(this.$BodyAdd);
            var _this = this;
            //取消按钮
            this.$BodyAdd.find("#ACT-PUBLISH-CANCLE").unbind("click").bind("click", function () {
                _this.cancle();
            });
            //ACT-LIMIT
            _$bodyInner.find(".ACT-LIMIT").AtawLimitControl();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "cancle", function () {
            this.BrandObj.reset();
            this.$BodyAdd.remove();
            this.BrandObj.IsFocus = false;
        });


    }


})(jQuery);