using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSmartTransportFeature : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TransportRoutes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Origin = table.Column<string>(type: "text", nullable: false),
                    Destination = table.Column<string>(type: "text", nullable: false),
                    TransportMode = table.Column<string>(type: "text", nullable: false),
                    EstimatedCostLKR = table.Column<decimal>(type: "numeric", nullable: false),
                    EstimatedDurationMinutes = table.Column<int>(type: "integer", nullable: false),
                    DistanceKm = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportRoutes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SavedTransportPlans",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TransportRouteId = table.Column<long>(type: "bigint", nullable: false),
                    TravelerName = table.Column<string>(type: "text", nullable: false),
                    TravelDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedTransportPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedTransportPlans_TransportRoutes_TransportRouteId",
                        column: x => x.TransportRouteId,
                        principalTable: "TransportRoutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "TransportRoutes",
                columns: new[] { "Id", "Destination", "DistanceKm", "EstimatedCostLKR", "EstimatedDurationMinutes", "Origin", "TransportMode" },
                values: new object[,]
                {
                    { 1L, "Ella", 200m, 1200m, 540, "Colombo", "Train" },
                    { 2L, "Ella", 200m, 25000m, 300, "Colombo", "Taxi" },
                    { 3L, "Colombo", 115m, 800m, 210, "Kandy", "Bus" },
                    { 4L, "Colombo", 115m, 600m, 180, "Kandy", "Train" },
                    { 5L, "Colombo", 125m, 1000m, 90, "Galle", "Bus" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedTransportPlans_TransportRouteId",
                table: "SavedTransportPlans",
                column: "TransportRouteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedTransportPlans");

            migrationBuilder.DropTable(
                name: "TransportRoutes");
        }
    }
}
