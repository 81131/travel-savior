using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItineraryController : ControllerBase
    {
        private readonly IItineraryService _itineraryService;

        public ItineraryController(IItineraryService itineraryService)
        {
            _itineraryService = itineraryService;
        }

        [HttpGet("destinations")]
        public async Task<ActionResult<IEnumerable<DestinationDto>>> GetDestinations()
        {
            return Ok(await _itineraryService.GetAllDestinationsAsync());
        }

        [HttpGet("{itineraryId}/items")]
        public async Task<ActionResult<IEnumerable<ItineraryItemDto>>> GetItineraryItems(long itineraryId)
        {
            return Ok(await _itineraryService.GetItineraryItemsAsync(itineraryId));
        }

        [HttpPost("items")]
        public async Task<ActionResult<ItineraryItemDto>> AddItemToItinerary([FromBody] CreateItineraryItemDto dto)
        {
            try
            {
                var result = await _itineraryService.AddItemToItineraryAsync(dto);
                return Created($"/api/itinerary/{result.ItineraryId}/items", result);
            }
            // Safely catch our business logic validation errors and send them back to the React UI
            catch (Exception ex) when (ex is ArgumentException || ex is InvalidOperationException)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}