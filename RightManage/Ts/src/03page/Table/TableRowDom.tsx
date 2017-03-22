import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../01core/Util");
import iocFile = require("./../../01core/Ioc");
import urlFile = require("./../../01core/Url");
import dataFile = require("./Data");
import React = require("react");
import ReactDOM = require("react-dom");

export module TableRowDom {
    export class TableRowDomAction extends domCore.DomAction {
    }

    export class TableRowDomReact extends domCore.DomReact<TableRowDomProps, TableRowDomStates, TableRowDomAction> implements domCore.IReact {

        public state = new TableRowDomStates();

        public pSender(): React.ReactElement<any> {
            return <tr><td><input type="checkbox" checked={this.props.Vm.isCheck} onClick={() => { this.checkClick()}} /></td>
                {this.props.Vm.columList.map((a,index) => {
                    if (!a.isHidden) {
                        return <td key={index}>{this.props.Vm.tableRowData[a.name]}</td>
                    }
                })}
            </tr>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();
        }
        public checkClick() {
            this.props.Vm.isCheck = !this.props.Vm.isCheck;
            this.forceUpdate();
        }
    }

    export interface IReactTableRowDomVm extends domCore.DomVm {
        columList: dataFile.TableData.ITableColunm[];
        tableRowData: dataFile.TableData. IRowData;
        isCheck: boolean
    }
    export interface ITableRowDomConfig {
        tableRowData: dataFile.TableData. IRowData;
        columList: dataFile.TableData.ITableColunm[];
    }

    export class TableRowDomVm extends domCore.DomVm implements IReactTableRowDomVm {
        public ReactType = TableRowDomReact;
        public columList: dataFile.TableData.ITableColunm[] = [];
        public tableRowData: dataFile.TableData.IRowData;
        public isCheck: boolean = false;
        public constructor(config?: ITableRowDomConfig) {
            super();
            if (config) {
                this.columList = config.columList;
                this.tableRowData = config.tableRowData;
            }

        }

    }
    export class TableRowDomStates extends domCore.DomStates {
    }


    export class TableRowDomProps extends domCore.DomProps<IReactTableRowDomVm>{
    }



}


