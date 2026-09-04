using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedRestaurantData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Restaurants",
                columns: new[] { "Id", "AveragePrice", "CuisineType", "Location", "Name", "OpeningHours" },
                values: new object[,]
                {
                    { 1L, 1500m, "Kottu", "Colombo 07", "Kottu Labs", "11:00 AM - 11:00 PM" },
                    { 2L, 3000m, "North Indian", "Colombo 03", "The Mango Tree", "12:00 PM - 10:30 PM" },
                    { 3L, 2000m, "Sri Lankan Rice & Curry", "Colombo 07", "Upali's by Nawaloka", "11:30 AM - 10:30 PM" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Restaurants",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Restaurants",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Restaurants",
                keyColumn: "Id",
                keyValue: 3L);
        }
    }
}
