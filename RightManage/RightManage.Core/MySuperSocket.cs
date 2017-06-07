using SuperWebSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace RightManage.Core
{
    public class MySuperSocket
    {

        private const string ip = "192.168.68.40";
        private const int port = 7870;
        private WebSocketServer ws = null;//SuperWebSocket中的WebSocketServer对象

        public MySuperSocket()
        {
            ws = new WebSocketServer();//实例化WebSocketServer

            //添加事件侦听
            ws.NewSessionConnected += ws_NewSessionConnected;//有新会话握手并连接成功
            ws.SessionClosed += ws_SessionClosed;//有会话被关闭 可能是服务端关闭 也可能是客户端关闭
            ws.NewMessageReceived += ws_NewMessageReceived;//有客户端发送新的消息
        }



        void ws_NewSessionConnected(WebSocketSession session)
        {
            Console.WriteLine("{0:HH:MM:ss}  与客户端:{1}创建新会话", DateTime.Now, GetSessionName(session));
            var msg = string.Format("{0:HH:MM:ss} {1} 进入聊天室", DateTime.Now, GetSessionName(session));
            SendToAll(session, msg);
        }

        void ws_SessionClosed(WebSocketSession session, SuperSocket.SocketBase.CloseReason value)
        {
            Console.WriteLine("{0:HH:MM:ss}  与客户端:{1}的会话被关闭 原因：{2}", DateTime.Now, GetSessionName(session), value);
            var msg = string.Format("{0:HH:MM:ss} {1} 离开聊天室", DateTime.Now, GetSessionName(session));
            SendToAll(session, msg);
        }
        void ws_NewMessageReceived(WebSocketSession session, string value)
        {
            var msg = string.Format("{0:HH:MM:ss} {1}说: {2}", DateTime.Now, GetSessionName(session), value);

            SendToAll(session, msg);

        }
        /// <summary>
        /// 启动服务
        /// </summary>
        /// <returns></returns>
        public void Start()
        {
            if (!ws.Setup(ip, port))
            {
                Console.WriteLine("ChatWebSocket 设置WebSocket服务侦听地址失败");
                return;
            }

            if (!ws.Start())
            {
                Console.WriteLine("ChatWebSocket 启动WebSocket服务侦听失败");
                return;
            }

            Console.WriteLine("ChatWebSocket 启动服务成功");



        }

        /// <summary>
        /// 停止侦听服务
        /// </summary>
        public void Stop()
        {

            if (ws != null)
            {
                ws.Stop();
            }
        }

        private string GetSessionName(WebSocketSession session)
        {
            //这里用Path来取Name 不太科学…… 
            return HttpUtility.UrlDecode(session.Path.TrimStart('/'));
        }

        private void SendToAll(WebSocketSession session, string msg)
        {
            //广播
            foreach (var sendSession in session.AppServer.GetAllSessions())
            {
                sendSession.Send(msg);
            }
        }

    }
}
