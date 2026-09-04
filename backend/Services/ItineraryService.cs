using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ItineraryService : IItineraryService
    {
        private readonly ApplicationDbContext _context;

        public ItineraryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DestinationDto>> GetAllDestinationsAsync()
        {
            return await _context.Destinations
                .Select(d => new DestinationDto(d.Id, d.Name, d.District, d.OpenTime, d.CloseTime, d.TypicalDurationMinutes, d.BestSeason))
                .ToListAsync();
        }

        public async Task<IEnumerable<ItineraryItemDto>> GetItineraryItemsAsync(long itineraryId)
        {
            return await _context.ItineraryItems
                .Include(i => i.Destination)
                .Where(i => i.ItineraryId == itineraryId)
                .OrderBy(i => i.VisitDate).ThenBy(i => i.StartTime)
                .Select(i => new ItineraryItemDto(i.Id, i.ItineraryId, i.DestinationId, i.Destination!.Name, i.VisitDate, i.StartTime.ToString(@"hh\:mm"), i.EndTime.ToString(@"hh\:mm")))
                .ToListAsync();
        }

        public async Task<ItineraryItemDto> AddItemToItineraryAsync(CreateItineraryItemDto dto)
        {
            var destination = await _context.Destinations.FindAsync(dto.DestinationId);
            if (destination == null) throw new ArgumentException("Destination not found.");

            // 1. DURATION CALCULATION: Auto-calculate EndTime based on Destination's Typical Duration
            var endTime = dto.StartTime.Add(TimeSpan.FromMinutes(destination.TypicalDurationMinutes));

            // 2. OPENING HOURS CHECK: Cannot visit if the place is closed
            if (dto.StartTime < destination.OpenTime || endTime > destination.CloseTime)
            {
                throw new InvalidOperationException($"{destination.Name} is only open from {destination.OpenTime:hh\\:mm} to {destination.CloseTime:hh\\:mm}. Your visit requires {destination.TypicalDurationMinutes} minutes.");
            }

            // 3. OVERLAP CHECK: Cannot be in two places at once on the same day
            var existingItems = await _context.ItineraryItems
                .Where(i => i.ItineraryId == dto.ItineraryId && i.VisitDate.Date == dto.VisitDate.Date)
                .ToListAsync();

            bool isOverlapping = existingItems.Any(i => dto.StartTime < i.EndTime && endTime > i.StartTime);
            if (isOverlapping)
            {
                throw new InvalidOperationException("This time slot overlaps with another destination already in your itinerary for this day.");
            }

            var item = new ItineraryItem
            {
                ItineraryId = dto.ItineraryId,
                DestinationId = dto.DestinationId,
                VisitDate = dto.VisitDate.Date, // Store only the date part
                StartTime = dto.StartTime,
                EndTime = endTime
            };

            _context.ItineraryItems.Add(item);
            await _context.SaveChangesAsync();

            return new ItineraryItemDto(item.Id, item.ItineraryId, item.DestinationId, destination.Name, item.VisitDate, item.StartTime.ToString(@"hh\:mm"), item.EndTime.ToString(@"hh\:mm"));
        }
    }
}