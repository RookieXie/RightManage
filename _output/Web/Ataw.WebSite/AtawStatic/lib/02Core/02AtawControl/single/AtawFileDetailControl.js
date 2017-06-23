(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //对UI控件的扩展
    $.fn.FileDetail = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawFileDetail", options);
    }

    $.AKjs.AtawFileDetail = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawFileDetailControl()).sysCreator();
    }


    //普通文本框
    function AtawFileDetailControl() {
        this.RegName = null;
        // this.$DcViewBtn = $("<a class='btn btn-primary btn-xs'>在线预览</a>");
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("RegName", "RegName");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            //var _val = this.DataValue.getValue();
            if (this.RegName)
                this.DataText = $.AKjs.RegNameDataGet(this.RegName, this.DataValue.Ds, this.DataValue, "", this.DataValue.Index);
            else
                this.DataText = this.DataValue.getValue();
            var _resourceArrange = $.parseJSON(this.DataText, true);
            if (_resourceArrange && _resourceArrange.ResourceInfoList && _resourceArrange.ResourceInfoList.length > 0) {
                var _$View = $("<div/>");
                this.$JObj.append(_$View);
                for (var i = 0; i < _resourceArrange.ResourceInfoList.length; i++) {
                    var _$viewInfo = $("<div/>");
                    _$View.append(_$viewInfo);
                    this.ResourceInfoObj = _resourceArrange.ResourceInfoList[i];
                    this.Href = this.ResourceInfoObj.HttpPath;
                    this.Name = this.ResourceInfoObj.FileNameTitle;
                    this.type = this.ResourceInfoObj.ExtName;
                    this.Size = this.ResourceInfoObj.FileSizeK;
                    var _$DcViewBtn = $("<a class='btn btn-xs ACT-DOCVIEW-LINK'><i class='icon-zoom-in fa fa-search-plus'></i></a>");
                    if (this.ResourceInfoObj.CanDocumentView) {
                        _$viewInfo.append(_$DcViewBtn);
                        _$DcViewBtn.attr("docid", this.ResourceInfoObj.DocumentViewId);
                        //                        var _this = this;
                        //                        _$DcViewBtn.click(function () {
                        //                            var x = window.screen.width * 0.9;
                        //                            var y = window.screen.height * 0.9;
                        //                            // alert(x+ "  "+y);
                        //                            // window.open("/DocumentViewer/Viewer/Doc?doc=" + _this.ResourceInfo.FileId + _this.ResourceInfo.ExtName);
                        //                            window.showModalDialog("/DocumentViewer/Viewer/Doc?doc=" + _this.ResourceInfoObj.DocumentViewId, "", "dialogWidth=" + x + "px;dialogHeight =" + y + "px");
                        //                        });
                    }
                    _$viewInfo.append("<a  target='_blank'   href=" + this.Href + ">" + this.Name + this.type + "(" + this.Size + "K)</a>");

                }
            }
            this.$JObj.append("<span>&nbsp;</span>");
        });
    }
})(jQuery);
