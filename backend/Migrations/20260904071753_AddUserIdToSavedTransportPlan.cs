using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToSavedTransportPlan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "TravelDate",
                table: "SavedTransportPlans",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "SavedTransportPlans",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ReservationTime",
                table: "Reservations",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "VisitDate",
                table: "ItineraryItems",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEJJqfddjrnO8bzjlqAXQUREIllxArBj1E6GtKVuzv3qegONXfI54sKuPWaFY84XAGw==");

            migrationBuilder.CreateIndex(
                name: "IX_SavedTransportPlans_UserId",
                table: "SavedTransportPlans",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedTransportPlans_Users_UserId",
                table: "SavedTransportPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedTransportPlans_Users_UserId",
                table: "SavedTransportPlans");

            migrationBuilder.DropIndex(
                name: "IX_SavedTransportPlans_UserId",
                table: "SavedTransportPlans");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SavedTransportPlans");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TravelDate",
                table: "SavedTransportPlans",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ReservationTime",
                table: "Reservations",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<DateTime>(
                name: "VisitDate",
                table: "ItineraryItems",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEMs5abdAoajfPRqT25xm1usbpdwP7zbPNP9s4pUYY4O/dmcL6OT/LB/954c8Lc5ySg==");
        }
    }
}
