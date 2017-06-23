(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //文档选择控件
    $.fn.AtawDocumentDetail = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDocumentDetail", options);
    }

    //继承基类
    $.AKjs.AtawDocumentDetail = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawDocumentDetail());
    }

    function AtawDocumentDetail() {
        this.$DocumentDisplayDv = $('<ul class="acs-bs-glyphicons"/>');
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.initDisplayDocument();
            this.$JObj.append(this.$DocumentDisplayDv);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayDocument", function () {
            this.$DocumentDisplayDv.html("");
            this.SelectedDocument = $.parseJSON(this.DataValue.getValue(), true);
            if (this.SelectedDocument && this.SelectedDocument.length) {
                for (var i = 0; i < this.SelectedDocument.length; i++) {
                    if (this.SelectedDocument[i].TYPE === 1) {
                        this.initDisplayImageDocument(this.SelectedDocument[i]);
                    } else if (this.SelectedDocument[i].TYPE === 2) {
                        this.initDisplayArticleDocument(this.SelectedDocument[i]);
                    } else {
                        this.initDisplayFileDocument(this.SelectedDocument[i]);
                    }
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayImageDocument", function (option) {
            var $image = $('<li><img src="' + option.URL + '" alt="' + option.NAME + '" class="img-responsive"/><span class="glyphicon-class">' + option.NAME + '</span></li>');
            this.$DocumentDisplayDv.append($image);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayArticleDocument", function (option) {
            this.$DocumentDisplayDv.append($('<li><i class="icon-edit fa fa-edit icon-4x"></i><span>' + option.NAME + '</span><li>'));
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayFileDocument", function (option) {
            this.$DocumentDisplayDv.append($('<li><i class="icon-file-alt fa fa-file-text-o icon-5x"></i><span>' + option.NAME + '</span><li>'));

        });
    }
})(jQuery);
