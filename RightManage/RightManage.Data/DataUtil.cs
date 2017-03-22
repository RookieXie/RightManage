using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Data
{
   public  class DataUtil
    {
        public Type GetClassByName(string className)
        {
            var obj = Type.GetType("RightManage.Data.RM_Users");
            return obj;
        }
    }
}
