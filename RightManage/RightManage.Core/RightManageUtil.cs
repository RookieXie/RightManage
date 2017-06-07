using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace RightManage.Core
{
    public class RightManageUtil
    {
        /// <summary>
        /// 3DES 加密
        /// </summary>
        /// <param name="encryptValue">加密字符</param>
        /// <param key="">秘钥</param>
        /// <returns></returns>
        public static string EncryptString3Des(string encryptValue,string key)
        {
            string str = "加密出错!";
            SymmetricAlgorithm algorithm = SymmetricAlgorithm.Create("TripleDES");
            algorithm.Mode = CipherMode.ECB;
            algorithm.Key = Encoding.UTF8.GetBytes(splitStringLen(key, 24, '0'));
            algorithm.Padding = PaddingMode.PKCS7;
            ICryptoTransform transform = algorithm.CreateEncryptor();
            byte[] bytes = Encoding.UTF8.GetBytes(encryptValue);
            MemoryStream stream = new MemoryStream();
            CryptoStream stream2 = new CryptoStream(stream, transform, CryptoStreamMode.Write);
            try
            {
                stream2.Write(bytes, 0, bytes.Length);
                stream2.FlushFinalBlock();
                str = Convert.ToBase64String(stream.ToArray());
            }
            catch (Exception exception)
            {
                str = exception.ToString();
            }
            finally
            {
                stream2.Close();
                stream2.Dispose();
                stream.Close();
                stream.Dispose();
                algorithm.Clear();
                transform.Dispose();
            }
            return Convert.ToBase64String(stream.ToArray());

        }
        /// <summary>
        /// 返回指定长度的字符串
        /// </summary>
        /// <param name="s">需要改变的字符</param>
        /// <param name="len">指定长度</param>
        /// <param name="b">填充字符</param>
        /// <returns></returns>
        public static string splitStringLen(string s, int len, char b)
        {
            if (string.IsNullOrEmpty(s))
            {
                return "";
            }
            if (s.Length >= len)
            {
                return s.Substring(0, len);
            }
            return s.PadRight(len, b);
        }
        /// <summary>
        /// 获取md5散列值
        /// </summary>
        /// <param name="val"></param>
        /// <returns></returns>
        public static string GetStringMD5(string val)
        {
            byte[] btval = Encoding.Default.GetBytes(val);
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] vals = md5.ComputeHash(btval);
            string res = BitConverter.ToString(vals);
            return res;
        }

        /// <summary>
        /// 反序列化Json
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="jsonStr"></param>
        /// <returns></returns>
        public static List<T> JsonToList<T>(string jsonStr)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<T> objs = serializer.Deserialize<List<T>>(jsonStr);
            return objs;
        }

        /// <summary>
        /// 获得Json
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string GetJson(object obj)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string jsonData = jss.Serialize(obj);
            return jsonData;
        }

        /// <summary>
        /// 获取唯一的guid值
        /// </summary>
        /// <returns></returns>
        public static string UniqueID()
        {
            string guid = Guid.NewGuid().ToString();
            string[] resguid = guid.Split('-');
            string res = "";
            for (int i = 0; i < resguid.Length; i++)
            {
                res += resguid[i];
            }
            DateTime datetime = DateTime.Now;
            res = datetime.ToString("yyyyMMddhhmmss") + res;
            return res.ToUpper();
        }


    }
}
