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
    public class RestaurantService : IRestaurantService
    {
        private readonly ApplicationDbContext _context;

        public RestaurantService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RestaurantDto>> GetAllRestaurantsAsync()
        {
            return await _context.Restaurants
                .Select(r => new RestaurantDto(r.Id, r.Name, r.Location, r.CuisineType, r.AveragePrice, r.OpeningHours))
                .ToListAsync();
        }

        public async Task<ReservationDto> CreateReservationAsync(CreateReservationDto dto)
        {
            var reservation = new Reservation
            {
                RestaurantId = dto.RestaurantId,
                CustomerName = dto.CustomerName,
                CustomerPhone = dto.CustomerPhone,
                GuestCount = dto.GuestCount,
                ReservationTime = dto.ReservationTime
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            
            var restaurant = await _context.Restaurants.FindAsync(dto.RestaurantId);

            return new ReservationDto(reservation.Id, reservation.RestaurantId, restaurant?.Name ?? "Unknown", reservation.CustomerName, reservation.CustomerPhone, reservation.GuestCount, reservation.ReservationTime);
        }

        // READ: Get all submitted reservations
        public async Task<IEnumerable<ReservationDto>> GetAllReservationsAsync()
        {
            return await _context.Reservations
                .Include(r => r.Restaurant)
                .OrderByDescending(r => r.ReservationTime)
                .Select(r => new ReservationDto(r.Id, r.RestaurantId, r.Restaurant!.Name, r.CustomerName, r.CustomerPhone, r.GuestCount, r.ReservationTime))
                .ToListAsync();
        }

        // UPDATE: Modify an existing reservation
        public async Task<ReservationDto> UpdateReservationAsync(long id, UpdateReservationDto dto)
        {
            var reservation = await _context.Reservations.Include(r => r.Restaurant).FirstOrDefaultAsync(r => r.Id == id);
            if (reservation == null) throw new ArgumentException("Reservation not found.");

            reservation.GuestCount = dto.GuestCount;
            reservation.ReservationTime = dto.ReservationTime;

            await _context.SaveChangesAsync();

            return new ReservationDto(reservation.Id, reservation.RestaurantId, reservation.Restaurant!.Name, reservation.CustomerName, reservation.CustomerPhone, reservation.GuestCount, reservation.ReservationTime);
        }

        // DELETE: Cancel a reservation
        public async Task<bool> DeleteReservationAsync(long id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null) return false;

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}