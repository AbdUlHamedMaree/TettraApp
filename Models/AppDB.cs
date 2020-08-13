using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication_TetraApp.Models
{
    public class AppDB : DbContext
    {
        public AppDB() : base() { }
        public AppDB(DbContextOptions<AppDB> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(LocalDB)\MSSQLLocalDB;Database=TetraMessangerDataBase;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().Property(u => u.UserID).ValueGeneratedOnAdd();

            modelBuilder.Entity<Message_Media>().HasKey(mm => new { mm.MediaID, mm.MessageID });

            modelBuilder.Entity<Participant>().HasKey(p => new { p.UserID, p.GroupID });

            modelBuilder.Entity<Media>().HasOne<User>(m => m.User).WithOne(m => m.Media).HasForeignKey<User>(m => m.MediaID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Media>().HasOne<Group>(m => m.Group).WithOne(m => m.Media).HasForeignKey<Group>(m => m.MediaID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Media>().Property(m => m.MediaID).ValueGeneratedOnAdd();

            modelBuilder.Entity<Conversation>().HasOne<User>(c => c.UserOne).WithMany(c => c.SenConversation).HasForeignKey(m => m.UserOneID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Conversation>().HasOne<User>(c => c.UserTwo).WithMany(c => c.ResConversation).HasForeignKey(m => m.UserTwoID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>().HasOne<User>(m => m.SenderUser).WithMany(u => u.SenMessages).HasForeignKey(m => m.SenderUserID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>().HasOne<User>(m => m.ReciverUser).WithMany(u => u.ResMessages).HasForeignKey(m => m.ReciverUserID).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>().Property(m => m.MessageID).ValueGeneratedOnAdd();

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserStatus> UsersStatus { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<MediaType> MediaType { get; set; }
        public DbSet<Message_Media> Message_Media { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Conversation> Conversation { get; set; }
    }






    public class User
    {
        public User()
        {
            Participants = new List<Participant>();
            SenMessages = new List<Message>();
            ResMessages = new List<Message>();
        }

        [Required]
        public int UserID { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string EMail { get; set; }

        [Required]
        public bool Male { get; set; }

        [Required]
        public string Bio { get; set; }

        [Required]
        public bool Activate { get; set; }

        public int? MediaID { get; set; }

        public DateTime LastSeen { get; set; }

        public bool OnLine { get; set; }

        public virtual Media Media { get; set; }

        public virtual UserStatus UserStatus { get; set; }

        public virtual List<Participant> Participants { get; set; }

        [InverseProperty("SenderUser")]
        public virtual List<Message> SenMessages { get; set; }

        [InverseProperty("ReciverUser")]
        public virtual List<Message> ResMessages { get; set; }

        [InverseProperty("UserOne")]
        public virtual List<Conversation> SenConversation { get; set; }

        [InverseProperty("UserTwo")]
        public virtual List<Conversation> ResConversation { get; set; }
    }

    public class UserStatus
    {
        [Key]
        public int UserID { get; set; }
        public virtual User User { get; set; }

        [Required]
        public string UserStatusType { get; set; }

        [Required]
        public string Description { get; set; }
    }

    public class Setting
    {
        [Key]
        public int UserID { get; set; }
        public virtual User User { get; set; }
        public int LanguageID { get; set; }
        public virtual Language Language { get; set; }
    }

    public class Language
    {
        public int LanguageID { get; set; }
        public string LanguageName { get; set; }
    }

    public class Group
    {
        public Group()
        {
            Participants = new List<Participant>();
        }
        public int GroupID { get; set; }

        [Required]
        public string GroupName { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime CreateTime { get; set; }

        public int? MediaID { get; set; }
        public virtual Media Media { get; set; }

        public virtual List<Participant> Participants { get; set; }
    }

    public class Participant
    {
        public int GroupID { get; set; }
        public virtual Group Group { get; set; }
        public int UserID { get; set; }
        public virtual User User { get; set; }
        public int PermissionID { get; set; }
        public virtual Permission Permission { get; set; }
    }

    public class Permission
    {
        public int PermissionID { get; set; }
        public bool Writing { get; set; }
        public bool AddingUsers { get; set; }
        public bool ChangeGroupName { get; set; }
        public bool ChangeGroupPicture { get; set; }

        public virtual Participant Participant { get; set; }

        //...
    }

    public class Media
    {
        public Media()
        {
            Message_Media = new List<Message_Media>();
        }
        public int MediaID { get; set; }

        [Required]
        public string MediaName { get; set; }

        [Required]
        public string MediaPath { get; set; }
        public int MediaTypeID { get; set; }
        public virtual MediaType MediaType { get; set; }
        public virtual Group Group { get; set; }
        public virtual User User { get; set; }
        public virtual List<Message_Media> Message_Media { get; set; }
    }

    public class MediaType
    {
        public MediaType()
        {
            Medias = new List<Media>();
        }
        public int MediaTypeID { get; set; }

        [Required]
        public string MediaTypeName { get; set; }

        [Required]
        public string MediaSuffix { get; set; }
        public virtual List<Media> Medias { get; set; }
    }

    public class Message_Media
    {
        public int MessageID { get; set; }
        public virtual Message Message { get; set; }
        public int MediaID { get; set; }
        public virtual Media Media { get; set; }
    }

    public class Message
    {
        public Message()
        {
            Message_Media = new List<Message_Media>();
            Readed = false;
        }
        public int MessageID { get; set; }

        [Required]
        public string Content { get; set; }
        public DateTime MessageSendDate { get; set; }

        public bool Readed { get; set; }

        [ForeignKey("ReplayMessage")]
        public int? ReplayMessageID { get; set; }
        public virtual Message ReplayMessage { get; set; }

        [ForeignKey("SenderUser")]
        public int SenderUserID { get; set; }
        public virtual User SenderUser { get; set; }

        [ForeignKey("ReciverUser")]
        public int ReciverUserID { get; set; }
        public virtual User ReciverUser { get; set; }

        [ForeignKey("ReciverGroup")]
        public int? ReciverGroupID { get; set; }
        public virtual Group ReciverGroup { get; set; }

        public virtual List<Message_Media> Message_Media { get; set; }
    }

    public class Conversation
    {
        public int ConversationID { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [ForeignKey("UserOne")]
        public int UserOneID { get; set; }
        public virtual User UserOne { get; set; }

        [ForeignKey("UserTwo")]
        public int UserTwoID { get; set; }
        public virtual User UserTwo { get; set; }
    }
}
