using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RealEstateApi.Models;

namespace RealEstateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertyTracesController : ControllerBase
{
    private readonly IMongoCollection<PropertyTrace> _traces;

    public PropertyTracesController(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDb:ConnectionString"]);
        var db = client.GetDatabase(config["MongoDb:Database"]);
        _traces = db.GetCollection<PropertyTrace>("propertyTraces");
    }

    [HttpGet]
    public async Task<ActionResult<List<PropertyTrace>>> Get() =>
        await _traces.Find(_ => true).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<List<PropertyTrace>>> Get(string id)
    {
        var trace = await _traces.Find(t => t.IdProperty == id).ToListAsync();
        return trace is null ? NotFound() : trace;
    }

    [HttpPost]
    public async Task<ActionResult> Create(PropertyTrace trace)
    {
        await _traces.InsertOneAsync(trace);
        return CreatedAtAction(nameof(Get), new { id = trace.IdPropertyTrace }, trace);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, PropertyTrace updated)
    {
        var existing = await _traces.Find(t => t.IdPropertyTrace == id).FirstOrDefaultAsync();
        if (existing is null) return NotFound();

        updated.IdPropertyTrace = existing.IdPropertyTrace;
        await _traces.ReplaceOneAsync(t => t.IdPropertyTrace == id, updated);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        var result = await _traces.DeleteOneAsync(t => t.IdPropertyTrace == id);
        return result.DeletedCount == 0 ? NotFound() : NoContent();
    }
}
