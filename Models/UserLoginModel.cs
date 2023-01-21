namespace Bug_Tracker.Models;

public class UserLoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
    
    public string Token { get; set; }
}