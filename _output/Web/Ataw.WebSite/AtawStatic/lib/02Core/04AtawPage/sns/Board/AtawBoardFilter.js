(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawBoardFilter = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawBoardFilter()).sysCreator();
    }
    $.fn.AtawBoardFilter = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawBoardFilter", options);
    }
    function AtawBoardFilter() {
        this.Select = "All";
//        this.$Panel = $('<div class="panel panel-primary">' +
//                           '<div class="panel-body ACT-BODY">' +
//                           '</div>' +
//                        '</div>');
        this.$View = $('<ul class="nav nav-pills nav-stacked">' +
                         '<li class="active ACT-FILTER"><a key="All" href="#">所有</a></li>' +
                         '<li class="ACT-FILTER"><a  key="Self" href="#">与我相关</a></li>' +
                         '<li class="ACT-FILTER"><a  key="Fav" href="#">关注的人</a></li>' +
                         '<li class="dropdown">' +
                             '<a class="dropdown-toggle" data-toggle="dropdown" href="#">线索 <span class="caret"></span></a>' +
                             '<ul class="dropdown-menu">' +
                             '<li><a href="#">办公的</a></li>' +
                             '<li><a href="#">重要的</a></li>' +
                             '<li><a href="#">开发者大会</a></li>' +
                             '</ul>' +
                         '</li>' +
                     '</ul>');

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //----------

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append(this.$View);
           // this.$Panel.append(this.$View);
            var _this = this;
            this.$View.find(".ACT-FILTER").unbind("click").bind("click", function () {
                //--------
                _this.$View.find(".ACT-FILTER").removeClass("active");
                $(this).addClass("active");
            });
        });
        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Set", function (val) {

        });

        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            var _$select = this.$View.find("li .active");
            if (_$select.length > 0) {
                return _$select.attr("key");
            }
            return null;
        });


    }


})(jQuery);