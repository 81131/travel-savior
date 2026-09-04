using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultItinerary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Itineraries",
                columns: new[] { "Id", "PlanName" },
                values: new object[] { 1L, "My Sri Lanka Adventure" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEMs5abdAoajfPRqT25xm1usbpdwP7zbPNP9s4pUYY4O/dmcL6OT/LB/954c8Lc5ySg==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Itineraries",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAECiKbeqfhEyLbW1FqbmcL6U4mbMqS3w0fsu/LIb6ehudQoX/byIAn9ap8U8iMQiOxQ==");
        }
    }
}
