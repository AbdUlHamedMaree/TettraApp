using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication_TetraApp.Migrations
{
    public partial class AddGroupIDToMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReciverGroupID",
                table: "Messages",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReciverGroupID",
                table: "Messages",
                column: "ReciverGroupID");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Groups_ReciverGroupID",
                table: "Messages",
                column: "ReciverGroupID",
                principalTable: "Groups",
                principalColumn: "GroupID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Groups_ReciverGroupID",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ReciverGroupID",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ReciverGroupID",
                table: "Messages");
        }
    }
}
