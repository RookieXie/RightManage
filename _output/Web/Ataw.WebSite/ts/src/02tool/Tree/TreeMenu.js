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
    var TreeMenu;
    (function (TreeMenu) {
        var TreeMenuAction = (function (_super) {
            __extends(TreeMenuAction, _super);
            function TreeMenuAction() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TreeMenuAction;
        }(domFile.Core.DomAction));
        TreeMenu.TreeMenuAction = TreeMenuAction;
        var TreeMenuReact = (function (_super) {
            __extends(TreeMenuReact, _super);
            function TreeMenuReact() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = new TreeMenuStates();
                return _this;
            }
            TreeMenuReact.prototype.pSender = function () {
                var _this = this;
                return React.createElement("div", { className: "TreeDiv" },
                    React.createElement("ul", { className: "TreeMenu TreeMenu-pills TreeMenu-stacked" }, this.props.Vm.menuTree.Children.map(function (a) {
                        _this.props.Vm._arry = [];
                        _this.props.Vm.Level = 0;
                        return _this.pMenuTree(a, _this.props.Vm._arry, _this.props.Vm.Level);
                    })));
            };
            TreeMenuReact.prototype.pMenuTree = function (menuTree, _arry, Level) {
                var _this = this;
                if (menuTree.Parent) {
                    var _arr = React.createElement("li", { className: (menuTree.IsParent ? "TreeParent " : "") + this.getClassName(Level) + (menuTree.Parent.IsOpen ? ((this.isActivity(menuTree) ? " active" : "")) : " hide"), onClick: function () { _this.openOrHideMenu(menuTree); } }, menuTree.Tree_Name);
                    _arry.push(_arr);
                }
                else {
                    var _arr = React.createElement("li", { className: (menuTree.IsParent ? "TreeParent " : "") + (menuTree.IsSelect ? " active" : ""), onClick: function () { _this.openOrHideMenu(menuTree); } }, menuTree.Tree_Name);
                    _arry.push(_arr);
                }
                Level++;
                if (menuTree.Children) {
                    menuTree.Children.map(function (a) {
                        a.Parent = menuTree;
                        _this.pMenuTree(a, _arry, Level);
                    });
                }
                return _arry;
            };
            TreeMenuReact.prototype.isActivity = function (a) {
                var res = false;
                this.props.Vm.pushNodeObj.map(function (n) {
                    if (n.Tree_Name == a.Tree_Name)
                        res = n.IsSelect;
                });
                return res;
            };
            TreeMenuReact.prototype.openOrHideMenu = function (a) {
                var _this = this;
                a.IsOpen = !a.IsOpen;
                if (!a.IsOpen) {
                    a.Children.map(function (b) {
                        _this.hideChilMenu(b);
                    });
                }
                this.props.Vm.pushNodeObj.map(function (n) {
                    if (n.Tree_Name == a.Tree_Name)
                        n.IsSelect = true;
                    else
                        n.IsSelect = false;
                });
                if (a.Tree_Value != "#") {
                    this.props.Vm.reactDataValueSet(a.Tree_Value);
                    var _vm = this.props.Vm;
                    _vm.IsChange = true;
                    _vm.getEmit().emit("node_click", _vm);
                }
                this.forceUpdate();
            };
            TreeMenuReact.prototype.hideChilMenu = function (b) {
                var _this = this;
                b.IsOpen = false;
                if (b.Children) {
                    b.Children.map(function (c) {
                        _this.hideChilMenu(c);
                    });
                }
            };
            TreeMenuReact.prototype.getClassName = function (level) {
                var className = "TreeChildren-" + (level);
                return className;
            };
            TreeMenuReact.prototype.activityNode = function () {
            };
            TreeMenuReact.prototype.pComponentDidMount = function () {
                _super.prototype.pComponentDidMount.call(this);
            };
            return TreeMenuReact;
        }(domFile.Core.DomReact));
        TreeMenu.TreeMenuReact = TreeMenuReact;
        var TreeMenuVm = (function (_super) {
            __extends(TreeMenuVm, _super);
            function TreeMenuVm(config) {
                var _this = _super.call(this) || this;
                _this.ReactType = TreeMenuReact;
                _this._arry = [];
                _this.Level = 0;
                _this.pushNodeObj = [];
                var s = [{
                        "Tree_Name": "菜单",
                        "Tree_Value": "#",
                        "IsParent": true,
                        "IsChildren": false,
                        "IsSelect": true,
                        "Children": [
                            {
                                "Tree_Name": "菜单01",
                                "Tree_Value": "$winxbgTestPage$",
                                "IsParent": false,
                                "IsChildren": true,
                                "Children": []
                            }, {
                                "Tree_Name": "菜单02",
                                "Tree_Value": "Menu02",
                                "IsParent": false,
                                "IsChildren": true,
                                "Children": []
                            }, {
                                "Tree_Name": "菜单03",
                                "Tree_Value": "Menu03",
                                "IsParent": false,
                                "IsChildren": true,
                                "Children": []
                            }
                        ]
                    }, {
                        "Tree_Name": "人员",
                        "Tree_Value": "#",
                        "IsParent": true,
                        "IsChildren": false,
                        "Children": [
                            {
                                "Tree_Name": "人员01",
                                "Tree_Value": "$xbgTestPage$",
                                "IsParent": false,
                                "IsChildren": true,
                                "Children": []
                            }, {
                                "Tree_Name": "人员02",
                                "Tree_Value": "User02",
                                "IsParent": false,
                                "IsChildren": true,
                                "Children": []
                            }, {
                                "Tree_Name": "人员03",
                                "Tree_Value": "User03",
                                "IsParent": false,
                                "IsChildren": true,
                                "Children": []
                            }
                        ]
                    }];
                _this.menuTree = { Tree_Name: "根", Tree_Value: "0", Children: [] };
                _this.menuTree.Children = s;
                _this.menuTree.Children.map(function (a) {
                    _this.pushNode(a);
                });
                return _this;
            }
            ;
            TreeMenuVm.prototype.pushNode = function (a) {
                var _this = this;
                this.pushNodeObj.push(a);
                if (a.Children) {
                    a.Children.map(function (b) {
                        _this.pushNode(b);
                    });
                }
            };
            TreeMenuVm.prototype.NodeSelectClick = function (fun) {
                this.getEmit().addListener("node_click", fun);
            };
            return TreeMenuVm;
        }(domFile.Core.DomVm));
        TreeMenu.TreeMenuVm = TreeMenuVm;
        var TreeMenuProps = (function (_super) {
            __extends(TreeMenuProps, _super);
            function TreeMenuProps() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TreeMenuProps;
        }(domFile.Core.DomProps));
        TreeMenu.TreeMenuProps = TreeMenuProps;
        var TreeMenuStates = (function (_super) {
            __extends(TreeMenuStates, _super);
            function TreeMenuStates() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TreeMenuStates;
        }(domFile.Core.DomStates));
        TreeMenu.TreeMenuStates = TreeMenuStates;
    })(TreeMenu = exports.TreeMenu || (exports.TreeMenu = {}));
});
