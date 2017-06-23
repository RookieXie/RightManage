(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //继承基类
    $.AKjs.AtawFileRowDom = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawFileRowDom()).sysCreator();
    }
    function AtawFileRowDom() {
        this.DataRow = null;
        this.ParentFormObj = null;
        this.ButtonList = [];
        this.BatchableButtonList = [];
        this.isSearchRow = false;
        this.SupportBtns = [];
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("DataRow", "DataRow");
            this.setProByOptName("ParentFormObj", "ParentFormObj");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.isSearchRow = this.Options.ParentFormObj.Form.IsSearchRow;
            var _div = null;
            var fileType = this.DataRow.TYPE;
            if (this.isSearchRow) {
                _$div = this.$JObj;
                this.initOperateButton(_$div);
                var picsize = "5.1em";
                switch (fileType) {
                    case 1:
                        _$div.append(this.createImageFileColumn(picsize));
                        break;
                    case 2:
                        _$div.append(this.createArticleFileColumn(picsize));
                        break;
                    case 3:
                        _$div.append(this.createOtherFileColumn(picsize));
                        break;
                    default:
                        _$div.append(this.createFolderColumn(picsize));
                        break;
                }
                var info = this.DataRow.NAME + "；大小：" + this.DataRow.SIZE + "KB；创建时间：" + this.DataRow.UPDATE_TIME;
                var $info = $('<td class="table-tl ta1" ><div><span>名称：</span><span><a class = "title-info" title=' + info + '">' + this.DataRow.NAME + '</a></span></div></td>');
                var $paths = $('<div><span>路径：</span><span><a>' + this.DataRow.PATHS + '</a></span></div>');


                $paths.click(function () {
                    var formState = {};
                    formState.navi = { "PID": _this.DataRow.PID };
                    formState.page = { PageSize: _this.ParentFormObj.PageSize, PageIndex: 0, IsASC: _this.ParentFormObj.IsASC, SortName: _this.ParentFormObj.SortName, DataTime: new Date().Aformat("yyyy-mm-dd hh:nn:ss.S") };
                    formState.tablename = _this.ParentFormObj.TableName;
                    formState.formType = _this.ParentFormObj.FormType;
                    var _isPart = _this.ParentFormObj.ParentPageObj.IsPart;
                    if (!_isPart) {
                        var route = _this.ParentFormObj.ParentPageObj.Route;
                        var _url = "$$";
                        if (route) {
                            _url = "$" + route + "$";
                        }
                        _url = _url + "List$" + Base64.encode($.toJSON(formState));
                        $.AKjs.AppGet().Url.openUrl(_url);
                    }
                    else {
                        var _ds = {};
                        var _list = _ds[_this.ParentFormObj.TableName + "_Search"] = [];
                        _list.push({ PID: _this.DataRow.FID });
                        _this.ParentFormObj.searchDataList(0, true, _ds);
                        if (_this.ParentFormObj.NaviFormObj != null) {
                            var navi = _this.ParentFormObj.NaviFormObj;
                            for (var i = 0; i < navi.length; i++) {
                                if (navi[i].NaviFrom.Name == "PID") {
                                    navi[i].reloadTree(_this.DataRow.FID);
                                }
                            }

                        }
                    }
                });
                $info.append($paths);
                _$div.append($info);
            } else {
                _$div = $('<div></div>');
                switch (fileType) {
                    case 1:
                        _$div.append(this.createImageFileColumn());
                        break;
                    case 2:
                        _$div.append(this.createArticleFileColumn());
                        break;
                    case 3:
                        _$div.append(this.createOtherFileColumn());
                        break;
                    default:
                        _$div.append(this.createFolderColumn());
                        break;
                }
                var info = "";
                if (fileType == "1" || fileType == "3") {
                    info = this.DataRow.NAME + "；大小：" + this.DataRow.SIZE + "KB；创建时间：" + this.DataRow.UPDATE_TIME;
                } else {
                    info = this.DataRow.NAME + "；创建时间：" + this.DataRow.UPDATE_TIME;
                }
                var $info = $('<div class="caption acs-document-info" ><a class = "title-info" title=' + info + '>' + this.DataRow.NAME.subByte(8, '...') + '</a></div>');
                this.initOperateButton(_$div);
                _$div.find(".ACT-CHECK-SINGLE").data("AK-ROW", this);
                _$div.append($info);
                this.$JObj.append(_$div);
            }
            if (fileType == 3) {
                var docid = this.getdocumentname(this.DataRow.URL);
                if (docid != "") {
                    var $preview = $("<a class = 'ACT-DOCUMENT-PREVIEW icon-zoom-in  fa fa-search-plus ACT-DOCVIEW-LINK' docid = " + docid + ">预览</a>");
                    _$div.append($preview);
                }
            }
            _$div.find(".title-info").click(function () {
                this.ParentFormObj
                var _isPart = _this.ParentFormObj.ParentPageObj.IsPart;
                var url = "$windc$" + _this.DataRow.FID;
                if (fileType == 1) {
                    url = url + "$1";
                }
                if (fileType == 2) {
                    url = url + "$2";
                }
                if (fileType == 3) {
                    url = url + "$3";
                }
                if (_isPart) {
                    url = url + "$true";
                }
                $.AKjs.AppGet().openUrl(url);
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createFolderColumn", function (picsize) {
            var _this = this;
            var fid = _this.DataRow.FID;
            var $img = $('<a><i class="ACT-FOLDER icon-folder-close fa fa-folder icon-blue icon-5x" key=' + fid + '></i></a>');
            if (picsize != null) {
                $img = $('<a><i class="ACT-FOLDER icon-folder-close fa fa-folder icon-blue icon-5x" key=' + fid + '></i></a>');
            }
            $img.mouseover(function () {
                var _$i = $(this).find(".ACT-FOLDER");
                _$i.removeClass("icon-folder-close fa fa-folder");
                _$i.addClass("icon-folder-open fa fa-folder-open");
            })
            $img.mouseout(function () {
                var _$i = $(this).find(".ACT-FOLDER");
                _$i.removeClass("icon-folder-open fa fa-folder-open");
                _$i.addClass("icon-folder-close fa fa-folder");
            })
            $img.click(function () {
                var formState = {};
                formState.navi = { "PID": _this.DataRow.FID };
                formState.page = { PageSize: _this.ParentFormObj.PageSize, PageIndex: 0, IsASC: _this.ParentFormObj.IsASC, SortName: _this.ParentFormObj.SortName, DataTime: new Date().Aformat("yyyy-mm-dd hh:nn:ss.S") };
                formState.tablename = _this.ParentFormObj.TableName;
                formState.formType = _this.ParentFormObj.FormType;
                var _isPart = _this.ParentFormObj.ParentPageObj.IsPart;
                if (!_isPart) {
                    var route = _this.ParentFormObj.ParentPageObj.Route;
                    var _url = "$$";
                    if (route) {
                        _url = "$" + route + "$";
                    }
                    _url = _url + "List$" + Base64.encode($.toJSON(formState));
                    $.AKjs.AppGet().Url.openUrl(_url);
                }
                else {
                    var _ds = {};
                    var _list = _ds[_this.ParentFormObj.TableName + "_Search"] = [];
                    _list.push({ PID: _this.DataRow.FID });
                    _this.ParentFormObj.searchDataList(0, true, _ds);
                    if (_this.ParentFormObj.NaviFormObj != null) {
                        var navi = _this.ParentFormObj.NaviFormObj;
                        for (var i = 0; i < navi.length; i++) {
                            if (navi[i].NaviFrom.Name == "PID") {
                                navi[i].reloadTree(_this.DataRow.FID);
                            }
                        }

                    }
                }
            })
            var _$res = $("<a/>");
            $img = _$res.append($img);

            if (picsize != null) {
                var _$td = $('<td class="table-sl ta1"></td>');
                $img = _$td.append($img);
            }
            return $img;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createImageFileColumn", function (picsize) {
            var _this = this;
            var $img = $('<img class="ACT-IMG-FILE"  src="' + this.getImageHttpPath() + '"/>');
            if (picsize != null) {
                $img = $('<img style = " max-height :' + picsize + '; " class="ACT-IMG-FILE"  src="' + this.getImageHttpPath() + '"/>');
            }
            var _urlObj = $.parseJSON(_this.DataRow.URL, true);
            $img.data("Ataw-File", _urlObj);
            $img.attr("key", _this.DataRow.FID);
            if (!this.ParentFormObj.ParentPageObj.NoDbClick) {
                $img.click(function () {
                    var _isPart = _this.ParentFormObj.ParentPageObj.IsPart;
                    if (!_isPart) {
                        $.AKjs.AppGet().openUrl("$windc$" + _this.DataRow.FID + "$1");
                    } else {
                        var IsPublic = true;
                        $.AKjs.AppGet().openUrl("$windc$" + _this.DataRow.FID + "$1$" + IsPublic);
                    }
                })
            }
            var _$res = $("<a/>");
            $img = _$res.append($img);

            if (picsize != null) {
                var _$td = $('<td class="table-sl ta1"></td>');
                $img = _$td.append($img);
            }
            return $img;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createArticleFileColumn", function (picsize) {
            var _this = this;
            var $img = $('<a><i class="icon-edit fa fa-edit icon-5x icon-blue ACT-ARTICLE-FILE"></i></a>');
            if (picsize != null) {
                $img = $('<a><i class="icon-edit fa fa-edit icon-5x icon-blue ACT-ARTICLE-FILE"></i></a>');
            }
            var _urlObj = $.parseJSON(_this.DataRow.URL, true);
            $img.data("Ataw-File", _urlObj);
            $img.attr("key", _this.DataRow.FID);
            if (!this.ParentFormObj.ParentPageObj.NoDbClick) {
                $img.click(function () {
                    var _isPart = _this.ParentFormObj.ParentPageObj.IsPart;
                    if (!_isPart) {
                        $.AKjs.AppGet().openUrl("$windc$" + _this.DataRow.FID + "$2");
                    } else {
                        var IsPublic = true;
                        $.AKjs.AppGet().openUrl("$windc$" + _this.DataRow.FID + "$2$" + IsPublic);
                    }
                })
            }
            var _$res = $("<a/>");
            $img = _$res.append($img);
            if (picsize != null) {
                var _$td = $('<td class="table-sl ta1"></td>');
                $img = _$td.append($img);
            }
            return $img;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createOtherFileColumn", function (picsize) {
            var _this = this;
            var $img = $('<i class="icon-file-alt fa fa-file-text-o icon-5x icon-blue ACT-OTHER-FILE"></i>');
            if (picsize != null) {
                $img = $('<i class="icon-file-alt fa fa-file-text-o icon-5x icon-blue ACT-OTHER-FILE"></i>');
            }
            var _urlObj = $.parseJSON(_this.DataRow.URL, true);
            $img.data("Ataw-File", _urlObj);
            $img.attr("key", _this.DataRow.FID);
            if (!this.ParentFormObj.ParentPageObj.NoDbClick) {
                $img.click(function () {
                    var _isPart = _this.ParentFormObj.ParentPageObj.IsPart;
                    if (!_isPart) {
                        $.AKjs.AppGet().openUrl("$windc$" + _this.DataRow.FID + "$3");
                    } else {
                        var IsPublic = true;
                        $.AKjs.AppGet().openUrl("$windc$" + _this.DataRow.FID + "$3$" + IsPublic);
                    }
                })
            }
            var _$res = $("<a/>");
            $img = _$res.append($img);

            if (picsize != null) {
                var _$td = $('<td class="table-sl ta1"></td>');
                $img = _$td.append($img);
            }
            return $img;
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getImageHttpPath", function () {
            return $.AKjs.GetImgByResource($.parseJSON(this.DataRow.URL, true));
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getdocumentname", function (url) {
            var urlss = url;
            if (url != null) {
                var _resourceArrange = $.parseJSON(url, true);
                if (_resourceArrange.ResourceInfoList.length > 0) {
                    if (_resourceArrange.ResourceInfoList[0].CanDocumentView != undefined) {
                        if (_resourceArrange.ResourceInfoList[0].CanDocumentView) {
                            return _resourceArrange.ResourceInfoList[0].DocumentViewId;
                        }
                    }
                }
            }
            return "";
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initOperateButton", function (_$div) {
            if (this.isSearchRow) {
                _$div.append($('<td class="table-fl"><a><i ichecked="false"  class="ACT-CHECK-SINGLE icon-check-empty fa fa-square-o icon-blue" key="' + this.DataRow.FID + '"/></a></td>'));
            } else {
                _$div.append($('<a><i ichecked="false"  class="ACT-CHECK-SINGLE icon-check-empty fa fa-square-o documents-icon icon-blue" key="' + this.DataRow.FID + '"/></a>'));
            }
            var pageObj = this.ParentFormObj.ParentPageObj;
            var dataButtons = pageObj.DataButtons;
            if (pageObj.IsViewPage) return;
            var BUTTON_RIGHTS;
            if (this.DataRow && this.DataRow.BUTTON_RIGHT) {
                BUTTON_RIGHTS = this.DataRow.BUTTON_RIGHT.split('|');
            }
            if (BUTTON_RIGHTS && !pageObj.IsViewPage) {
                this.ButtonList = BUTTON_RIGHTS;
                this.SupportBtns = this.ButtonList;
                for (dataButton in dataButtons) {
                    if (dataButtons.hasOwnProperty(dataButton) && !dataButtons[dataButton].Unbatchable) {
                        this.BatchableButtonList.push(dataButtons[dataButton].Name);
                    }
                }
            }
        });
    }
})(jQuery);