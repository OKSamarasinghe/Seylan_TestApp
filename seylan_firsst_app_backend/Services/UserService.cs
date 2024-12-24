using seylan_firsst_app_backend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using seylan_firsst_app_backend;

public class UserService
{
	private readonly AppDbContext _context;

	//constructor
	public UserService(AppDbContext context)
	{
		this._context = context;
	}


	//implement the logic to get all users from the database
	public async Task<List<User>> GetAllAsync()
	{
		return await _context.Users.ToListAsync();
	}

	//implement the logic to get a user by id
	public async Task<User> GetByIdAsync(int id)
	{
		//store the user returned
		User user = await _context.Users.FirstOrDefaultAsync(user => user.id == id);
		if(user == null)
		{
			return null;
		}

		return user;
	}

	//implement the save user details logic
	public async Task<Result<User>> AddAsync(User user)
	{
		try
		{
			//add the details to the database
			await _context.Users.AddAsync(user);
			await _context.SaveChangesAsync();
			return new Result<User> { isSuccess = true, data = user, InfoMessage = "User has been added successfully!" };
		}
		catch (Exception ex)
		{
			return new Result<User> { isSuccess = false, ErrorMessage = $"An error has occured!. Error is {ex.Message}" };
		}
	}

	//implement the logic to update the user
	public async Task<Result<User>> UpdateUserAsync(User user)
	{
		try
		{
			//check if the user is available in the database
			User existingUser = await _context.Users.FirstOrDefaultAsync(u => u.id == user.id);
			if(existingUser == null)
			{
				//return the user doesnt exist
				return new Result<User> { isSuccess = false, ErrorMessage = $"Update failed, user with user id {user.id} does not exist!" };
			}

			//provide the updated values
			existingUser.Name = user.Name;
			existingUser.Email = user.Email;
			existingUser.PhoneNumber = user.PhoneNumber;
			existingUser.AccountType = user.AccountType;
			existingUser.PreferredBranch = user.PreferredBranch;

			//save the changes
			await _context.SaveChangesAsync();

			//once update is successful
			return new Result<User> { isSuccess = true, InfoMessage = $"User with id {user.id} was updated successfully!" };
		}catch(Exception ex)
		{
			return new Result<User> { isSuccess = false, ErrorMessage = $"There was a database error! Unable to update user! Error is {ex.Message}" };
		}	
    }

    //implement the logic to delete a user
    public async Task<Result<User>> DeleteAsync(int id)
	{
		try
		{
            User existingUser = await _context.Users.FirstOrDefaultAsync(u => u.id == id);
            if (existingUser == null)
            {
                return new Result<User> { isSuccess = false, ErrorMessage = $"User with id {id} was not found! Delete was unsuccessful!" };
            }

			//if the id is found in the 
			_context.Users.Remove(existingUser);
			await _context.SaveChangesAsync();
			return new Result<User> { isSuccess = true, InfoMessage = $"User with id {id} was successfully deleted!" };

        }
        catch (Exception ex)
		{
			return new Result<User> { isSuccess = false, ErrorMessage = $"There was an error! Couldn't delete the user in database. Error is {ex.Message}" };
		}
		
    }

}
