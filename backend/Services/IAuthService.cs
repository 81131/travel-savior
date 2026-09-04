using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        
        // Admin Profile Management (CRUD)
        Task<IEnumerable<UserProfileDto>> GetAllCustomersAsync();
        Task<UserProfileDto> UpdateCustomerAsync(long id, UpdateUserDto dto);
        Task<bool> DeleteCustomerAsync(long id);
    }
}