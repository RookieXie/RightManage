// --------------------------------
// String/Number/Array/Date.prototype
// --------------------------------
(function ($) {
    if (!$) return;
    // Object原型方法扩展
    //-------------------------------------------
    //     $.extend(Object.prototype, {
    //        'isEmpty': function () {
    //            return $.AKjs.IsEmpty(this);
    //        }
    //        });

    // ----------------------------
    // String原型方法扩展
    $.extend(String.prototype, {
        'AisDate': function () {
            var str = this;
            var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null) return false;
            var d = new Date(r[1], r[3] - 1, r[4]);
            return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
        },
        'AisDateTime': function () {
            var str = this;
            var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            var r = str.match(reg);
            if (r == null) return false;
            var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
            return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
        },
        'AgetTextByHtml': function () {
            return $("<span>" + this + "</span>").text();
        },
        'AisEmpty': function () {
            return $.AKjs.IsEmpty(this);
        },
        'Atrim': function () {
            return this.replace(/(^\s*)|(\s*$)/g, '');
        },
        'Altrim': function () {
            return this.replace(/(^\s*)/g, '');
        },
        'Artrim': function () {
            return this.replace(/(\s*$)/g, '');
        },
        'AtrimAll': function () {
            return this.replace(/\s/g, '');
        },
        'Aleft': function (len) {
            return this.substring(0, len);
        },
        'Aright': function (len) {
            if (this.length <= len) {
                return this;
            }
            return this.substring(this.length - len, this.length);
        },
        'Areverse': function () {
            return this.split('').reverse().join('');
        },
        'AstartWith': function (start, noCase) {
            var index = noCase ? this.toLowerCase().indexOf(start.toLowerCase()) : this.indexOf(start);
            return !index;
        },
        'AendWith': function (end, noCase) {
            return noCase ? (new RegExp(end.toLowerCase() + "$").test(this.toLowerCase().trim())) : (new RegExp(end + "$").test(this.trim()));
        },
        'AsliceAfter': function (str) {
            if (this.indexOf(str) < 0) return '';
            return this.substring(this.indexOf(str) + str.length, this.length);
        },
        'AsliceBefore': function (str) {
            if (this.indexOf(str) < 0) return '';
            return this.substring(0, this.indexOf(str));
        },
        'AgetByteLength': function () {
            return this.replace(/[^\x00-\xff]/ig, 'xx').length;
        },
        'AsubByte': function (len, s) {
            if (len < 0 || this.getByteLength() <= len) {
                return this;
            }
            var str = this;
            str = str.substr(0, len).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, len).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "\x241");
            return str + (s || '');
        },
        'AstringToHex': function () {
            var str = this;
            var val = "";
            for (var i = 0; i < str.length; i++) {
                if (val == "")
                    val = str.charCodeAt(i);
                else
                    val += "," + str.charCodeAt(i);
            }
            return val;
        },
        'AhexToString': function () {
            var str = this;
            var val = "";
            var arr = str.split(",");
            for (var i = 0; i < arr.length; i++) {
                val += String.fromCharCode(arr[i]);
            }
            return val;
        },
        'AunEncrypt': function () {
            var output = new String();
            var Temp = new Array();
            var Temp2 = new Array();
            var TextSize = theText.length;
            for (i = 0; i < TextSize; i++) {
                Temp[i] = theText.charCodeAt(i);
                Temp2[i] = theText.charCodeAt(i + 1);
            }
            for (i = 0; i < TextSize; i = i + 2) {
                output += String.fromCharCode(Temp[i] - Temp2[i]);
            }
            return output;
        },
        'AtextToHtml': function () {
            return this.replace(/</ig, '&lt;').replace(/>/ig, '&gt;').replace(/\r\n/ig, '<br>').replace(/\n/ig, '<br>');
        },
        'AhtmlToText': function () {
            return this.replace(/<br>/ig, '\r\n');
        },
        'AhtmlEncode': function () {
            var text = this; var re = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' };
            for (i in re) {
                text = text.replace(new RegExp(i, 'g'), re[i]);
            }
            return text;
        },
        'AhtmlDecode': function () {
            var text = this;
            var re = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"' };
            for (i in re) {
                text = text.replace(new RegExp(i, 'g'), re[i]);
            }
            return text;
        },
        'AstripHtml': function () {
            return this.replace(/(<\/?[^>\/]*)\/?>/ig, '');
        },
        'AstripScript': function () {
            return this.replace(/<script(.|\n)*\/script>\s*/ig, '').replace(/on[a-z]*?\s*?=".*?"/ig, '');
        },
        'AreplaceAll': function (os, ns) {
            return this.replace(new RegExp(os, "gm"), ns);
        },
        'AescapeReg': function () {
            return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
        },
        'AgetQueryValue': function (name) {
            var reg = new RegExp("(^|&|\\?|#)" + name.escapeReg() + "=([^&]*)(&|\x24)", "");
            var match = this.match(reg);
            return (match) ? match[2] : '';
        },
        'AgetQueryJson': function () {
            if (this.lastIndexOf('?') == -1 || this.right(1) == '?') return {};
            var query = this.substr(this.indexOf('?') + 1), params = query.split('&'), len = params.length, result = {}, key, value, item, param;
            for (var i = 0; i < len; i++) {
                param = params[i].split('=');
                key = param[0];
                value = param[1];
                item = result[key];
                if ('undefined' == typeof item) {
                    result[key] = unescape(value);
                } else if (Object.prototype.toString.call(item) == '[object Array]') {
                    item.push(value);
                } else {
                    result[key] = [item, value];
                }
            }
            return result;
        },
        'AgetPathName': function () {
            return (this.lastIndexOf('?') == -1) ? this.toString() : this.substring(0, this.lastIndexOf('?'));
        },
        'AgetFilePath': function () {
            return this.substring(0, this.lastIndexOf('/') + 1);
        },
        'AgetFileName': function () {
            return this.substring(this.lastIndexOf('/') + 1);
        },
        'AgetFileExt': function () {
            return this.substring(this.lastIndexOf('.') + 1);
        },
        'AparseDate': function () {
            return (new Date()).parse(this.toString());
        },
        'AparseJSON': function () {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(this.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + this.toString() + ')');
            } catch (e) {
                return false;
            }
        },
        'AparseAttrJSON': function () {
            var d = {}, a = this.toString().split(';');
            for (var i = 0; i < a.length; i++) {
                if (a[i].trim() == '' || a[i].indexOf(':') < 1) continue;
                var b = a[i].split(':');
                if (b[0].trim() != '' && b[1].trim() != '') d[b[0].toCamelCase()] = b[1];
            }
            return d;
        },
        'AisURL': function () {
            return true;
            //return (new RegExp(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i).test(this.trim()));
        },
        'A_pad': function (width, ch, side) {
            var str = [side ? '' : this, side ? this : ''];
            while (str[side].length < (width ? width : 0) && (str[side] = str[1] + (ch || ' ') + str[0]));
            return str[side];
        },
        'ApadLeft': function (width, ch) {
            if (this.length >= width) return this.toString();
            return this._pad(width, ch, 0);
        },
        'ApadRight': function (width, ch) {
            if (this.length >= width) return this.toString();
            return this._pad(width, ch, 1);
        },
        'AtoHalfWidth': function () {
            return this.replace(/[\uFF01-\uFF5E]/g, function (c) {
                return String.fromCharCode(c.charCodeAt(0) - 65248);
            }).replace(/\u3000/g, " ");
        },
        'AtoCamelCase': function () {
            if (this.indexOf('-') < 0 && this.indexOf('_') < 0) {
                return this;
            }
            return this.replace(/[-_][^-_]/g, function (match) {
                return match.charAt(1).toUpperCase();
            });
        },
        'Aformat': function () {
            var result = this;
            if (arguments.length > 0) {
                parameters = $.makeArray(arguments);
                $.each(parameters, function (i, n) {
                    result = result.replace(new RegExp("\\{" + i + "\\}", "g"), n);
                });
            }
            return result;
        },
        'Asubstitute': function (data) {
            if (data && typeof (data) == 'object') {
                return this.replace(/\{([^{}]+)\}/g, function (match, key) {
                    var value = data[key];
                    return (value !== undefined) ? '' + value : '';
                });
            } else {
                return this.toString();
            }
        },
        'AhtmlSubstring': function (n) {
            var s = this;
            var m, r = /<([^>\s]*)[^>]*>/g,
        stack = [],
        lasti = 0,
        result = '';

            //for each tag, while we don't have enough characters
            while ((m = r.exec(s)) && n) {
                //get the text substring between the last tag and this one
                var temp = s.substring(lasti, m.index).substr(0, n);
                //append to the result and count the number of characters added
                result += temp;
                n -= temp.length;
                lasti = r.lastIndex;

                if (n) {
                    result += m[0];
                    if (m[1].indexOf('/') === 0) {
                        //if this is a closing tag, than pop the stack (does not account for bad html)
                        stack.pop();
                    } else if (m[1].lastIndexOf('/') !== m[1].length - 1) {
                        //if this is not a self closing tag than push it in the stack
                        stack.push(m[1]);
                    }
                }
            }

            //add the remainder of the string, if needed (there are no more tags in here)
            result += s.substr(lasti, n);

            //fix the unclosed tags
            while (stack.length) {
                result += '</' + stack.pop() + '>';
            }

            return result;

        }
    });
    // Number原型方法扩展
    $.extend(Number.prototype, {
        'Acomma': function (length) {
            if (!length || length < 1) length = 3;
            source = ('' + this).split(".");
            source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,");
            return source.join(".");
        },
        'ArandomInt': function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        'ApadLeft': function (width, ch) {
            return ('' + this).padLeft(width, ch);
        },
        'ApadRight': function (width, ch) {
            return ('' + this).padRight(width, ch);
        }
    });
    // Array原型方法扩展
    $.extend(Array.prototype, {
        'AindexOf': function (item, it) {
            for (var i = 0; i < this.length; i++) {
                if (item == ((it) ? this[i][it] : this[i])) return i;
            }
            return -1;
        },
        'Aremove': function (item, it) {
            this.AremoveAt(this.indexOf(item, it));
        },
        'AremoveAt': function (idx) {
            if (idx >= 0 && idx < this.length) {
                for (var i = idx; i < this.length - 1; i++) {
                    this[i] = this[i + 1];
                }
                this.length--;
            }
        },
        'AremoveEmpty': function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (this[i].trim() != '') {
                    arr.push(this[i].trim());
                }
            }
            return arr;
        },
        'add': function (item) {
            if (this.indexOf(item) > -1) {
                return false;
            } else {
                this.push(item);
                return true;
            }
        },
        'Aswap': function (i, j) {
            if (i < this.length && j < this.length && i != j) {
                var item = this[i];
                this[i] = this[j];
                this[j] = item;
            }
        },
        // 过滤数组，两种过滤情况
        'Afilter': function (it, item) {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (typeof (item) == 'undefined') {
                    arr.push(this[i][it]);
                } else if (this[i][it] == item) {
                    arr.push(this[i]);
                }
            }
            return arr;
        },
        'Asortby': function (it, dt, od) {
            // it: item name  dt: int, char  od: asc, desc
            var compareValues = function (v1, v2, dt, od) {
                if (dt == 'int') {
                    v1 = parseInt(v1);
                    v2 = parseInt(v2);
                } else if (dt == 'float') {
                    v1 = parseFloat(v1);
                    v2 = parseFloat(v2);
                }
                var ret = 0;
                if (v1 < v2) ret = 1;
                if (v1 > v2) ret = -1;
                if (od == 'desc') {
                    ret = 0 - ret;
                }
                return ret;
            };
            var newdata = new Array();
            for (var i = 0; i < this.length; i++) {
                newdata[newdata.length] = this[i];
            }
            for (var i = 0; i < newdata.length; i++) {
                var minIdx = i;
                var minData = (it != '') ? newdata[i][it] : newdata[i];
                for (var j = i + 1; j < newdata.length; j++) {
                    var tmpData = (it != '') ? newdata[j][it] : newdata[j];
                    var cmp = compareValues(minData, tmpData, dt, od);
                    if (cmp < 0) {
                        minIdx = j;
                        minData = tmpData;
                    }
                }
                if (minIdx > i) {
                    var _child = newdata[minIdx];
                    newdata[minIdx] = newdata[i];
                    newdata[i] = _child;
                }
            }
            return newdata;
        }
    });
    // Date原型方法扩展
    $.extend(Date.prototype, {
        'Aparse': function (time) {
            if (typeof (time) == 'string') {
                if (time.indexOf('GMT') > 0 || time.indexOf('gmt') > 0 || !isNaN(Date.parse(time))) {
                    return this.AparseGMT(time);
                } else if (time.indexOf('UTC') > 0 || time.indexOf('utc') > 0 || time.indexOf(',') > 0) {
                    return this.AparseUTC(time);
                } else {
                    return this.AparseCommon(time);
                }
            }
            return new Date();
        },
        'AparseGMT': function (time) {
            this.setTime(Date.parse(time));
            return this;
        },
        'AparseUTC': function (time) {
            return (new Date(time));
        },
        'AparseCommon': function (time) {
            var d = time.split(/ |T/), d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0], d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0, d1[1] - 0, d1[2] - 0);
        },
        'AdateAdd': function (type, val) {
            var _y = this.getFullYear();
            var _m = this.getMonth();
            var _d = this.getDate();
            var _h = this.getHours();
            var _n = this.getMinutes();
            var _s = this.getSeconds();
            switch (type) {
                case 'y':
                    this.setFullYear(_y + val);
                    break;
                case 'm':
                    this.setMonth(_m + val);
                    break;
                case 'd':
                    this.setDate(_d + val);
                    break;
                case 'h':
                    this.setHours(_h + val);
                    break;
                case 'n':
                    this.setMinutes(_n + val);
                    break;
                case 's':
                    this.setSeconds(_s + val);
                    break;
            }
            return this;
        },
        'AdateDiff': function (type, date2) {
            var diff = date2 - this;
            switch (type) {
                case 'w':
                    return diff / 1000 / 3600 / 24 / 7;
                case 'd':
                    return diff / 1000 / 3600 / 24;
                case 'h':
                    return diff / 1000 / 3600;
                case 'n':
                    return diff / 1000 / 60;
                case 's':
                    return diff / 1000;
            }
        },
        'Aformat': function (format) {
            if (isNaN(this)) return '';
            var o = {
                'm+': this.getMonth() + 1,
                'd+': this.getDate(),
                'h+': this.getHours(),
                'n+': this.getMinutes(),
                's+': this.getSeconds(),
                'S': this.getMilliseconds(),
                'W': ["日", "一", "二", "三", "四", "五", "六"][this.getDay()],
                'q+': Math.floor((this.getMonth() + 3) / 3)
            }
            if (format.indexOf('am/pm') >= 0) {
                format = format.replace('am/pm', (o['h+'] >= 12) ? '下午' : '上午');
                if (o['h+'] >= 12) o['h+'] -= 12;
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        },
        'ASplitTheString': function (myStr, strLength, f) {

            var newStr = ""; //新字符串
            //判断间隔不为0，否则原样返回
            if (myStr != null && myStr != "" && strLength != 0) {
                //判断f标记来区别是区分中英文还是忽略中英文
                switch (f) {
                    //按照英文半个长度中文1个长度的来判断如果结尾是半个中文的则这个结尾的半个忽略,计算到到下一份的时候显示整个 
                    case "ENGLISH":
                        var f = 0;
                        for (var i = 0; i < myStr.length; i++) {
                            if (f < strLength) {
                                if ((myStr.charCodeAt(i) >= 0) && (myStr.charCodeAt(i) <= 255)) {
                                    f++;
                                } else {
                                    f += 2;
                                }
                                if (f > strLength) {
                                    newStr += " ";
                                    f = 0;
                                    i--;
                                } else {
                                    newStr += myStr[i];
                                }
                            } else {
                                newStr += " ";
                                f = 0;
                            }
                        }
                        break;
                    //按照英文1个长度中文2个长度的来判断如果结尾是半个中文的则中文这个字符不分割显示整个 
                    case "ENGLISH_":
                        var f = 0;
                        for (var i = 0; i < myStr.length; i++) {
                            if (f < strLength) {
                                newStr += myStr[i];
                                if ((myStr.charCodeAt(i) >= 0) && (myStr.charCodeAt(i) <= 255)) {
                                    f++;
                                } else {
                                    f += 2;
                                }
                            } else {
                                newStr += " ";
                                f = 0;
                            }
                        }
                        break;
                    default:
                        //算分割几部分，如果不能整分就不足一份的算一份
                        var n = Math.floor(myStr.length / strLength);
                        if (myStr.length % strLength != 0) {
                            n++;
                        }
                        //循环得到被分割的新的字符串
                        for (var i = 0; i < n; i++) {
                            var _str = "";
                            if (strLength * i > myStr.length) {
                                //不足的一份
                                _str = myStr.substring((i * strLength));
                            } else {
                                _str = myStr.substring((i * strLength), (i * strLength + strLength));
                            }
                            newStr += _str + " ";
                        }
                        break;
                }
            } else {
                //间隔为0原样返回
                newStr = myStr;
            }
            return newStr.TrimEnd(' ');
        }

    });
})(jQuery);