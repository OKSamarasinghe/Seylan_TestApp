using System.ComponentModel.DataAnnotations;


public class User
{
	//add the attributes for the User
	//unique identifier for the user
	public int id { get; set; }


	//additional attributes for the user
	[Required]
	public string name { get; set; }

	[Required]
	[EmailAddress]
	public string email { get; set; }

	[Required]
	[Phone]
	public string telNo { get; set; }

	[Required]
	public string accountType { get; set; }

    [Required]
    public string preferredBranch { get; set;  }
}
