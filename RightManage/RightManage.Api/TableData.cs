using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Api
{
    public class TableData
    {
        public List<TableRowData> tableRowsData { get; set; }
    }
    public class TableRowData
    {
        public Dictionary<string, object> tableRowData { get; set; }
    }
}
