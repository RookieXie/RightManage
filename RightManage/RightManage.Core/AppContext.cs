using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public class AppContext
    {
        private static readonly AppContext instance;
        private DateTime fBeginTime;

        static AppContext()
        {
            instance = new AppContext();

        }
        private AppContext()
        {
           // this.fAppRegistrationRegNames = null;
            this.fBeginTime = new DateTime();
          //  this.fLogInfo = new LogInfo();
            this.BinPath = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;
          //  this.fAppRegistrationRegNames = new List<string>();
           // this.XmlPath = Path.Combine(this.BinPath, AtawApplicationConfig.REAL_PATH);
            //this.Logger = new Logs();

        }


      //  public AtawApplicationConfig ApplicationXml { get; private set; }
    //    public IServiceBus AtawBus { get; [CompilerGenerated] set; }
      //  public IAtawCache AtawCache { get; [CompilerGenerated] private set; }
     //   public Lazy<IMessagesBuilder> AtawMessagesBuilder { get; [CompilerGenerated] private set; }
      //  public Lazy<IAtawRightBuilder> AtawRightBuilder { get; [CompilerGenerated] private set; }
     //   public Lazy<IAtawServiceBuilder> AtawServiceBuilder { get; [CompilerGenerated] private set; }
        public string BinPath { get; [CompilerGenerated] private set; }
        public static AppContext Current { get; }
       // public CustomScriptSet CustomScriptSet { get; [CompilerGenerated] private set; }
       // public DBConfig DBConfigXml { get; private set; }
        public string DefaultConnString { get; [CompilerGenerated] private set; }
     //   public DocViewerConfig DocViewerXml { get; private set; }
      //  public JSON FastJson { get; [CompilerGenerated] private set; }
        public string FControlUnitID { get; }
        //public FileManagementConfig FileManagementConfigXml { get; private set; }
      //  public Lazy<IGPSBuilder> GPSBuilder { get; [CompilerGenerated] private set; }
      //  public Lazy<IGPSSet> GPSSetBuilder { get; [CompilerGenerated] private set; }
     //   public Lazy<IGroupBuilder> GroupBuilder { get; [CompilerGenerated] private set; }
        public bool IsAuthenticated { get; }
        public bool IsInit { get; [CompilerGenerated] private set; }
        public bool IsWinApp { get; [CompilerGenerated] set; }
      //  public ILogs Logger { get; [CompilerGenerated] private set; }
        public string MapPath { get; [CompilerGenerated] set; }
     //   public MvcConfigInfo MvcConfigXml { get; private set; }
        public string NickName { get; }
     //   public IFlyweight PageFlyweight { get; [CompilerGenerated] private set; }
     //   public AtawConfigInfo ProductsXml { get; private set; }
    //    public SiteFunConfig SiteFunXml { get; private set; }
     //   public IUnitOfData UnitOfData { get; set; }
      //  public UserApplicationConfig UserApplicationXml { get; [CompilerGenerated] private set; }
        public string UserId { get; }
        public string UserName { get; }
        public string WebRootPath { get; [CompilerGenerated] set; }
       // public Xml2DataBase Xml2Db { get; set; }
        public string XmlPath { get; [CompilerGenerated] private set; }


    }
}
