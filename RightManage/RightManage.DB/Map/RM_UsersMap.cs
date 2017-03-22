using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.DB.Map
{
    public class RM_UsersMap : EntityTypeConfiguration<RM_Users>
    {
        public RM_UsersMap(string schema = "dbo")
        {
            ToTable(schema + ".RM_Users");
            HasKey(x => x.FID);
            Property(x => x.FID).HasColumnName("FID").IsRequired().HasMaxLength(50);
            Property(x => x.NickName).HasColumnName("NickName").IsOptional();
            Property(x => x.UserName).HasColumnName("UserName").IsOptional();
            Property(x => x.Password).HasColumnName("Password").IsOptional();
            Property(x => x.Remark).HasColumnName("Remark").IsOptional();
            Property(x => x.CREATE_ID).HasColumnName("CREATE_ID").IsOptional();
            Property(x => x.CREATE_TIME).HasColumnName("CREATE_TIME").IsOptional();
            Property(x => x.UPDATE_ID).HasColumnName("UPDATE_ID").IsOptional();
            Property(x => x.UPDATE_TIME).HasColumnName("UPDATE_TIME").IsOptional();
            Property(x => x.FControlUnitID).HasColumnName("FControlUnitID").IsOptional();
            Property(x => x.TIMESSTAMP).HasColumnName("TIMESSTAMP").IsOptional();
            Property(x => x.ISDELETE).HasColumnName("ISDELETE").IsOptional();
        }
    }
}

