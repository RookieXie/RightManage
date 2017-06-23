using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Data
{
    public class BaseTableData
    {
        public BaseTableData()
        {

        }
        [Control(Name = "创建ID", Control = "Text", IsHidden = true)]
        public string CREATE_ID { get; set; }
        [Control(Name = "创建时间", Control = "Text", IsHidden = true)]
        public DateTime? CREATE_TIME { get; set; }
        [Control(Name = "组织", Control = "Text", IsHidden = true)]
        public string FControlUnitID { get; set; }
        [Control(Name = "主键", Control = "Text", IsHidden = true)]
        public string FID { get; set; }
        [Control(Name = "是否删除", Control = "Text", IsHidden = true)]
        public bool? ISDELETE { get; set; }
        [Control(Name = "时间戳", Control = "Text", IsHidden = true)]
        public string TIMESSTAMP { get; set; }
        [Control(Name = "备用时间字段", Control = "Text", IsHidden = true)]
        public DateTime? UDDATETIME { get; set; }
        [Control(Name = "备用int字段", Control = "Text", IsHidden = true)]
        public int? UDINT1 { get; set; }
        [Control(Name = "备用string字段1", Control = "Text", IsHidden = true)]
        public string UDVARCHAR1 { get; set; }
        [Control(Name = "备用string字段2", Control = "Text", IsHidden = true)]
        public string UDVARCHAR2 { get; set; }
        [Control(Name = "修改ID", Control = "Text", IsHidden = false)]
        public string UPDATE_ID { get; set; }
        [Control(Name = "修改时间", Control = "Text", IsHidden = false)]
        public DateTime? UPDATE_TIME { get; set; }
    }
}
