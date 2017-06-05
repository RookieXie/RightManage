using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Api
{
    public class PagerListData<T>
    {
        public Pagination Pager { get; set; }
        public IEnumerable<T> ListData { get; set; }
    }
    public class Pagination
    {
        public string TableName { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public string SortName { get; set; }
        public bool IsASC { get; set; }
        public DateTime DataTime { get; set; }
    }
}
