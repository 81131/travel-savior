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
    public class TransportService : ITransportService
    {
        private readonly ApplicationDbContext _context;

        public TransportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TransportRouteDto>> SearchRoutesAsync(string? origin, string? destination)
        {
            var query = _context.TransportRoutes.AsQueryable();

            // Filter by Origin if provided
            if (!string.IsNullOrWhiteSpace(origin))
            {
                query = query.Where(r => r.Origin.ToLower() == origin.ToLower());
            }

            // Filter by Destination if provided
            if (!string.IsNullOrWhiteSpace(destination))
            {
                query = query.Where(r => r.Destination.ToLower() == destination.ToLower());
            }

            return await query
                .Select(r => new TransportRouteDto(r.Id, r.Origin, r.Destination, r.TransportMode, r.EstimatedCostLKR, r.EstimatedDurationMinutes, r.DistanceKm))
                .ToListAsync();
        }

        // userId is nullable: anonymous users can still save plans, but auth users get ownership
        public async Task<SavedTransportPlanDto> SavePlanAsync(CreateTransportPlanDto dto, long? userId)
        {
            var plan = new SavedTransportPlan
            {
                TransportRouteId = dto.TransportRouteId,
                TravelerName = dto.TravelerName,
                TravelDate = dto.TravelDate,
                UserId = userId
            };

            _context.SavedTransportPlans.Add(plan);
            await _context.SaveChangesAsync();

            return new SavedTransportPlanDto(plan.Id, plan.TransportRouteId, plan.TravelerName, plan.TravelDate, plan.UserId);
        }

        // GET: Only return plans belonging to this user
        public async Task<IEnumerable<SavedTransportPlanDto>> GetMyPlansAsync(long userId)
        {
            return await _context.SavedTransportPlans
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.TravelDate)
                .Select(p => new SavedTransportPlanDto(p.Id, p.TransportRouteId, p.TravelerName, p.TravelDate, p.UserId))
                .ToListAsync();
        }

        // DELETE: Only allow the owning user to delete their own plan
        public async Task<bool> DeletePlanAsync(long planId, long userId)
        {
            // Authorization check: plan must belong to the requesting user
            var plan = await _context.SavedTransportPlans
                .FirstOrDefaultAsync(p => p.Id == planId && p.UserId == userId);

            if (plan == null) return false; // Not found OR not owned by this user

            _context.SavedTransportPlans.Remove(plan);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}