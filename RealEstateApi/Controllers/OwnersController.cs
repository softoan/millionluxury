using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RealEstateApi.Models;

namespace RealEstateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OwnersController : ControllerBase
{
    private readonly IMongoCollection<Owner> _owners;

    public OwnersController(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDb:ConnectionString"]);
        var db = client.GetDatabase(config["MongoDb:Database"]);
        _owners = db.GetCollection<Owner>("owners");
    }

    [HttpGet]
    public async Task<ActionResult<List<Owner>>> Get() =>
        await _owners.Find(_ => true).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Owner>> Get(string id)
    {
        var owner = await _owners.Find(o => o.IdOwner == id).FirstOrDefaultAsync();
        return owner is null ? NotFound() : owner;
    }

    [HttpPost]
    public async Task<ActionResult> Create(Owner owner)
    {
        await _owners.InsertOneAsync(owner);
        return CreatedAtAction(nameof(Get), new { id = owner.IdOwner }, owner);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, Owner updated)
    {
        var existing = await _owners.Find(o => o.IdOwner == id).FirstOrDefaultAsync();
        if (existing is null) return NotFound();

        updated.IdOwner = existing.IdOwner;
        await _owners.ReplaceOneAsync(o => o.IdOwner == id, updated);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        var result = await _owners.DeleteOneAsync(o => o.IdOwner == id);
        return result.DeletedCount == 0 ? NotFound() : NoContent();
    }
}
