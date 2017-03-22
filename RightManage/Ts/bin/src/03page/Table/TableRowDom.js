var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./../../01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    exports.__esModule = true;
    var domCore = domFile.Core;
    var TableRowDom;
    (function (TableRowDom) {
        var TableRowDomAction = (function (_super) {
            __extends(TableRowDomAction, _super);
            function TableRowDomAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableRowDomAction;
        }(domCore.DomAction));
        TableRowDom.TableRowDomAction = TableRowDomAction;
        var TableRowDomReact = (function (_super) {
            __extends(TableRowDomReact, _super);
            function TableRowDomReact() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = new TableRowDomStates();
                return _this;
            }
            TableRowDomReact.prototype.pSender = function () {
                var _this = this;
                return React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("input", { type: "checkbox", checked: this.props.Vm.isCheck, onClick: function () { _this.checkClick(); } })),
                    this.props.Vm.columList.map(function (a, index) {
                        if (!a.isHidden) {
                            return React.createElement("td", { key: index }, _this.props.Vm.tableRowData[a.name]);
                        }
                    }));
            };
            TableRowDomReact.prototype.pComponentDidMount = function () {
                _super.prototype.pComponentDidMount.call(this);
            };
            TableRowDomReact.prototype.checkClick = function () {
                this.props.Vm.isCheck = !this.props.Vm.isCheck;
                this.forceUpdate();
            };
            return TableRowDomReact;
        }(domCore.DomReact));
        TableRowDom.TableRowDomReact = TableRowDomReact;
        var TableRowDomVm = (function (_super) {
            __extends(TableRowDomVm, _super);
            function TableRowDomVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = TableRowDomReact;
                _this.columList = [];
                _this.isCheck = false;
                if (config) {
                    _this.columList = config.columList;
                    _this.tableRowData = config.tableRowData;
                }
                return _this;
            }
            return TableRowDomVm;
        }(domCore.DomVm));
        TableRowDom.TableRowDomVm = TableRowDomVm;
        var TableRowDomStates = (function (_super) {
            __extends(TableRowDomStates, _super);
            function TableRowDomStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableRowDomStates;
        }(domCore.DomStates));
        TableRowDom.TableRowDomStates = TableRowDomStates;
        var TableRowDomProps = (function (_super) {
            __extends(TableRowDomProps, _super);
            function TableRowDomProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableRowDomProps;
        }(domCore.DomProps));
        TableRowDom.TableRowDomProps = TableRowDomProps;
    })(TableRowDom = exports.TableRowDom || (exports.TableRowDom = {}));
});
