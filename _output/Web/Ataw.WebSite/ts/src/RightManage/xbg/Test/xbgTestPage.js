define(["require", "exports", "./../../../01core/Ioc", "./../../../01core/Url", "./../../../03page/BaseWebPage", "./../../../03page/Table/TableDom", "react", "./../../../04col/01single/Date", "./../../../04col/01single/Text"], function (require, exports, iocFile, urlFile, basewedPageFile, tableDomFile, React, dateFile, textFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var xbgTestPage;
    (function (xbgTestPage) {
        class xbgTestPageAction extends basewedPageFile.Web.BaseWebPageStates {
        }
        xbgTestPage.xbgTestPageAction = xbgTestPageAction;
        class xbgTestPageReact extends basewedPageFile.Web.BaseWebPageReact {
            constructor() {
                super(...arguments);
                this.state = new xbgTestPageStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: () => { this.testClick(); } }, "\u6D4B\u8BD5"),
                        this._tDom(this.props.Vm.dateVmObj),
                        this._tDom(this.props.Vm.textVmObj)),
                    this._tDom(this.props.Vm.tableDomObj));
            }
            testClick() {
                this.props.Vm.testClick();
            }
        }
        xbgTestPage.xbgTestPageReact = xbgTestPageReact;
        class xbgTestPageVm extends basewedPageFile.Web.BaseWebPageVm {
            constructor(config) {
                super();
                this.ReactType = xbgTestPageReact;
                this.Title = "xbgTestPage页面;";
                this.pageContent = "1";
                this.dateVmObj = new dateFile.DateCol.DateVm();
                this.textVmObj = new textFile.Text.TextVm();
            }
            init(config) {
            }
            testClick() {
                //urlFile.Core.AkPost("/Home/Test1", {}, (res) => {
                //    console.table(res);
                //})
            }
            loadPage(callback) {
                var _page = { PageIndex: 0, PageSize: 10 };
                urlFile.Core.AkPost("/RightManage/Common/GetTable", { tableName: "RM_Menus", pager: JSON.stringify(_page) }, (res) => {
                    //this.pageContent = res;
                    // var btn: tableDataFile.TableData.ITableButton = { name: "Insert", text: "新增", isbatch: false, Function: () => { alert("Insert"); } }
                    var btns = [];
                    // btns.push(btn);
                    var _config = { tableColunms: res.tableColunms, tableData: res.tableData, tableName: "RM_Menus", tableButtons: btns };
                    this.tableDomObj = new tableDomFile.TableDom.TableDomVm(_config);
                    // console.log(res);
                    if (callback) {
                        callback();
                    }
                });
            }
        }
        xbgTestPage.xbgTestPageVm = xbgTestPageVm;
        class xbgTestPageStates extends basewedPageFile.Web.BaseWebPageStates {
        }
        xbgTestPage.xbgTestPageStates = xbgTestPageStates;
        class xbgTestPageProps extends basewedPageFile.Web.BaseWebPageProps {
        }
        xbgTestPage.xbgTestPageProps = xbgTestPageProps;
        iocFile.Core.Ioc.Current().RegisterType("XBGTESTPAGE", basewedPageFile.Web.BaseWebPageVm, xbgTestPageVm);
    })(xbgTestPage = exports.xbgTestPage || (exports.xbgTestPage = {}));
});
