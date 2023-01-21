using Bug_Tracker.Data;
using Bug_Tracker.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Bug_Tracker.Controllers;
[ApiController]
[Route("authentication")]
public class AuthController : Controller
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Authentication _authentication;

    AuthController(DataContext context, IConfiguration configuration, Authentication authentication)
    {
        _context = context;
        _configuration = configuration;
        _authentication = new Authentication(context, configuration);
    }

    [HttpPost("verify-token")]
    public async Task<IActionResult> VerifyToken([FromBody] string token)
    {
        return Ok(_authentication.ValidateJWTToken(token));
    }

}