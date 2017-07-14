define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DomReact extends React.Component {
        render() {
            return this.pRender();
        }
        pRender() {
            return null;
        }
    }
    exports.DomReact = DomReact;
    class DomVm {
    }
    exports.DomVm = DomVm;
    class TestDomReact extends DomReact {
        pRender() {
            return React.createElement("div", null, this.props.Vm.TestDomVm);
        }
        ;
    }
    exports.TestDomReact = TestDomReact;
    class TestDomVm extends DomVm {
        constructor() {
            super(...arguments);
            this.TestDomVm = "hahahaha";
        }
    }
    exports.TestDomVm = TestDomVm;
});
