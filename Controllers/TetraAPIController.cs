using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApplication_TetraApp.Models;

namespace WebApplication_TetraApp.Controllers
{
    public class TetraAPIController : Controller
    {
        public JsonResult Index()
        {
            return Json("The Comunicate With TetraAPI is Success");
        }

        public JsonResult GetUserDataByUserName(string userName)
        {
            User usr = new User();
            using (AppDB appDB = new AppDB())
            {
                try { usr = appDB.Users.Where(u => u.UserName == userName).Single(); }
                catch (Exception) { return Json("NotFound"); }
            }
            return Json(usr);
        }

        [HttpGet]
        [EnableCors]
        public JsonResult GetUserDataByID(int ID)
        {
            User usr = new User();
            using (AppDB appDB = new AppDB())
            {
                try { usr = appDB.Users.Where(u => u.UserID == ID).Single(); }
                catch (Exception) { return Json("NotFound"); }
            }
            return Json(usr);
        }

        public JsonResult MarkMessagesAsReaded(List<Message> Messages)
        {
            using (AppDB appdb = new AppDB())
            {
                foreach (Message mes in Messages)
                {
                    Message _ = appdb.Messages.Where(m => m.MessageID == mes.MessageID).FirstOrDefault();
                    _.Readed = true;
                    appdb.SaveChanges();
                }
            }
            return Json("Done");
        }

        public JsonResult GetUserConversationByID(int ID)
        {
            List<User> users = new List<User>();
            List<Conversation> conversations = new List<Conversation>();
            using (AppDB appdb = new AppDB())
            {
                conversations = appdb.Conversation.Where(c => c.UserOneID == ID || c.UserTwoID == ID).ToList();
                foreach (Conversation item in conversations)
                {
                    int tmp = item.UserOneID == ID ? item.UserTwoID : item.UserOneID;
                    users.Add(appdb.Users.Where(u => u.UserID == tmp).FirstOrDefault());
                }
            }
            if (users.Count != 0)
                foreach (User item in users)
                {
                    item.SenMessages = null;
                    item.ResMessages = null;
                    item.SenConversation = null;
                    item.ResConversation = null;
                    item.Media = null;
                    item.Participants = null;
                }
            return Json(users);
        }

        public JsonResult GetMessagesByID(int ID)
        {
            List<Message> messages = new List<Message>();
            using (AppDB appdb = new AppDB())
            {
                messages = appdb.Messages.Where(m => m.ReciverUserID == ID || m.SenderUserID == ID).ToList();
            }
            for (int i = 0; i < messages.Count; i++)
            {
                messages[i].Message_Media = null;
                messages[i].ReciverUser = null;
                messages[i].ReplayMessage = null;
                messages[i].SenderUser = null;
                messages[i].ReciverGroup = null;
            }
            return Json(messages);
        }

        public JsonResult GetUsersByUserNameOrEMail(string usrnm)
        {
            List<User> usrs = new List<User>();
            using (AppDB appdb = new AppDB())
            {
                usrs = appdb.Users.Where(u => u.UserName.Contains(usrnm) || u.EMail==usrnm).ToList();
            }
            foreach (User item in usrs)
            {
                item.SenMessages = null;
                item.ResMessages = null;
                item.SenConversation = null;
                item.ResConversation = null;
                item.Media = null;
                item.Participants = null;
            }

            return Json(usrs);
        }

        public JsonResult AddUserToConversationsByUserName(string usrnm, string curusrnm)
        {
            User usr = new User(), curusr = new User();
            using (AppDB appdb = new AppDB())
            {
                try
                {
                    usr = appdb.Users.Where(u => u.UserName == usrnm).Single();
                    curusr = appdb.Users.Where(u => u.UserName == curusrnm).Single();
                }
                catch { return Json("Not Found"); }

                appdb.Conversation.Add(new Conversation() { StartDate = DateTime.Now, UserOneID = curusr.UserID, UserTwoID = usr.UserID });
                appdb.SaveChanges();
            }

            usr.SenMessages = null;
            usr.ResMessages = null;
            usr.SenConversation = null;
            usr.ResConversation = null;
            usr.Media = null;
            usr.Participants = null;

            return Json(usr);
        }
    }
}