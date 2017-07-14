define(["require", "exports", "./../01core/0Dom", "react", "./../04col/01single/Date", "./../04col/01single/Text"], function (require, exports, domFile, React, dateFile, textFile) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import domFile = require("./../../01core/0Dom");
    var domCore = domFile.Core;
    var NoLoginDom;
    (function (NoLoginDom) {
        class NoLoginDomAction extends domCore.DomAction {
        }
        NoLoginDom.NoLoginDomAction = NoLoginDomAction;
        class NoLoginDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new NoLoginDomStates();
            }
            pSender() {
                return React.createElement("div", null,
                    React.createElement("div", null,
                        "\u8BF7\u9000\u51FA\u91CD\u65B0\u767B\u5F55\uFF01",
                        React.createElement("a", { href: "/RightManage/Home/Index" }, "\u9000\u51FA")));
            }
        }
        NoLoginDom.NoLoginDomReact = NoLoginDomReact;
        class NoLoginDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = NoLoginDomReact;
                this.Title = "NoLoginDom页面;";
                this.pageContent = "1";
                this.dateVmObj = new dateFile.DateCol.DateVm();
                this.textVmObj = new textFile.Text.TextVm();
            }
            init(config) {
            }
            testClick() {
            }
        }
        NoLoginDom.NoLoginDomVm = NoLoginDomVm;
        class NoLoginDomStates extends domCore.DomStates {
        }
        NoLoginDom.NoLoginDomStates = NoLoginDomStates;
        class NoLoginDomProps extends domCore.DomProps {
        }
        NoLoginDom.NoLoginDomProps = NoLoginDomProps;
    })(NoLoginDom = exports.NoLoginDom || (exports.NoLoginDom = {}));
});
