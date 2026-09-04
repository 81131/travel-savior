using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    // Output shape for a Destination
    public record DestinationDto(long Id, string Name, string District, TimeSpan OpenTime, TimeSpan CloseTime, int TypicalDurationMinutes, string BestSeason);
    
    // Output shape for an Itinerary Item
    public record ItineraryItemDto(long Id, long ItineraryId, long DestinationId, string DestinationName, DateTime VisitDate, string StartTime, string EndTime);

    // INPUT DTO: Strict Validation Applied
    public class CreateItineraryItemDto
    {
        [Required]
        public long ItineraryId { get; set; } // Assuming default itinerary ID is 1 for the hackathon MVP

        [Required]
        [Range(1, long.MaxValue, ErrorMessage = "Please select a valid destination.")]
        public long DestinationId { get; set; }

        [Required]
        [FutureDate(ErrorMessage = "You can only plan itineraries for future dates.")]
        public DateTime VisitDate { get; set; }

        [Required(ErrorMessage = "Start time is required.")]
        public TimeSpan StartTime { get; set; }
    }
}