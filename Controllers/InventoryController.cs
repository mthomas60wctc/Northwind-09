using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

public class InventoryController : Controller
{
    // this controller depends on the NorthwindRepository
    private DataContext _dataContext;
    public InventoryController(DataContext db) => _dataContext = db;
    [Authorize(Roles = "northwind-employee")]
    public IActionResult Index() => View();

}