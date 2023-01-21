using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Bug_Tracker.Data;
using Bug_Tracker.Enums;
using Bug_Tracker.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Bug_Tracker.Controllers;


[ApiController]
[Route("/user")]
public class UserController : Controller
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Authentication _authentication;

    public UserController(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _authentication = new Authentication(context, configuration);
    }
    
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        return Ok(_context.Users.ToList());
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterModel request)
    {
        _authentication.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Place = request.Place,
            Type = UserType.Regular, // default value
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            Guid = Guid.NewGuid()
        };
        
        var entityEntry =  _context.Users.Add(user).Entity;
        _context.SaveChanges();// store in DB
        
        return Ok(entityEntry);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel request)
    {
       var user = _context.Users.Find(new User
       {
           Email = request.Email
       });

       if (user == null)
           return BadRequest("User does not exist.");
       
       if(!_authentication.VerifyPasswordHash(request.Email, request.Password))
           return BadRequest("Wrong password.");
       
       request.Token = _authentication.CreateToken(user);;
       return Ok(request);
    }
    
     
 
}