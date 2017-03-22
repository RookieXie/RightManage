using RightManage.Core;
using RightManage.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.BF
{
    public class RightManageBaseBF : IDisposable
    {
        private IUnitOfData fUnitOfData;


        public RightManageBaseBF SetUnitOfData(string conn)
        {
            fUnitOfData = new RightManageDBContent(conn);
            return this;
        }

        public RightManageBaseBF SetUnitOfData(IUnitOfData unitOfData)
        {
            if (unitOfData != null)
            {
                fUnitOfData = unitOfData;
                //fUnitOfData.RegisterSqlCommand()
            }
            return this;
        }

        public IUnitOfData UnitOfData
        {
            get
            {
                if (fUnitOfData == null)
                {
                    fUnitOfData = new RightManageDBContent() ;
                    // fUnitOfData.db
                }
                return fUnitOfData;
            }
        }

        public int Submit()
        {
            return UnitOfData.Submit();
        }

        public void Dispose()
        {
            if (fUnitOfData != null)
            {
                fUnitOfData.Dispose();
            }
            // throw new NotImplementedException();
        }

        public static RightManageDBContent FetchDbContext()
        {
            return new RightManageDBContent();
        }
    }
}
