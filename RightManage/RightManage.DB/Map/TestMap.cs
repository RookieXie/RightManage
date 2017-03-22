using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.DB.Map
{
    public class TestMap: EntityTypeConfiguration<Test>
    {
        public TestMap(string schema = "dbo")
        {
            ToTable(schema + ".Test");
            HasKey(x => x.FID);
            Property(x => x.FID).HasColumnName("FID").IsRequired().HasMaxLength(50);
            Property(x => x.Name).HasColumnName("Name").IsOptional();

            Property(x => x.Content).HasColumnName("Content").IsOptional();
        }
    }
}
