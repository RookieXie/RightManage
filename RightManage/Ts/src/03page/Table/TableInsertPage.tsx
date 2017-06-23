import domFile = require("./../../01core/0Dom");
import iocFile = require("./../../01core/Ioc");
//import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
//import iocFile = require("./../01core/Ioc");
import urlFile = require("./../../01core/Url");
import basewedPageFile = require("./../../03page/BaseWebPage");
import dataFile = require("./Data");
import React = require("react");
import ReactDOM = require("react-dom");

export module TableInsertPage {
    export class TableInsertPageAction extends basewedPageFile.Web.BaseWebPageStates {
        public DataValue: string;
        public Id: string;
        public Vm: any;
    }

    export class TableInsertPageReact extends basewedPageFile.Web.BaseWebPageReact<TableInsertPageProps, TableInsertPageStates, TableInsertPageAction> implements domCore.IReact {

        public state = new TableInsertPageStates();
        public pSender(): React.ReactElement<any> {
            return <div>
                <div><button type="button" className="btn btn-info" onClick={() => { this.saveClick() }}>保存</button></div>
                <div>{
                    this.props.Vm.colunmList.map((a, index) => {
                        if (!a.isHidden) {
                            return <div key={index}>
                                <label class="col-sm-1 control-label">{a.displayName}</label>
                                <div class="col-sm-4">
                                    <input type={a.controlType} value={this.props.Vm.rowData[a.name]} onChange={(e) => { this.changeValue(e, a.name) }} />
                                </div>
                            </div>
                        }
                    })
                }</div>
                <div><button type="button" className="btn btn-info" onClick={() => { this.saveClick() }}>保存</button></div>
            </div>;
        }

        public changeValue(e: React.FormEvent, name: string) {
            var _val = e.target["value"];
            this.props.Vm.rowData[name] = _val;
            this.forceUpdate();
        }
        public saveClick() {
            this.props.Vm.saveClick();
        }



    }

    export interface IReactTableInsertPageVm extends basewedPageFile.Web.BaseWebPageVm {
        colunmList: dataFile.TableData.ITableColunm[];
        rowData: dataFile.TableData.IRowData;
        saveClick();
    }

    export interface ITableInsertPageConfig {
    }
    export class TableInsertPageVm extends basewedPageFile.Web.BaseWebPageVm implements IReactTableInsertPageVm {
        public ReactType = TableInsertPageReact;
        public Title: string = "TableInsertPage页面";
        public colunmList: dataFile.TableData.ITableColunm[] = [];
        public rowData: dataFile.TableData.IRowData = {};
        public constructor(config?: ITableInsertPageConfig) {
            super();

        }

        private init(config: ITableInsertPageConfig) {
        }

        protected loadPage(callback?: () => any) {
            this.colunmList = JSON.parse(this.Param1);
            this.colunmList.map(c => {
                this.rowData[c.name] = "";
            })
            if (callback) {
                callback();
            }
        }
        public saveClick() {
            urlFile.Core.AkPost("/RightManage/Common/InsertTable", { tableName: this.Param2, data: JSON.stringify(this.rowData), columns: this.Param1 }, () => {
                
            })
        }

    }
    export class TableInsertPageStates extends basewedPageFile.Web.BaseWebPageStates {
    }


    export class TableInsertPageProps extends basewedPageFile.Web.BaseWebPageProps<IReactTableInsertPageVm>{
    }


    iocFile.Core.Ioc.Current().RegisterType("TABLEINSERTPAGE", basewedPageFile.Web.BaseWebPageVm, TableInsertPageVm);

}

