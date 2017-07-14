define(["require", "exports", "./../../01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var domCore = domFile.Core;
    var TableRowDom;
    (function (TableRowDom) {
        class TableRowDomAction extends domCore.DomAction {
        }
        TableRowDom.TableRowDomAction = TableRowDomAction;
        class TableRowDomReact extends domCore.DomReact {
            constructor() {
                super(...arguments);
                this.state = new TableRowDomStates();
            }
            pSender() {
                return React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("input", { type: "checkbox", checked: this.props.Vm.isCheck, onClick: () => { this.checkClick(); } })),
                    this.props.Vm.columList.map((a, index) => {
                        if (!a.isHidden) {
                            return React.createElement("td", { key: index }, this.props.Vm.tableRowData[a.name]);
                        }
                    }));
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
            checkClick() {
                this.props.Vm.isCheck = !this.props.Vm.isCheck;
                this.forceUpdate();
            }
        }
        TableRowDom.TableRowDomReact = TableRowDomReact;
        class TableRowDomVm extends domCore.DomVm {
            constructor(config) {
                super();
                this.ReactType = TableRowDomReact;
                this.columList = [];
                this.isCheck = false;
                if (config) {
                    this.columList = config.columList;
                    this.tableRowData = config.tableRowData;
                }
            }
        }
        TableRowDom.TableRowDomVm = TableRowDomVm;
        class TableRowDomStates extends domCore.DomStates {
        }
        TableRowDom.TableRowDomStates = TableRowDomStates;
        class TableRowDomProps extends domCore.DomProps {
        }
        TableRowDom.TableRowDomProps = TableRowDomProps;
    })(TableRowDom = exports.TableRowDom || (exports.TableRowDom = {}));
});
