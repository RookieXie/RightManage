
/// <reference path="../react/react.d.ts" />
declare namespace rcButton {

    import React = __React

    interface ButtonProps {
        /** 设置按钮类型，可选值为 `primary` `ghost` 或者不设 */
        type?: ButtonType | string,
        /** 设置按钮形状，可选值为 `circle` `circle-outline` 或者不设*/
        shape?: string,
        /** 设置按钮大小，可选值为 `small` `large` 或者不设*/
        size?: string,
        /** 设置 `button` 原生的 `type` 值，可选值请参考 HTML标准*/
        htmlType?: string,
        /** `click` 事件的 handler*/
        onClick?: Function,
        /** 设置按钮载入状态*/
        loading?: boolean,
        /** 样式名*/
        className?: string,
    }


    enum ButtonType {
        primary,
        ghost,
        dashed
    }

    interface ButtonGroupProps {
        /** 设置按钮大小，可选值为 `small` `large` 或者不设*/
        size?: string

    }

    /**
    可以将多个 `Button` 放入 `Button.Group` 的容器中。
    
    通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。*/
    class ButtonGroup extends React.Component<ButtonGroupProps, {}> {
        render(): JSX.Element
    }

    /**
     * #Button
    按钮用于开始一个即时操作。
    
    ## 何时使用
    
    标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。*/
    export class Button extends React.Component<ButtonProps, {}> {
        static Group: typeof ButtonGroup
        render(): JSX.Element
    }
}

declare module "rc-button" {
    export = rcButton.Button;
}