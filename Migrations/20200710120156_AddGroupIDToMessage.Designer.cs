﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication_TetraApp.Models;

namespace WebApplication_TetraApp.Migrations
{
    [DbContext(typeof(AppDB))]
    [Migration("20200710120156_AddGroupIDToMessage")]
    partial class AddGroupIDToMessage
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication_TetraApp.Models.Conversation", b =>
                {
                    b.Property<int>("ConversationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserOneID")
                        .HasColumnType("int");

                    b.Property<int>("UserTwoID")
                        .HasColumnType("int");

                    b.HasKey("ConversationID");

                    b.HasIndex("UserOneID");

                    b.HasIndex("UserTwoID");

                    b.ToTable("Conversation");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Group", b =>
                {
                    b.Property<int>("GroupID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("MediaID")
                        .HasColumnType("int");

                    b.HasKey("GroupID");

                    b.HasIndex("MediaID")
                        .IsUnique()
                        .HasFilter("[MediaID] IS NOT NULL");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Language", b =>
                {
                    b.Property<int>("LanguageID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LanguageName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LanguageID");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Media", b =>
                {
                    b.Property<int>("MediaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MediaName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MediaPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MediaTypeID")
                        .HasColumnType("int");

                    b.HasKey("MediaID");

                    b.HasIndex("MediaTypeID");

                    b.ToTable("Media");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.MediaType", b =>
                {
                    b.Property<int>("MediaTypeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MediaSuffix")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MediaTypeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MediaTypeID");

                    b.ToTable("MediaType");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Message", b =>
                {
                    b.Property<int>("MessageID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("MessageSendDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Readed")
                        .HasColumnType("bit");

                    b.Property<int?>("ReciverGroupID")
                        .HasColumnType("int");

                    b.Property<int>("ReciverUserID")
                        .HasColumnType("int");

                    b.Property<int?>("ReplayMessageID")
                        .HasColumnType("int");

                    b.Property<int>("SenderUserID")
                        .HasColumnType("int");

                    b.HasKey("MessageID");

                    b.HasIndex("ReciverGroupID");

                    b.HasIndex("ReciverUserID");

                    b.HasIndex("ReplayMessageID");

                    b.HasIndex("SenderUserID");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Message_Media", b =>
                {
                    b.Property<int>("MediaID")
                        .HasColumnType("int");

                    b.Property<int>("MessageID")
                        .HasColumnType("int");

                    b.HasKey("MediaID", "MessageID");

                    b.HasIndex("MessageID");

                    b.ToTable("Message_Media");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Participant", b =>
                {
                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.Property<int>("GroupID")
                        .HasColumnType("int");

                    b.Property<int>("PermissionID")
                        .HasColumnType("int");

                    b.HasKey("UserID", "GroupID");

                    b.HasIndex("GroupID");

                    b.HasIndex("PermissionID")
                        .IsUnique();

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Permission", b =>
                {
                    b.Property<int>("PermissionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("AddingUsers")
                        .HasColumnType("bit");

                    b.Property<bool>("ChangeGroupName")
                        .HasColumnType("bit");

                    b.Property<bool>("ChangeGroupPicture")
                        .HasColumnType("bit");

                    b.Property<bool>("Writing")
                        .HasColumnType("bit");

                    b.HasKey("PermissionID");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Setting", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LanguageID")
                        .HasColumnType("int");

                    b.Property<int?>("UserID1")
                        .HasColumnType("int");

                    b.HasKey("UserID");

                    b.HasIndex("LanguageID");

                    b.HasIndex("UserID1");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Activate")
                        .HasColumnType("bit");

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EMail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Male")
                        .HasColumnType("bit");

                    b.Property<int?>("MediaID")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.HasIndex("MediaID")
                        .IsUnique()
                        .HasFilter("[MediaID] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.UserStatus", b =>
                {
                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserStatusType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.ToTable("UsersStatus");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Conversation", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.User", "UserOne")
                        .WithMany("SenConversation")
                        .HasForeignKey("UserOneID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApplication_TetraApp.Models.User", "UserTwo")
                        .WithMany("ResConversation")
                        .HasForeignKey("UserTwoID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Group", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.Media", "Media")
                        .WithOne("Group")
                        .HasForeignKey("WebApplication_TetraApp.Models.Group", "MediaID")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Media", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.MediaType", "MediaType")
                        .WithMany("Medias")
                        .HasForeignKey("MediaTypeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Message", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.Group", "ReciverGroup")
                        .WithMany()
                        .HasForeignKey("ReciverGroupID");

                    b.HasOne("WebApplication_TetraApp.Models.User", "ReciverUser")
                        .WithMany("ResMessages")
                        .HasForeignKey("ReciverUserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("WebApplication_TetraApp.Models.Message", "ReplayMessage")
                        .WithMany()
                        .HasForeignKey("ReplayMessageID");

                    b.HasOne("WebApplication_TetraApp.Models.User", "SenderUser")
                        .WithMany("SenMessages")
                        .HasForeignKey("SenderUserID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Message_Media", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.Media", "Media")
                        .WithMany("Message_Media")
                        .HasForeignKey("MediaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication_TetraApp.Models.Message", "Message")
                        .WithMany("Message_Media")
                        .HasForeignKey("MessageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Participant", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.Group", "Group")
                        .WithMany("Participants")
                        .HasForeignKey("GroupID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication_TetraApp.Models.Permission", "Permission")
                        .WithOne("Participant")
                        .HasForeignKey("WebApplication_TetraApp.Models.Participant", "PermissionID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication_TetraApp.Models.User", "User")
                        .WithMany("Participants")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.Setting", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.Language", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication_TetraApp.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID1");
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.User", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.Media", "Media")
                        .WithOne("User")
                        .HasForeignKey("WebApplication_TetraApp.Models.User", "MediaID")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("WebApplication_TetraApp.Models.UserStatus", b =>
                {
                    b.HasOne("WebApplication_TetraApp.Models.User", "User")
                        .WithOne("UserStatus")
                        .HasForeignKey("WebApplication_TetraApp.Models.UserStatus", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
