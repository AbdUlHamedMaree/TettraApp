using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication_TetraApp.Migrations
{
    public partial class CreateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    LanguageID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LanguageName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.LanguageID);
                });

            migrationBuilder.CreateTable(
                name: "MediaType",
                columns: table => new
                {
                    MediaTypeID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MediaTypeName = table.Column<string>(nullable: false),
                    MediaSuffix = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaType", x => x.MediaTypeID);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    PermissionID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Writing = table.Column<bool>(nullable: false),
                    AddingUsers = table.Column<bool>(nullable: false),
                    ChangeGroupName = table.Column<bool>(nullable: false),
                    ChangeGroupPicture = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.PermissionID);
                });

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    MediaID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MediaName = table.Column<string>(nullable: false),
                    MediaPath = table.Column<string>(nullable: false),
                    MediaTypeID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.MediaID);
                    table.ForeignKey(
                        name: "FK_Media_MediaType_MediaTypeID",
                        column: x => x.MediaTypeID,
                        principalTable: "MediaType",
                        principalColumn: "MediaTypeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    GroupID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    MediaID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.GroupID);
                    table.ForeignKey(
                        name: "FK_Groups_Media_MediaID",
                        column: x => x.MediaID,
                        principalTable: "Media",
                        principalColumn: "MediaID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    EMail = table.Column<string>(nullable: false),
                    Male = table.Column<bool>(nullable: false),
                    Bio = table.Column<string>(nullable: false),
                    Activate = table.Column<bool>(nullable: false),
                    MediaID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Media_MediaID",
                        column: x => x.MediaID,
                        principalTable: "Media",
                        principalColumn: "MediaID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Conversation",
                columns: table => new
                {
                    ConversationID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(nullable: false),
                    UserOneID = table.Column<int>(nullable: false),
                    UserTwoID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversation", x => x.ConversationID);
                    table.ForeignKey(
                        name: "FK_Conversation_Users_UserOneID",
                        column: x => x.UserOneID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Conversation_Users_UserTwoID",
                        column: x => x.UserTwoID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    MessageID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: false),
                    MessageSendDate = table.Column<DateTime>(nullable: false),
                    Readed = table.Column<bool>(nullable: false),
                    ReplayMessageID = table.Column<int>(nullable: true),
                    SenderUserID = table.Column<int>(nullable: false),
                    ReciverUserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.MessageID);
                    table.ForeignKey(
                        name: "FK_Messages_Users_ReciverUserID",
                        column: x => x.ReciverUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Messages_ReplayMessageID",
                        column: x => x.ReplayMessageID,
                        principalTable: "Messages",
                        principalColumn: "MessageID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Users_SenderUserID",
                        column: x => x.SenderUserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    GroupID = table.Column<int>(nullable: false),
                    UserID = table.Column<int>(nullable: false),
                    PermissionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => new { x.UserID, x.GroupID });
                    table.ForeignKey(
                        name: "FK_Participants_Groups_GroupID",
                        column: x => x.GroupID,
                        principalTable: "Groups",
                        principalColumn: "GroupID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Participants_Permissions_PermissionID",
                        column: x => x.PermissionID,
                        principalTable: "Permissions",
                        principalColumn: "PermissionID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Participants_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID1 = table.Column<int>(nullable: true),
                    LanguageID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Settings_Languages_LanguageID",
                        column: x => x.LanguageID,
                        principalTable: "Languages",
                        principalColumn: "LanguageID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Settings_Users_UserID1",
                        column: x => x.UserID1,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UsersStatus",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    UserStatusType = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersStatus", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_UsersStatus_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Message_Media",
                columns: table => new
                {
                    MessageID = table.Column<int>(nullable: false),
                    MediaID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message_Media", x => new { x.MediaID, x.MessageID });
                    table.ForeignKey(
                        name: "FK_Message_Media_Media_MediaID",
                        column: x => x.MediaID,
                        principalTable: "Media",
                        principalColumn: "MediaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Message_Media_Messages_MessageID",
                        column: x => x.MessageID,
                        principalTable: "Messages",
                        principalColumn: "MessageID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_UserOneID",
                table: "Conversation",
                column: "UserOneID");

            migrationBuilder.CreateIndex(
                name: "IX_Conversation_UserTwoID",
                table: "Conversation",
                column: "UserTwoID");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_MediaID",
                table: "Groups",
                column: "MediaID",
                unique: true,
                filter: "[MediaID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Media_MediaTypeID",
                table: "Media",
                column: "MediaTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_Message_Media_MessageID",
                table: "Message_Media",
                column: "MessageID");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReciverUserID",
                table: "Messages",
                column: "ReciverUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReplayMessageID",
                table: "Messages",
                column: "ReplayMessageID");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderUserID",
                table: "Messages",
                column: "SenderUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Participants_GroupID",
                table: "Participants",
                column: "GroupID");

            migrationBuilder.CreateIndex(
                name: "IX_Participants_PermissionID",
                table: "Participants",
                column: "PermissionID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Settings_LanguageID",
                table: "Settings",
                column: "LanguageID");

            migrationBuilder.CreateIndex(
                name: "IX_Settings_UserID1",
                table: "Settings",
                column: "UserID1");

            migrationBuilder.CreateIndex(
                name: "IX_Users_MediaID",
                table: "Users",
                column: "MediaID",
                unique: true,
                filter: "[MediaID] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Conversation");

            migrationBuilder.DropTable(
                name: "Message_Media");

            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "UsersStatus");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Media");

            migrationBuilder.DropTable(
                name: "MediaType");
        }
    }
}
