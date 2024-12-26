using System.ComponentModel.DataAnnotations;


public class User
{
	//add the attributes for the User
	//unique identifier for the user
	public int id { get; set; }


	//additional attributes for the user
	[Required]
	public string Name { get; set; }

	[Required]
	[EmailAddress]
	public string Email { get; set; }

	[Required]
	[Phone]
	public string PhoneNumber { get; set; }

	[Required]
	public string AccountType { get; set; }

    [Required]
    public string PreferredBranch { get; set;  }

	[Required]
	public string UserImage { get; set; }
}
