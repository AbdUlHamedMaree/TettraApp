using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using WebApplication_TetraApp.Models;

namespace WebApplication_TetraApp.Hubs
{
    class conUser
    {
        public int UserID { get; set; }
        public string ConID { get; set; }
    }
    public class ChatHub : Hub
    {
        static List<conUser> users = new List<conUser>();
        public async Task LogIn(int usrid)
        {
            await Task.Run(()=> users.Add(new conUser() { UserID = usrid, ConID = Context.UserIdentifier }));
        }
        public async Task SendMessage(Message mes)
        {
            using (AppDB appdb = new AppDB())
            {
                try
                {
                    appdb.Messages.Add(mes);
                    await appdb.SaveChangesAsync();
                    await Clients.Caller.SendAsync("ReceiveMessage", mes);
                    conUser tmp = users.Where(u => u.UserID == mes.ReciverUserID).FirstOrDefault();
                    if (tmp != null)
                    {
                        await Clients.User(tmp.ConID).SendAsync("ReceiveMessage", mes);
                    }
                }
                catch { }
            }
        }

        public async Task<int> CreateGroup(Group grp)
        {
            using (AppDB appdb = new AppDB())
            {
                appdb.Groups.Add(grp);
                return await Task.Run(() => { appdb.SaveChanges(); return grp.GroupID; });
            }
        }

        public async Task AddMemberToGroup(int grp, string usr, Permission permission)
        {
            using (AppDB appdb = new AppDB())
            {
                appdb.Permissions.Add(permission);
                User tmp = appdb.Users.Where(u => u.UserName == usr).Single();
                appdb.Participants.Add(new Participant() { UserID = tmp.UserID, GroupID = grp, PermissionID = permission.PermissionID });
                await appdb.SaveChangesAsync();
            }
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            users.Remove(users.Where(c => c.ConID == Context.UserIdentifier).Single());
            return base.OnDisconnectedAsync(exception);
        }
    }
}
