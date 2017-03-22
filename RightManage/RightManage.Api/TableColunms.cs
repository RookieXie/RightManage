using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Api
{
    public class TableColunms
    {
        public List<TableColunm> tableColunms { get; set; }
    }
    public class TableColunm
    {
        public string name { get; set; }
        public string displayName { get; set; }
        public string controlType { get; set; }
        public bool isHidden { get; set; }
        public int orderNumbre { get; set; }
        public bool isSearch { get; set; }

        public bool isSearchLike { get; set; }
        public string pType { get; set; }
    }
}
