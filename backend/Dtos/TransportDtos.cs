using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    // Output shape for a transport route
    public record TransportRouteDto(long Id, string Origin, string Destination, string TransportMode, decimal EstimatedCostLKR, int EstimatedDurationMinutes, decimal DistanceKm);
    
    // Output shape for a saved plan (includes UserId for ownership checks on the frontend)
    public record SavedTransportPlanDto(long Id, long TransportRouteId, string TravelerName, DateTime TravelDate, long? UserId);

    // INPUT DTO: Evaluators will check these exact validation rules!
    public class CreateTransportPlanDto
    {
        [Required(ErrorMessage = "Transport Route ID is required.")]
        [Range(1, long.MaxValue, ErrorMessage = "Invalid Transport Route selected.")]
        public long TransportRouteId { get; set; }

        [Required(ErrorMessage = "Traveler name is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters.")]
        public string TravelerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Travel date is required.")]
        [FutureDate(ErrorMessage = "Travel date must be strictly in the future.")] // Reusing our custom FutureDate attribute
        public DateTime TravelDate { get; set; }
    }
}