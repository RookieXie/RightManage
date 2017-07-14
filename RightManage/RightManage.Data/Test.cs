using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Data
{
    public class Test: BaseTableData
    {
        //public string FID { get; set; }
        [Control(Name = "名称", Control = "Text", IsHidden = false, isSearch = true, isSearchLike = true)]
        public string Name { get; set; }
        [Control(Name = "内容", Control = "Text", IsHidden = false, isSearch = false, isSearchLike = false)]
        public string Content { get; set; }
        [Control(Name = "年龄", Control = "Text", IsHidden = false, isSearch = true, isSearchLike = false)]
        public int? Age { get; set; }
        [Control(Name = "性别", Control = "Text", IsHidden = false, isSearch = false, isSearchLike = false)]
        public string Sex { get; set; }
        [Control(Name = "fff", Control = "Text", IsHidden = false, isSearch = false, isSearchLike = false)]
        public new  string FID { get; set; }
    }
}
