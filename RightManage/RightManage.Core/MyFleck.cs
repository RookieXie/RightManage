using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public static class MyFleck
    {
        public static void RunServer()
        {
            var server = new WebSocketServer("ws://192.168.68.40:7870");
            server.Start(socket =>
            {
                socket.OnMessage = message => socket.Send(message);

            });
        }

    }
}
