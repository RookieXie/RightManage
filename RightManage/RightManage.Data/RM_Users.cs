using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Data
{
    public class RM_Users:BaseTableData
    {
        [Control(Name = "昵称", Control = "Text", IsHidden = false,isSearch =true,isSearchLike =true)]
        public string NickName { get; set; }
        [Control(Name = "用户名", Control = "Text", IsHidden = false)]
        public string UserName { get; set; }
        [Control(Name = "密码", Control = "Password", IsHidden = true)]
        public string Password { get; set; }
        [Control(Name = "备注", Control = "Text", IsHidden = false)]
        public string Remark { get; set; }
    }
}
