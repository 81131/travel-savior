using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;

namespace backend.Services
{
    public interface IItineraryService
    {
        Task<IEnumerable<DestinationDto>> GetAllDestinationsAsync();
        Task<IEnumerable<ItineraryItemDto>> GetItineraryItemsAsync(long itineraryId);
        Task<ItineraryItemDto> AddItemToItineraryAsync(CreateItineraryItemDto dto);
    }
}