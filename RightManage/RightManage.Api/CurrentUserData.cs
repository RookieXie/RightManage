using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Api
{
    public class CurrentUserData
    {
        public string FID { get; set; }
        public string NickName { get; set; }

        public string LoginName { get; set; }

        public String FControlUnitID { get; set; } //组织机构
        public string FControlUnitName { get; set; }
    }
}
