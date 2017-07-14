
import domFile = require("./../01core/0Dom");
import iocFile = require("./../01core/Ioc");
//import domFile = require("./../../01core/0Dom");
import domCore = domFile.Core;
import utilFile = require("./../01core/Util");
//import iocFile = require("./../01core/Ioc");
import urlFile = require("./../01core/Url");
import React = require("react");
import ReactDOM = require("react-dom");
import dateFile = require("./../04col/01single/Date");
import textFile = require("./../04col/01single/Text");

export module NoLoginDom {
    export class NoLoginDomAction extends domCore.DomAction {
        public DataValue: string;
        public Id: string;
        public Vm: any;
    }

    export class NoLoginDomReact extends domCore.DomReact<NoLoginDomProps, NoLoginDomStates, NoLoginDomAction> implements domCore.IReact {

        public state = new NoLoginDomStates();
        public pSender(): React.ReactElement<any> {
            return <div>
                <div>
                    请退出重新登录！
                    <a href="/RightManage/Home/Index">退出</a>
                </div>
            </div>
        }

    }

    export interface IReactNoLoginDomVm extends domCore.DomVm {
        pageContent: string;
        testClick();
        dateVmObj: dateFile.DateCol.DateVm;
        textVmObj: textFile.Text.TextVm;
    }
    export interface INoLoginDomConfig {


    }
    export class NoLoginDomVm extends domCore.DomVm implements IReactNoLoginDomVm {
        public ReactType = NoLoginDomReact;
        public Title: string = "NoLoginDom页面;";
        public pageContent: string = "1";
        public dateVmObj: dateFile.DateCol.DateVm = new dateFile.DateCol.DateVm();
        public textVmObj: textFile.Text.TextVm = new textFile.Text.TextVm();
        public constructor(config?: INoLoginDomConfig) {
            super();
        }

        private init(config: INoLoginDomConfig) {
        }
        public testClick() {           
        }
    }
    export class NoLoginDomStates extends domCore.DomStates {
    }


    export class NoLoginDomProps extends domCore.DomProps<IReactNoLoginDomVm>{
    }
}