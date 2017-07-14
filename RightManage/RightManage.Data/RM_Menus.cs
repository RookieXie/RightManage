using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Data
{
    public class RM_Menus: BaseTableData
    {
        [Control(Name = "菜单名称", Control = "Text", IsHidden = false, isSearch = true, isSearchLike = true)]
        public string MenuName { get; set; }
        [Control(Name = "菜单路径", Control = "Text", IsHidden = false)]
        public string MenuValue { get; set; }
        [Control(Name = "菜单描述", Control = "Text", IsHidden = false)]
        public string MenuDesc { get; set; }
        [Control(Name = "图标", Control = "Text", IsHidden = false)]
        public string MenuIcon { get; set; }
        [Control(Name = "排序", Control = "Text", IsHidden = false)]
        public int? OrderId { get; set; }
        [Control(Name = "父节点", Control = "Text", IsHidden = false)]
        public string PID { get; set; }
        [Control(Name = "是否父节点", Control = "Text", IsHidden = false)]
        public bool? Is_Parent { get; set; }

    }
}
