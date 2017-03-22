using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public class JsResponseResult<T>
    {
        public readonly string AKJSRES;

        public JsResponseResult()
        {
            this.AKJSRES = "AKJS";
        }

        public JsActionType ActionType { get; set; }
        public string BeginTime { get; set; }
        public string Content { get; set; }
        public string EndTimer { get; set; }
        public T Obj { get; set; }

       


        // public override string ToString();
    }
    public enum JsActionType
    {
        Alert = 1,
        JsAjaxFun = 8,
        JsonObject = 7,
        Lock = 50,
        NoGotoUrl = 6,
        Noty = 5,
        Object = 4,
        Reload = 2,
        Url = 3
    }


}
