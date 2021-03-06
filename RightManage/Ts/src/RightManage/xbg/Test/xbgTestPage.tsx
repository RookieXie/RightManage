﻿
import domFile = require("./../../../01core/0Dom");
import iocFile = require("./../../../01core/Ioc");
//import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../../../01core/Util");
//import iocFile = require("./../01core/Ioc");
import urlFile = require("./../../../01core/Url");
import basewedPageFile = require("./../../../03page/BaseWebPage");
import tableDomFile = require("./../../../03page/Table/TableDom");
import tableDataFile = require("./../../../03page/Table/Data");
import React = require("react");
import ReactDOM = require("react-dom");
import dateFile = require("./../../../04col/01single/Date");
import textFile = require("./../../../04col/01single/Text");

export module xbgTestPage {
    export class xbgTestPageAction extends basewedPageFile.Web.BaseWebPageStates {
        public DataValue: string;
        public Id: string;
        public Vm: any;
    }

    export class xbgTestPageReact extends basewedPageFile.Web.BaseWebPageReact<xbgTestPageProps, xbgTestPageStates, xbgTestPageAction> implements domCore.IReact {

        public state = new xbgTestPageStates();
        public pSender(): React.ReactElement<any> {
            return <div>
                <div>
                    <button type="button" className="btn btn-info" onClick={() => { this.testClick() }}>测试</button>
                    {this._tDom(this.props.Vm.dateVmObj)}
                    {this._tDom(this.props.Vm.textVmObj)}
                </div>{this._tDom(this.props.Vm.tableDomObj)}</div>;
        }



        public testClick() {
            this.props.Vm.testClick();
        }

    }

    export interface IReactxbgTestPageVm extends basewedPageFile.Web.BaseWebPageVm {
        pageContent: string;
        tableDomObj: tableDomFile.TableDom.TableDomVm;
        testClick();
        dateVmObj: dateFile.DateCol.DateVm;
        textVmObj: textFile.Text.TextVm;
    }
    export interface IxbgTestPageConfig {


    }
    export class xbgTestPageVm extends basewedPageFile.Web.BaseWebPageVm implements IReactxbgTestPageVm {
        public ReactType = xbgTestPageReact;
        public Title: string = "xbgTestPage页面;";
        public pageContent: string = "1";
        public tableDomObj: tableDomFile.TableDom.TableDomVm;
        public dateVmObj: dateFile.DateCol.DateVm = new dateFile.DateCol.DateVm();
        public textVmObj: textFile.Text.TextVm = new textFile.Text.TextVm();
        public constructor(config?: IxbgTestPageConfig) {
            super();

        }

        private init(config: IxbgTestPageConfig) {
        }
        public testClick() {
            //urlFile.Core.AkPost("/Home/Test1", {}, (res) => {
            //    console.table(res);
            //})
        }
        protected loadPage(callback?: () => any) {
            var _page = { PageIndex: 0, PageSize: 10 };
            urlFile.Core.AkPost("/RightManage/Common/GetTable", { tableName: "RM_Menus", pager: JSON.stringify(_page)}, (res) => {
                //this.pageContent = res;
               // var btn: tableDataFile.TableData.ITableButton = { name: "Insert", text: "新增", isbatch: false, Function: () => { alert("Insert"); } }
                var btns: tableDataFile.TableData.ITableButton[] = [];
               // btns.push(btn);
                var _config: tableDomFile.TableDom.ITableDomConfig = { tableColunms: res.tableColunms, tableData: res.tableData, tableName: "RM_Menus", tableButtons: btns }

                this.tableDomObj = new tableDomFile.TableDom.TableDomVm(_config);
                // console.log(res);
                if (callback) {
                    callback();
                }
            })

        }

    }
    export class xbgTestPageStates extends basewedPageFile.Web.BaseWebPageStates {
    }


    export class xbgTestPageProps extends basewedPageFile.Web.BaseWebPageProps<IReactxbgTestPageVm>{
    }


    iocFile.Core.Ioc.Current().RegisterType("XBGTESTPAGE", basewedPageFile.Web.BaseWebPageVm, xbgTestPageVm);

}