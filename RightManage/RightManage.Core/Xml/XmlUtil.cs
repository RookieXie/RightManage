using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace RightManage.Core
{
    public static class XmlUtil
    {
        /// <summary>
        /// xml转实体
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="filePath">xml所在路径</param>
        /// <returns></returns>
        public static T ReadFromFile<T>(string filePath) where T : class, new()
        {
            XmlReader xmlReader = GetXmlReader(filePath);
            using (xmlReader)
            {
                object obj2 = new XmlSerializer(typeof(T)).Deserialize(xmlReader);
                
                return (obj2 as T);
            }
        }
        public static XmlReader GetXmlReader(string path)
        {
            return XmlReader.Create(new Uri(path).ToString());
        }
        
        
    }

}
