﻿function atoc(numberValue) {
    var _isMin = false;
    if (numberValue < 0) {
        numberValue = numberValue * (-1);
        _isMin = true;
    }
    var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
    var chineseValue = ""; // 转换后的汉字金额
    var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
    var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
    var len = numberValue.length; // numberValue 的字符串长度
    var Ch1; // 数字的汉语读法
    var Ch2; // 数字位的汉字读法
    var nZero = 0; // 用来计算连续的零值的个数
    var String3; // 指定位置的数值
    if (len > 15) {
        alert("超出计算范围");
        return "";
    }
    if (numberValue == 0) {
        chineseValue = "零元整";
        return chineseValue;
    }
    String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
    for (var i = 0; i < len; i++) {
        String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
        if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
            if (String3 == 0) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
        }
        else { // 该位是万亿，亿，万，元位等关键位
            if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 != 0 && nZero == 0) {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 == 0 && nZero >= 3) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else {
                Ch1 = "";
                Ch2 = String2.substr(i, 1);
                nZero = nZero + 1;
            }
            if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
                Ch2 = String2.substr(i, 1);
            }
        }
        chineseValue = chineseValue + Ch1 + Ch2;
    }
    if (String3 == 0) { // 最后一位（分）为0时，加上“整”
        chineseValue = chineseValue + "整";
    }
    if (_isMin) {
        chineseValue = "负" + chineseValue;
    }
    return chineseValue;
}

function formatValue(val) {
    if (val != undefined && val != null && val != "") {
        val = val + "";
        var arr = val.split('.');
        var subVal = arr[0];
        var length = subVal.length;
        if (length <= 3) {
            return "￥" + val;
        }
        else {
            var _list = [];
            var count = Math.ceil(length / 3);
            for (var i = 1; i < count + 1; i++) {
                if (length - i * 3 < 0) {
                    _list.unshift(subVal.substr(0, length - (i - 1) * 3));
                }
                else {
                    _list.unshift(subVal.substr(length - i * 3, 3));
                }
            }
            var _res = arr.length > 1 ? "￥" + _list.join(",") + "." + arr[1] : "￥" + _list.join(",");
            return _res;
        }

    }
    else
        return val;
}