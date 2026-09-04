using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;

namespace backend.Services
{
    public interface ITransportService
    {
        // Nullable strings allow us to return all routes if the user doesn't filter
        Task<IEnumerable<TransportRouteDto>> SearchRoutesAsync(string? origin, string? destination);
        Task<SavedTransportPlanDto> SavePlanAsync(CreateTransportPlanDto dto, long? userId);
        Task<IEnumerable<SavedTransportPlanDto>> GetMyPlansAsync(long userId);
        Task<bool> DeletePlanAsync(long planId, long userId);
    }
}