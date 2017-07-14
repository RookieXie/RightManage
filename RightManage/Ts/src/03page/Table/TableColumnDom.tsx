import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import dataFile = require("./Data");
import React = require("react");
import ReactDOM = require("react-dom");
import dateFile = require("./../../04col/01single/Date");
import dateTimeFile = require("./../../04col/01single/DateTime");
import textFile = require("./../../04col/01single/Text");
import baseColFile = require("./../../04col/baseCol/baseCol");
export module TableColumnDom {
    export class TableColumnDomAction extends domCore.DomAction {
    }

    export class TableColumnDomReact extends domCore.DomReact<TableColumnDomProps, TableColumnDomStates, TableColumnDomAction> implements domCore.IReact {

        public state = new TableColumnDomStates();

        public pSender(): React.ReactElement<any> {
            return <div>{
                this.props.Vm.columnList.map((a, index) => {
                    if (!a.isHidden) {
                        return this.GetCol(a);
                    }
                })
            }</div>
        }
        public GetCol(column: dataFile.TableData.ITableColunm) {
            var obj = this.props.Vm.TableColumnObjList[column.name];
            return <div key={column.name}> <label className="col-sm-1 control-label">{column.displayName}</label> <div className="col-sm-4">{this._tDom(obj)}</div></div>
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();
        }        
    }

    export interface IReactTableColumnDomVm extends domCore.DomVm {
        columnList: dataFile.TableData.ITableColunm[];
        TableColumnObjList: TableColumnObj
    }
    export interface ITableColumnDomConfig {
        tableRowData: dataFile.TableData.IRowData;
        columnList: dataFile.TableData.ITableColunm[];
    }
    export interface TableColumnObj {
        [name: string]: baseColFile.Core.BaseColVm;
    }

    export class TableColumnDomVm extends domCore.DomVm implements IReactTableColumnDomVm {
        public ReactType = TableColumnDomReact;
        public columnList: dataFile.TableData.ITableColunm[] = [];
        public tableRowData: dataFile.TableData.IRowData = {};
        public TableColumnObjList: TableColumnObj = {};
        public constructor(config?: ITableColumnDomConfig) {
            super();
            if (config) {
                this.columnList = config.columnList;                
                this.tableRowData = config.tableRowData;
                this.columnList.map(column => {
                    var obj: baseColFile.Core.BaseColVm;
                    switch (column.controlType) {
                        case "Text":
                            obj = new textFile.Text.TextVm();
                            obj.dataValueSet(this.tableRowData[column.name]);
                            obj.ChangeEventFun = (val, col) => {
                                this.tableRowData[column.name] = val;
                                this.forceUpdate("");
                                return true;
                            }
                            break;
                        case "Date":
                            obj = new dateFile.DateCol.DateVm();
                            obj.ChangeEventFun = (val, col) => {
                                this.tableRowData[column.name] = val;
                                this.forceUpdate("");
                                return true;
                            }
                            break;
                        default:
                            obj = new textFile.Text.TextVm();
                            obj.ChangeEventFun = (val, col) => {
                                this.tableRowData[column.name] = val;
                                this.forceUpdate("");
                                return true;
                            }
                            break;
                    }
                    obj.dataValueSet(this.tableRowData[column.name]);
                    this.TableColumnObjList[column.name] = obj;
                })
            }

        }

    }
    export class TableColumnDomStates extends domCore.DomStates {
    }


    export class TableColumnDomProps extends domCore.DomProps<IReactTableColumnDomVm>{
    }



}


