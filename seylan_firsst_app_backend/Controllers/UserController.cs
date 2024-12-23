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
	public IActionResult GetAll()
	{
		List<User> users = _userService.GetAll();
		return Ok(users);
	}

	//GET api/user/{id}
	[HttpGet("{id}")]
	public IActionResult GetById(int id)
	{
		Result<User> user = _userService.GetById(id);
        if(user.isSuccess)
        {
			return Ok(user.data);
        }
		else
		{
			return NotFound(user.ErrorMessage);
		}
    }


    //POST api/user
    [HttpPost]
    public IActionResult AddUser([FromBody] User user)
    {
        _userService.Add(user);
        return CreatedAtAction(nameof(GetById), new { id = user.id }, user);
    }


	//PUT  api/user/{id}
	[HttpPut("{id}")]
	public IActionResult UpdateUser([FromBody] User user)
	{
		var existingUser = _userService.GetById(user.id);

        if (!existingUser.isSuccess)
        {
            return NotFound(existingUser.ErrorMessage);
        }

        //user was found so now we can update
        _userService.UpdateUser(user);
		return Ok();
    }

	//DELETE api/user/{id}
	[HttpDelete("{id}")]
	public IActionResult Delete(int id)
	{
		var existingUser = _userService.GetById(id);
		if(!existingUser.isSuccess)
		{
			return NotFound(existingUser.ErrorMessage);
		}
		
		//User exists
		_userService.Delete(id);
		return NoContent();
    }
}
