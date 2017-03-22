using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Api
{    
    public class ResponseData<T>
    {
        public readonly string AKJSRES = "Api";

        /// <summary>
        /// ok :  成功   Data返回成功信息
        /// error:异常   Content返回异常信息
        /// </summary>
        public string ActionType { get; set; }
        public string Content { get; set; }
        public T Data { get; set; }
        public DateTime Time { get; set; }
    }

    public class ResponseData : ResponseData<string>
    {
    }
}
