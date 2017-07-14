define(["require", "exports", "./../../01core/0Dom", "react"], function (require, exports, domFile, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeMenu;
    (function (TreeMenu) {
        class TreeMenuAction extends domFile.Core.DomAction {
        }
        TreeMenu.TreeMenuAction = TreeMenuAction;
        class TreeMenuReact extends domFile.Core.DomReact {
            constructor() {
                super(...arguments);
                this.state = new TreeMenuStates();
            }
            pSender() {
                return React.createElement("div", { className: "TreeDiv" },
                    React.createElement("ul", { className: "TreeMenu TreeMenu-pills TreeMenu-stacked" }, this.props.Vm.menuTree.Children.map((a) => {
                        this.props.Vm._arry = [];
                        this.props.Vm.Level = 0;
                        return this.pMenuTree(a, this.props.Vm._arry, this.props.Vm.Level);
                    })));
            }
            pMenuTree(menuTree, _arry, Level) {
                if (menuTree.Parent) {
                    var _arr = React.createElement("li", { className: (menuTree.IsParent ? "TreeParent " : "") + this.getClassName(Level) + (menuTree.Parent.IsOpen ? ((this.isActivity(menuTree) ? " active" : "")) : " hide"), onClick: () => { this.openOrHideMenu(menuTree); } }, menuTree.Tree_Name);
                    _arry.push(_arr);
                }
                else {
                    var _arr = React.createElement("li", { className: (menuTree.IsParent ? "TreeParent " : "") + (menuTree.IsSelect ? " active" : ""), onClick: () => { this.openOrHideMenu(menuTree); } }, menuTree.Tree_Name);
                    _arry.push(_arr);
                }
                Level++;
                if (menuTree.Children) {
                    menuTree.Children.map(a => {
                        a.Parent = menuTree;
                        this.pMenuTree(a, _arry, Level);
                    });
                }
                return _arry;
            }
            isActivity(a) {
                var res = false;
                this.props.Vm.pushNodeObj.map(n => {
                    if (n.Tree_Name == a.Tree_Name)
                        res = n.IsSelect;
                });
                return res;
            }
            openOrHideMenu(a) {
                a.IsOpen = !a.IsOpen;
                if (!a.IsOpen) {
                    a.Children.map(b => {
                        this.hideChilMenu(b);
                    });
                }
                this.props.Vm.pushNodeObj.map(n => {
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
            }
            hideChilMenu(b) {
                b.IsOpen = false;
                if (b.Children) {
                    b.Children.map(c => {
                        this.hideChilMenu(c);
                    });
                }
            }
            getClassName(level) {
                var className = "TreeChildren-" + (level);
                return className;
            }
            activityNode() {
            }
            pComponentDidMount() {
                super.pComponentDidMount();
            }
        }
        TreeMenu.TreeMenuReact = TreeMenuReact;
        class TreeMenuVm extends domFile.Core.DomVm {
            constructor(config) {
                super();
                this.ReactType = TreeMenuReact;
                this._arry = [];
                this.Level = 0;
                this.pushNodeObj = [];
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
                this.menuTree = { Tree_Name: "根", Tree_Value: "0", Children: [] };
                this.menuTree.Children = s;
                this.menuTree.Children.map(a => {
                    this.pushNode(a);
                });
            }
            ;
            pushNode(a) {
                this.pushNodeObj.push(a);
                if (a.Children) {
                    a.Children.map(b => {
                        this.pushNode(b);
                    });
                }
            }
            NodeSelectClick(fun) {
                this.getEmit().addListener("node_click", fun);
            }
        }
        TreeMenu.TreeMenuVm = TreeMenuVm;
        class TreeMenuProps extends domFile.Core.DomProps {
        }
        TreeMenu.TreeMenuProps = TreeMenuProps;
        class TreeMenuStates extends domFile.Core.DomStates {
        }
        TreeMenu.TreeMenuStates = TreeMenuStates;
    })(TreeMenu = exports.TreeMenu || (exports.TreeMenu = {}));
});
