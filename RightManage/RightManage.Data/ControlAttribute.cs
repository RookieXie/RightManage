using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Data
{
    [AttributeUsage(AttributeTargets.Property)]
    public class ControlAttribute : Attribute
    {
        public string Name { get; set; }
        public string Control { get; set; }

        public bool IsHidden { get; set; }
        public int orderNum { get; set; }
        public bool isSearch { get; set; }
        public bool isSearchLike { get; set; }
    }
    //控件类型 Control ：text、password、datetime、datetime-local、date、month、time、week、number、email、url、search、tel 和 color。
}
