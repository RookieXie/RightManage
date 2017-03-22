using RightManage.Core;
using RightManage.Data;
using RightManage.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.DA
{
    public class DARM_Users : RightManageRepository<RM_Users>
    {
        public DARM_Users(IUnitOfData dbContext) : base(dbContext)
        {

        }
    }
}
