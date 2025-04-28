using System.ComponentModel.DataAnnotations.Schema;

public class ItemUpdate
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public decimal UnitPrice { get; set; }
    public short UnitsInStock { get; set; }
    public short UnitsOnOrder { get; set; }
    public short ReorderLevel { get; set; }

    public Customer Customer { get; set; }
    public Product Product { get; set; }
}