import domFile = require("./../../01core/0Dom");
import iocFile = require("./../../01core/Ioc");
import utilFile = require("./../../01core/Util");
/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/react/react-dom.d.ts" />
import React = require("react");
import ReactDOM = require("react-dom");

export module TreeMenu {
    export class TreeMenuAction extends domFile.Core.DomAction {

    }
    export class TreeMenuReact extends domFile.Core.DomReact<TreeMenuProps, TreeMenuStates, TreeMenuAction> implements domFile.Core.IReact {
        public state = new TreeMenuStates();
        public pSender(): React.ReactElement<any> {
            return <div className="TreeDiv"><ul className="TreeMenu TreeMenu-pills TreeMenu-stacked">
                {this.props.Vm.menuTree.Children.map((a) => {
                    this.props.Vm._arry = [];
                    this.props.Vm.Level = 0;
                    return this.pMenuTree(a, this.props.Vm._arry, this.props.Vm.Level);
                })}
            </ul>
            </div>
        }
        public pMenuTree(menuTree: ITreeMenu, _arry: React.ReactElement<any>[], Level: number) {
            if (menuTree.Parent) {
                var _arr = <li className={(menuTree.IsParent ? "TreeParent " : "") + this.getClassName(Level) + (menuTree.Parent.IsOpen ? ((this.isActivity(menuTree) ? " active" : "")) : " hide")} onClick={() => { this.openOrHideMenu(menuTree) }}>{menuTree.Tree_Name}</li>;
                _arry.push(_arr);
            } else {
                var _arr = <li className={(menuTree.IsParent ? "TreeParent " : "") + (menuTree.IsSelect ? " active" : "")} onClick={() => { this.openOrHideMenu(menuTree) }}>{menuTree.Tree_Name}</li>;
                _arry.push(_arr);
            }

            Level++;
            if (menuTree.Children) {
                menuTree.Children.map(a => {
                    a.Parent = menuTree;
                    this.pMenuTree(a, _arry, Level);
                })
            }
            return _arry;

        }
        public isActivity(a: ITreeMenu) {
            var res: boolean = false;
            this.props.Vm.pushNodeObj.map(n => {
                if (n.Tree_Name == a.Tree_Name)
                    res = n.IsSelect
            })
            return res;
        }
        public openOrHideMenu(a: ITreeMenu) {
            a.IsOpen = !a.IsOpen;
            if (!a.IsOpen) {
                a.Children.map(b => {
                    this.hideChilMenu(b);
                })
            }
            this.props.Vm.pushNodeObj.map(n => {
                if (n.Tree_Name == a.Tree_Name)
                    n.IsSelect = true;
                else
                    n.IsSelect = false;
            })
            if (a.Tree_Value != "#") {
                this.props.Vm.reactDataValueSet(a.Tree_Value);
                var _vm = this.props.Vm;
                _vm.IsChange = true;
                _vm.getEmit().emit("node_click", _vm);
            }
            this.forceUpdate();
        }
        public hideChilMenu(b: ITreeMenu) {
            b.IsOpen = false;
            if (b.Children) {
                b.Children.map(c => {
                    this.hideChilMenu(c);
                })
            }
        }
        public getClassName(level: number) {
            var className = "TreeChildren-" + (level);
            return className;
        }
        public activityNode() {

        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
    }
    export interface INodeSelectorFun {
        (node: TreeMenuVm): boolean;
    }
    export interface ITreeMenu {
        Tree_Name: string;
        Tree_Value: string;
        Tree_Icon?: string;
        Children?: ITreeMenu[];
        IsOpen?: boolean;
        IsParent?: boolean;
        IsChildren?: boolean;
        IsSelect?: boolean;
        IsDisableSelect?: boolean;
        Parent?: ITreeMenu;
    }
    export class TreeMenuVm extends domFile.Core.DomVm {
        public ReactType = TreeMenuReact;
        public menuTree: ITreeMenu;
        public _arry: React.ReactElement<any>[] = [];
        public Level: number = 0;
        public pushNodeObj: ITreeMenu[]=[];
        public constructor(config?: ITreeMenu) {
            super();
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
                        "Children": [
                        ]
                    }, {
                        "Tree_Name": "菜单02",
                        "Tree_Value": "Menu02",
                        "IsParent": false,
                        "IsChildren": true,
                        "Children": [
                        ]
                    }, {
                        "Tree_Name": "菜单03",
                        "Tree_Value": "Menu03",
                        "IsParent": false,
                        "IsChildren": true,
                        "Children": [
                        ]
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
                        "Children": [
                        ]
                    }, {
                        "Tree_Name": "人员02",
                        "Tree_Value": "User02",
                        "IsParent": false,
                        "IsChildren": true,
                        "Children": [
                        ]
                    }, {
                        "Tree_Name": "人员03",
                        "Tree_Value": "User03",
                        "IsParent": false,
                        "IsChildren": true,
                        "Children": [
                        ]
                    }
                ]
            }];
            this.menuTree = { Tree_Name: "根", Tree_Value: "0", Children: [] };
            this.menuTree.Children = s;
            this.menuTree.Children.map(a => {
                this.pushNode(a);
            })

        };
        public pushNode(a: ITreeMenu) {
            this.pushNodeObj.push(a);
            if (a.Children) {
                a.Children.map(b => {
                    this.pushNode(b);
                })
            }
        }
        public NodeSelectClick(fun: INodeSelectorFun) {
            this.getEmit().addListener("node_click", fun);
        }


    }
    export class TreeMenuProps extends domFile.Core.DomProps<TreeMenuVm> {

    }
    export class TreeMenuStates extends domFile.Core.DomStates {

    }
}