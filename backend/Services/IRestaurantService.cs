using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;

namespace backend.Services
{
    public interface IRestaurantService
    {
        Task<IEnumerable<RestaurantDto>> GetAllRestaurantsAsync();
        Task<ReservationDto> CreateReservationAsync(CreateReservationDto dto);
        
        // NEW: Full CRUD Operations
        Task<IEnumerable<ReservationDto>> GetAllReservationsAsync();
        Task<ReservationDto> UpdateReservationAsync(long id, UpdateReservationDto dto);
        Task<bool> DeleteReservationAsync(long id);
    }
}