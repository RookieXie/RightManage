define(["require", "exports", "./../../01core/0Dom", "react", "./../../04col/01single/Date", "./../../04col/01single/Text"], function (require, exports, domFile, React, dateFile, textFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var TableColumnDom;
    (function (TableColumnDom) {
        class TableColumnDomAction extends domCore.DomAction {
        }
        TableColumnDom.TableColumnDomAction = TableColumnDomAction;
        class TableColumnDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new TableColumnDomStates();
            }
            pSender() {
                return React.createElement("div", null, this.props.Vm.columnList.map((a, index) => {
                    if (!a.isHidden) {
                        return this.GetCol(a);
                    }
                }));
            }
            GetCol(column) {
                var obj = this.props.Vm.TableColumnObjList[column.name];
                return React.createElement("div", { key: column.name },
                    " ",
                    React.createElement("label", { className: "col-sm-1 control-label" }, column.displayName),
                    " ",
                    React.createElement("div", { className: "col-sm-4" }, this._tDom(obj)));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        TableColumnDom.TableColumnDomReact = TableColumnDomReact;
        class TableColumnDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = TableColumnDomReact;
                this.columnList = [];
                this.tableRowData = {};
                this.TableColumnObjList = {};
                if (config) {
                    this.columnList = config.columnList;
                    this.tableRowData = config.tableRowData;
                    this.columnList.map(column => {
                        var obj;
                        switch (column.controlType) {
                            case "Text":
                                obj = new textFile.Text.TextVm();
                                obj.dataValueSet(this.tableRowData[column.name]);
                                obj.ChangeEventFun = (val, col) => {
                                    this.tableRowData[column.name] = val;
                                    this.forceUpdate("");
                                    return true;
                                };
                                break;
                            case "Date":
                                obj = new dateFile.DateCol.DateVm();
                                obj.ChangeEventFun = (val, col) => {
                                    this.tableRowData[column.name] = val;
                                    this.forceUpdate("");
                                    return true;
                                };
                                break;
                            default:
                                obj = new textFile.Text.TextVm();
                                obj.ChangeEventFun = (val, col) => {
                                    this.tableRowData[column.name] = val;
                                    this.forceUpdate("");
                                    return true;
                                };
                                break;
                        }
                        obj.dataValueSet(this.tableRowData[column.name]);
                        this.TableColumnObjList[column.name] = obj;
                    });
                }
            }
        }
        TableColumnDom.TableColumnDomVm = TableColumnDomVm;
        class TableColumnDomStates extends domCore.DomStates {
        }
        TableColumnDom.TableColumnDomStates = TableColumnDomStates;
        class TableColumnDomProps extends domCore.DomProps {
        }
        TableColumnDom.TableColumnDomProps = TableColumnDomProps;
    })(TableColumnDom = exports.TableColumnDom || (exports.TableColumnDom = {}));
});
