(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //文档选择控件
    $.fn.AtawDocumentSelector = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDocumentSelector", options);
    }

    //继承基类
    $.AKjs.AtawDocumentSelector = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawDocumentSelector());
    }

    function AtawDocumentSelector() {
        this.$DocumentContainDv = $("<div/>");
        this.$LocalBtn = $('<a class="btn btn-default" href="javascript:void(0)">本地上传</a>');
        this.$DocumentBtn = $('<a class="btn btn-default" href="javascript:void(0)" data-toggle="modal" data-target="#documentModal">文档中心</a>');
        this.$DocumentDisplayDv = $('<div />');
        this.SelectedDocument = [];
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$DocumentContainDv.append(this.$LocalBtn);
            this.$DocumentContainDv.append(this.$DocumentBtn);
            this.initDisplayDocument();
            this.$DocumentContainDv.append(this.$DocumentDisplayDv);
            this.createDocumentWin();
            this.$JObj.append(this.$DocumentContainDv);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayDocument", function () {
            this.$DocumentDisplayDv.html("");
            var selectedDocument = $.parseJSON(this.DataValue.getValue(), true);
            this.SelectedDocument = selectedDocument ? selectedDocument : [];
            for (var i = 0; i < this.SelectedDocument.length; i++) {
                if (this.SelectedDocument[i].TYPE === 1) {
                    this.initDisplayImageDocument(this.SelectedDocument[i]);
                } else if (this.SelectedDocument[i].TYPE === 2) {
                    this.initDisplayArticleDocument(this.SelectedDocument[i]);
                } else {
                    this.initDisplayFileDocument(this.SelectedDocument[i]);
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayImageDocument", function (option) {
            var _this = this;
            var $image = $('<dic><img src="' + option.URL + '" alt="' + option.NAME + '" class="acs-img-small-list"/><a href="javascript:void(0)">×</a></div>');
            $image.find("a").click(function () {
                $image.remove();
                _this.removeDisplayDocument(option);
            })
            this.$DocumentDisplayDv.append($image);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayArticleDocument", function (option) {
            this.$DocumentDisplayDv.append($('<li><i class="icon-edit fa fa-edit icon-5x"></i><span>' + option.NAME + '</span></li>'));
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initDisplayFileDocument", function (option) {
            this.$DocumentDisplayDv.append($('<li><i class="icon-file-alt fa fa-file-text-o icon-5x"></i><span>' + option.NAME + '</span></li>'));

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "removeDisplayDocument", function (option) {
            if (option && option.FID) {
                this.SelectedDocument.remove(option);
                this.triggerChangeEvent();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "addDisplayDocument", function (res) {
            if (res && res.length > 0) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].TYPE === 1) {
                        this.initDisplayImageDocument(res[i]);
                    } else if (res[i].TYPE === 2) {
                        this.initDisplayArticleDocument(res[i]);
                    } else {
                        this.initDisplayFileDocument(res[i]);
                    }
                }
                this.SelectedDocument = this.SelectedDocument.concat(res);
                this.triggerChangeEvent();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createDocumentWin", function () {
            var _this = this;
            var $documentWin = $('<div class="modal fade"  id="documentModal" tabindex="-1" role="dialog" aria-labelledby="documentTitle" aria-hidden="true">'
              + '<div class="modal-dialog" style="width:80%;">'
                + '<div class="modal-content">'
                  + '<div class="modal-header">'
                    + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                    + '<h4 class="modal-title" id="documentTitle">文档中心</h4>'
                  + '</div>' 
                  + '<div class="modal-body">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>');
            var $documentBody = $documentWin.find(".modal-body");
            this.$DocumentContainDv.append($documentWin);
            //            seajs.use(['jquery', 'AkDocumentControl-Init'], function ($, iner) {
            //                iner.load($documentBody, { SureCallback: function (res) {
            //                    $documentWin.modal('hide')
            //                    _this.addDisplayDocument(res);

            //                }, CancelCallback: function () {
            //                    $documentWin.modal('hide')
            //                }
            //                });
            //            });
            $.AKjs.getJSON("/module/module",
             {
                 xml: "module/SNS/Documentcenter/SNS_dc",
                 // ds: {},
                 pageStyle: "List"
             },
              function (res) {
                  $documentBody.AtawListPage(res);
              });

        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return $.toJSON(this.SelectedDocument);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (obj) {
            this.SelectedDocument = obj;
            this.initDisplayDocument();
        });
    }
})(jQuery);
