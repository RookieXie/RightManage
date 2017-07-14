define(["require", "exports", "./../../01core/Ioc", "./../../01core/Url", "./../../03page/BaseWebPage", "react", "./TableColumnDom"], function (require, exports, iocFile, urlFile, basewedPageFile, React, ColumnDomFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableInsertPage;
    (function (TableInsertPage) {
        class TableInsertPageAction extends basewedPageFile.Web.BaseWebPageStates {
        }
        TableInsertPage.TableInsertPageAction = TableInsertPageAction;
        class TableInsertPageReact extends basewedPageFile.Web.BaseWebPageReact {
            constructor() {
                super(...arguments);
                this.state = new TableInsertPageStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: () => { this.saveClick(); } }, "\u4FDD\u5B58")),
                    React.createElement("div", null, this._tDom(this.props.Vm.ColumnDomObj)),
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-info", onClick: () => { this.saveClick(); } }, "\u4FDD\u5B58")));
            }
            saveClick() {
                this.props.Vm.saveClick();
            }
        }
        TableInsertPage.TableInsertPageReact = TableInsertPageReact;
        class TableInsertPageVm extends basewedPageFile.Web.BaseWebPageVm {
            constructor(config) {
                super();
                this.ReactType = TableInsertPageReact;
                this.Title = "TableInsertPage页面";
                this.colunmList = [];
                this.rowData = {};
            }
            init(config) {
            }
            loadPage(callback) {
                this.colunmList = JSON.parse(this.Param1);
                this.colunmList.map(c => {
                    this.rowData[c.name] = "";
                });
                this.ColumnDomObj = new ColumnDomFile.TableColumnDom.TableColumnDomVm({ columnList: this.colunmList, tableRowData: this.rowData });
                if (callback) {
                    callback();
                }
            }
            saveClick() {
                urlFile.Core.AkPost("/RightManage/Common/InsertTable", { tableName: this.Param2, data: JSON.stringify(this.rowData), columns: this.Param1 }, () => {
                });
            }
        }
        TableInsertPage.TableInsertPageVm = TableInsertPageVm;
        class TableInsertPageStates extends basewedPageFile.Web.BaseWebPageStates {
        }
        TableInsertPage.TableInsertPageStates = TableInsertPageStates;
        class TableInsertPageProps extends basewedPageFile.Web.BaseWebPageProps {
        }
        TableInsertPage.TableInsertPageProps = TableInsertPageProps;
        iocFile.Core.Ioc.Current().RegisterType("TABLEINSERTPAGE", basewedPageFile.Web.BaseWebPageVm, TableInsertPageVm);
    })(TableInsertPage = exports.TableInsertPage || (exports.TableInsertPage = {}));
});
