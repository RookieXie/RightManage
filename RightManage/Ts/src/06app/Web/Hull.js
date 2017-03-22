"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var domFile = require("./../../01core/0Dom");
var domCore = domFile.Core;
var React = require("react");
var Web;
(function (Web) {
    var HullAction = (function (_super) {
        __extends(HullAction, _super);
        function HullAction() {
            return _super.apply(this, arguments) || this;
        }
        return HullAction;
    }(domCore.DomAction));
    Web.HullAction = HullAction;
    var HullReact = (function (_super) {
        __extends(HullReact, _super);
        function HullReact() {
            var _this = _super.apply(this, arguments) || this;
            _this.state = new HullStates();
            return _this;
        }
        HullReact.prototype.pSender = function () {
            return <div>第一个</div>;
        };
        HullReact.prototype.pComponentDidMount = function () {
            _super.prototype.pComponentDidMount.call(this);
        };
        return HullReact;
    }(domCore.DomReact));
    Web.HullReact = HullReact;
    var HullVm = (function (_super) {
        __extends(HullVm, _super);
        function HullVm(config) {
            var _this = _super.call(this) || this;
            _this.ReactType = HullReact;
            _this.IsAutoHide = false;
            _this.ShowTip = "等待载入页面";
            _this.IsNavHide = false;
            _this.IsHide = true;
            _this.HasTime = false;
            _this.HasHelp = false;
            _this.HasRefresh = false;
            _this.IsMarkHide = false;
            _this.HomeUrl = "$FEED$";
            _this.HasSDKMenu = false;
            _this.IsV1 = true;
            _this.AppList = [];
            _this.HasTools = true;
            _this.HasSet = true;
            _this.IsLockHidden = false;
            _this.IsAddShortCut = false;
            _this.IsMarkHidden = false;
            _this.HasLock = false;
            _this.HasShortCut = false;
            _this.HasMark = false;
            return _this;
        }
        HullVm.prototype.loadPage = function (config) {
        };
        HullVm.prototype.bindPage = function (a, afterFun) {
        };
        return HullVm;
    }(domCore.DomVm));
    Web.HullVm = HullVm;
    var HullStates = (function (_super) {
        __extends(HullStates, _super);
        function HullStates() {
            return _super.apply(this, arguments) || this;
        }
        return HullStates;
    }(domCore.DomStates));
    Web.HullStates = HullStates;
    var HullProps = (function (_super) {
        __extends(HullProps, _super);
        function HullProps() {
            return _super.apply(this, arguments) || this;
        }
        return HullProps;
    }(domCore.DomProps));
    Web.HullProps = HullProps;
})(Web = exports.Web || (exports.Web = {}));
