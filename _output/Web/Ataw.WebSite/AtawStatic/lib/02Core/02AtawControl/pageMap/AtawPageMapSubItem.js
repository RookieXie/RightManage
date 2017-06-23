(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawPageMapSubItem = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawPageMapSubItem()).sysCreator();
    }

    function AtawPageMapSubItem() {
        this.MenuItemObj = null;

        //<li><a><img src="images/ICO/blackPeople.png" alt="" /><b>人员管理</b></a></li>
        //this.$SubItem = $("<a><img class='ACT_IMG' src='/images/ico/default.png' alt='' /><b class='ACT_MAP'></b></a>");
        this.$SubItem = $('<a><i class="icon-folder-close-alt fa fa-folder-o icon-2x"></i> <b class="ACT_MAP"></b></a>');

        this.Title = "";
        this.IcoSrc = "";
        this.Arrange = "";
        this.IsLeaf = false;
        this.ClickFun = null; //function(arrange,MenuItemObj)

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

            this.setProByOptName("MenuItemObj", "MenuItemObj");
            this.setProByOptName("ClickFun", "ClickFun");

            this.Title = this.MenuItemObj.Data.CODE_TEXT;
            this.IcoSrc = this.MenuItemObj.Data.ExtData.Icon;
            this.Arrange = this.MenuItemObj.Data.Arrange;
            this.IsLeaf = this.MenuItemObj.IsLeaf;
            if (this.IcoSrc != "") {
                this.$SubItem.find('i').removeClass('icon-folder-close-alt fa fa-folder-o');
                this.$SubItem.find('i').addClass(this.IcoSrc);
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.IsLeaf) {
                if (this.IcoSrc == "") {
                    this.$SubItem.find('i').removeClass('icon-folder-close-alt fa fa-folder-o');
                    this.$SubItem.find('i').addClass('icon-file-alt fa fa-file-text-o');
                }
            }
            var _$map = this.$SubItem.find(".ACT_MAP");
            _$map.text(this.Title);
            if (!this.IcoSrc .AisEmpty()) {
                this.$SubItem.find(".ACT_IMG").attr("src", this.IcoSrc);
            }
            this.$JObj.append(this.$SubItem);
            var _this = this;
            _this.$JObj.unbind("click").click(function () {
                if (_this.ClickFun) {
                    _this.ClickFun(_this.Arrange, _this.MenuItemObj);
                }
            });

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "itemSelectClass", function () {
            this.$SubItem.addClass("sethover");
            if (!this.IsLeaf) {
                if (this.IcoSrc == "") {
                    this.$SubItem.find('i').removeClass('icon-folder-close-alt fa fa-folder-o');
                    this.$SubItem.find('i').addClass('icon-folder-open-alt fa fa-folder-open-o');
                }
            }
            this.$SubItem.parent().addClass('active');
        });


    }

})(jQuery);