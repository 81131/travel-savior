using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Full name must be between 3 and 100 characters.")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Gmail is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$", 
            ErrorMessage = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required.")]
        [RegularExpression(@"^07\d{8}$", ErrorMessage = "Phone number must be a valid Sri Lankan mobile number (e.g., 0712345678).")]
        public string PhoneNumber { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = string.Empty;
    }

    public record AuthResponseDto(long Id, string FullName, string Email, string Role, string Token);

    public record UserProfileDto(long Id, string FullName, string Email, string PhoneNumber, string Role);

    public class UpdateUserDto
    {
        [Required, StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required, RegularExpression(@"^07\d{8}$", ErrorMessage = "Invalid Sri Lankan phone number.")]
        public string PhoneNumber { get; set; } = string.Empty;
    }
}