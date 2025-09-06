using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RealEstateApi.Models;

namespace RealEstateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IMongoCollection<Property> _properties;
    private readonly IMongoCollection<PropertyImage> _images;

    public PropertiesController(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDb:ConnectionString"]);
        var db = client.GetDatabase(config["MongoDb:Database"]);
        _properties = db.GetCollection<Property>("Properties");
        _images = db.GetCollection<PropertyImage>("PropertyImages");
    }

    [HttpGet("filter")]
    public async Task<ActionResult> Filter(
        [FromQuery] string? idOwner,
        [FromQuery] string? name,
        [FromQuery] string? address,
        [FromQuery] decimal? price)
    {
        var filter = Builders<Property>.Filter.Empty;

        if (!string.IsNullOrEmpty(idOwner))
            filter &= Builders<Property>.Filter.Eq(p => p.IdOwner, idOwner);
        if (!string.IsNullOrEmpty(name))
            filter &= Builders<Property>.Filter.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i"));
        if (!string.IsNullOrEmpty(address))
            filter &= Builders<Property>.Filter.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(address, "i"));
        if (price.HasValue)
            filter &= Builders<Property>.Filter.Eq(p => p.Price, price.Value);

        var properties = await _properties.Find(filter).ToListAsync();

        var result = new List<object>();

        foreach (var prop in properties)
        {
            var img = await _images.Find(i => i.IdProperty == prop.IdProperty && i.Enabled)
                                   .FirstOrDefaultAsync();

            result.Add(new
            {
                prop.IdProperty,
                prop.Name,
                prop.Address,
                prop.Price,
                Image = img?.File
            });
        }

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<List<Property>>> Get() =>
    await _properties.Find(_ => true).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Property>> Get(string id)
    {
        var prop = await _properties.Find(p => p.IdProperty == id).FirstOrDefaultAsync();
        return prop is null ? NotFound() : prop;
    }

    [HttpPost]
    public async Task<ActionResult> Create(Property property)
    {
        await _properties.InsertOneAsync(property);
        return CreatedAtAction(nameof(Get), new { id = property.IdProperty }, property);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, Property updated)
    {
        var existing = await _properties.Find(p => p.IdProperty == id).FirstOrDefaultAsync();
        if (existing is null) return NotFound();

        updated.IdProperty = existing.IdProperty;
        await _properties.ReplaceOneAsync(p => p.IdProperty == id, updated);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        var result = await _properties.DeleteOneAsync(p => p.IdProperty == id);
        return result.DeletedCount == 0 ? NotFound() : NoContent();
    }

}