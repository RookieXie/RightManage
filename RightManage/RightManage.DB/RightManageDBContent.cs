using RightManage.Core;
using RightManage.Data;
using RightManage.DB.Map;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.DB
{
    public class RightManageDBContent: BaseDBContext
    {
        static RightManageDBContent()
        {
            Database.SetInitializer<RightManageDBContent>(null);
        }

        public IDbSet<Test> Test { get; set; }

        public IDbSet<RM_Users> RM_Users { get; set; }
        public RightManageDBContent() : base("DBConnecionString")
        {

        }
        public RightManageDBContent(string connectionString) : base(connectionString)
        {

        }
        protected  override  void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new TestMap());
            modelBuilder.Configurations.Add(new RM_UsersMap());
            //modelBuilder.Configurations.Add(new HR_BasicInfoMap());
        }
        public static DbModelBuilder CreateModel(DbModelBuilder modelBuilder, string schema)
        {
            modelBuilder.Configurations.Add(new TestMap(schema));
            modelBuilder.Configurations.Add(new RM_UsersMap(schema));
            return modelBuilder;
        }
        
    }
}
