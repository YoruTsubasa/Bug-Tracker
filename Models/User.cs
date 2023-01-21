using System.ComponentModel.DataAnnotations;
using Bug_Tracker.Enums;
using Microsoft.EntityFrameworkCore;

namespace Bug_Tracker.Models;

[Index(nameof(Email), Name = "IX_Nvarchar_Email" ,IsUnique = true)]
public class User
{
    public Guid Guid { get; set; }
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Place { get; set; }
    
    [StringLength(450)]
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public UserType Type { get; set; }

    public User()
    {
        Guid = Guid.NewGuid();
        Type = UserType.Regular;
    }

    public User(string email, byte[] passwordHash, byte[] passwordSalt)
    {
        Guid = Guid.NewGuid();
        Email = email;
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
        Type = UserType.Regular;
    }

    public User(string firstName, string lastName, string place, string email, UserType type, byte[] passwordHash, byte[] passwordSalt)
    {
        Guid = Guid.NewGuid();
        FirstName = firstName;
        LastName = lastName;
        Place = place;
        Email = email;
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
        Type = type;
        Type = UserType.Regular;
    }
}