using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Api
{
    public class PageData
    {
        public string tableName { get; set; }
        public string pageTitle { get; set; }
        public List<TableColunm> tableColunms { get; set; }
        public PagerListData<TableRowData> tableData { get; set; }
    }
}
