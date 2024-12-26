using System;
using Microsoft.AspNetCore.Mvc;
using seylan_firsst_app_backend.Models;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
	private readonly UserService _userService;

	public UserController(UserService userService)
	{
		_userService = userService;
    }

	//GET api/user
	[HttpGet]
	public async Task<IActionResult> GetAll()
	{
		List<User> users = await _userService.GetAllAsync();
		return Ok(users);
	}

	//GET api/user/{id}
	[HttpGet("{id}", Name ="GetUserById")]
	public async Task<IActionResult> GetByIdAsync(int id)
	{
		User user = await _userService.GetByIdAsync(id);
		if(user == null)
		{
			return NotFound(new { Message = $"User with user_id {id} is not found!" });
		}

		return Ok(new { Message = "User retrieved successfully!", data = user });
    }


    //POST api/user
    [HttpPost]
    public async Task<IActionResult> AddUserAsync(User user)
    {

		//get the result from inserting new User data
		var result = await _userService.AddAsync(user);

        if (!result.isSuccess)
        {
            return BadRequest(new { Message = result.ErrorMessage });
        }

        return CreatedAtRoute("GetUserById", new { id = result.data.id }, result.data);
    }


	//PUT  api/user/{id}
	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateUserAsync(int id, User user)
	{
		//if the id passed does not match the id in the User body
		if(id != user.id)
		{
			//return bad request client error 400
			return BadRequest();
		}

		//update the user details
		var result = await _userService.UpdateUserAsync(user);

		//validate result response
		if (!result.isSuccess)
		{
			return NotFound(new { Message = result.ErrorMessage });
		}

		return Ok(new { Message = result.isSuccess });
    }

	//DELETE api/user/{id}
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteAsync(int id)
	{
		var result = await _userService.DeleteAsync(id);
		if (!result.isSuccess)
		{
			return NotFound(new { Message = $"Error deleting user, error message: {result.ErrorMessage}" });
		}

		return Ok(new { Message = $"Successfully deleted user, {result.InfoMessage}" });
    }
}
