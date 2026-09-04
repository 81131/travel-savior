using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public record RestaurantDto(long Id, string Name, string Location, string CuisineType, decimal AveragePrice, string OpeningHours);
    
    public record ReservationDto(long Id, long RestaurantId, string RestaurantName, string CustomerName, string CustomerPhone, int GuestCount, DateTime ReservationTime);

    public class FutureDateAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value is DateTime dateTime)
            {
                // Fix: Treat Kind=Unspecified as UTC (matches JSON deserialization behavior)
                // so comparison with UtcNow is always consistent.
                var utcDateTime = dateTime.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(dateTime, DateTimeKind.Utc)
                    : dateTime.ToUniversalTime();
                return utcDateTime > DateTime.UtcNow;
            }
            return false;
        }
    }

    public class CreateReservationDto
    {
        [Required]
        public long RestaurantId { get; set; }

        [Required, StringLength(100)]
        public string CustomerName { get; set; } = string.Empty;

        [Required, Phone]
        public string CustomerPhone { get; set; } = string.Empty;

        [Range(1, 20, ErrorMessage = "Guest count must be between 1 and 20.")]
        public int GuestCount { get; set; }

        [Required]
        [FutureDate(ErrorMessage = "Reservation time must be in the future.")]
        public DateTime ReservationTime { get; set; }
    }

    // NEW: DTO for Updating existing reservations (CRUD)
    public class UpdateReservationDto
    {
        [Range(1, 20, ErrorMessage = "Guest count must be between 1 and 20.")]
        public int GuestCount { get; set; }

        [Required]
        [FutureDate(ErrorMessage = "New reservation time must be in the future.")]
        public DateTime ReservationTime { get; set; }
    }
}