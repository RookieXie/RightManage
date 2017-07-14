using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.DB.Map
{
    public class RM_MenusMap: EntityTypeConfiguration<RM_Menus>
    {
        public RM_MenusMap(string schema = "dbo")
        {
            ToTable(schema + ".RM_Menus");
            HasKey(x => x.FID);
            Property(x => x.FID).HasColumnName("FID").IsRequired().HasMaxLength(50);
            Property(x => x.MenuName).HasColumnName("MenuName").IsOptional();
            Property(x => x.MenuValue).HasColumnName("MenuValue").IsOptional();
            Property(x => x.PID).HasColumnName("PID").IsOptional();
            Property(x => x.Is_Parent).HasColumnName("Is_Parent").IsOptional();
            Property(x => x.MenuIcon).HasColumnName("MenuIcon").IsOptional();
            Property(x => x.MenuDesc).HasColumnName("MenuDesc").IsOptional();
            Property(x => x.OrderId).HasColumnName("OrderId").IsOptional();
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
