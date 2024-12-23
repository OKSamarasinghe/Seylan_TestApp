using System.*;

public class UserService
{
	private readonly List<User> _user = new List<User>();

	//implement the logic to get all users from the list
	public List<User> GetAll() => _user;

	//implement the logic to get a user by id
	public Result<User> GetById(int id)
	{
		//store the user returned
		User user = _user.FirstOrDefault(user => user.id == id);
		if(user == null)
		{
			return new Result<User> { isSuccess =  false, ErrorMessage =  $"The following user with id {id} was not found!"}
		}
		else
		{
			return new Result<User> { isSuccess = true, data =  user, InfoMessage =  "The user was found and returned successfully!"}
		}
	}

	//implement the save user details logic
	public void Add(User user)
	{
		user.id = _user.Count > 0 ? _user.Max(user => user.id) + 1 : 1;
		_user.Add(user);
	}

	//implement the logic to update the user
	public Result<User> UpdateUser(User user)
	{
		//check if the user is in the object or not
		User existingUser = _user.FirstOrDefault(u => u.id == user.id);
		if(existingUser == null)
		{
			return new Result<User> { isSuccess = false, ErrorMessage =  $"The following user with the id {user.id} was not found. Update unsuccessful!"}
		}
		else
		{
			//add the details from the passed User object to the existing user object
			exstingUser.name = user.name;
			existingUser.email = user.email;
			existingUser.telNo = user.telNo;
			existingUser.accountType = user.accountType;
			existingUser.preferredBranch = user.preferredBranch;
		}
	}

	//implement the logic to delete a user
	public Result<User> DeleteUser(int id)
	{
		User existingUser = _user.FirstOrDefault(u => u.id == id);
		if(existingUser == null)
		{
			return Result<User> { isSuccess = false, ErrorMessage =  $"The following user with id {id} does not exist! Delete failed!"}
		}
		else
		{
			_user.Remove(existingUser);
        }
	}

}
