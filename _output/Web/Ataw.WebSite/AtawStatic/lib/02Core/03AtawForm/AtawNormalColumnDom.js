(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawNormalColDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseColumnDom(options), new AtawNormalColDom()).sysCreator();
    }

    //年月日文本框
    function AtawNormalColDom() {
        //		this.$Dl = $("<dl class='dataTable_line'><dd class='dl_name'></dd><dd class='NF_content'></dd></dl>");
        //		this.$Dt = this.$Dl.find("dd:eq(0)");
        //		this.$Dd = this.$Dl.find("dd:eq(1)");
        this.TitleEmpty = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            if (this.DisplayName == "empty-title") {
                this.$Column = $('<div class="show-col clearfix panel-default"><div></div></div>');
                this.TitleEmpty = true;
            }
            else {
                this.$Column = $('<div    acol="' + this.ColumnConfig.Name + '" class="show-col clearfix panel-default"><label title="'+ this.DisplayName+'" class="aks-control-label control-label"></label><div></div></div>');
            }
            this.$Title = this.$Column.find("label");
            this.$Content = this.$Column.find("div");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

           
            this.$JObj.find(".showGrid").append(this.$Column);
            if (this.DisplayName == null || this.DisplayName == "") {

            } else {
                if (this.Prompt == null || this.Prompt == "") {
                    this.$Title.append(this.DisplayName + ":");
                } else {
                    this.$Title.append(this.DisplayName + ":(" + this.Prompt + ")");
                }
            }
            if (this.AtawControlObj.HasInput && !this.AtawControlObj.IsReadOnly) {
                this.$Title.addClass("mt05");
                var __this = this;
                this.AtawControlObj.ReadOnlyFun = function (isReadonly) {
                    if (isReadonly) {
                        __this.$Title.removeClass("mt05");
                    }
                    else {
                        __this.$Title.addClass("mt05");
                    }
                }
            }
            
            this.AtawControlObj.intoDom(this.$Content);
            if (this.ColumnConfig.ControlType == "Hidden") {
                this.$Column.css("display", "none");
            }
            if (this.DisplayName == null || this.DisplayName == "") {
                this.$Column.css("display", "none");
            } else {
            }
            //            var _showType = this.ColumnConfig.ShowType;
            //            var _controlType = this.Options.ColumnConfig.ControlType;
            //            if (_controlType == "Editor" || _controlType == "SingleImageUpload" || _controlType == "MultiImageUpload" || _controlType == "PCAS") {
            //                _showType = 3;
            //            }
            //            switch (_showType) {
            //                case 1:
            //                    this.$Column.addClass("col-md-4");
            //                    this.$Title.addClass("col-md-6 col-sm-2 ");
            //                    this.$Content.addClass("col-md-6 col-sm-10");
            //                    break;
            //                case 2:
            //                    this.$Column.addClass("col-md-6");
            //                    this.$Title.addClass("col-md-4 col-sm-2 ");
            //                    this.$Content.addClass("col-md-8 col-sm-10");
            //                    break;
            //                default:
            //                    this.$Column.addClass("col-md-12");
            //                    this.$Title.addClass("col-md-2 col-sm-2 ");
            //                    this.$Content.addClass("col-md-10 col-sm-10");
            //                    break;
            //            }


            this.AtawBaseColumnDom_init();

            if (!this.TitleEmpty) {
                this.AtawControlObj.$JObj.addClass("aks-grid-control");
            }

            if (this.ColumnConfig.NormalStyle) {
                //alert();
                this.$Column.attr("style", this.ColumnConfig.NormalStyle);
            }
            if (this.ColumnConfig.Width) {
                //alert(this.ColumnConfig.Width);
                this.AtawControlObj.$JObj.css("max-width", this.ColumnConfig.Width);
            }
        });

    }

})(jQuery);
