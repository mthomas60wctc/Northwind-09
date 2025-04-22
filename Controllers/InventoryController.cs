using Microsoft.AspNetCore.Mvc;

public class InventoryController : Controller
{
    // this controller depends on the NorthwindRepository
    private DataContext _dataContext;
    public InventoryController(DataContext db) => _dataContext = db;
    public IActionResult Index() => View();

}