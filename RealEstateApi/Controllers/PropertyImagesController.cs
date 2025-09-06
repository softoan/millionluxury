using Microsoft.AspNetCore.Mvc;
using RealEstateApi.Models;
using RealEstateApi.Services;

namespace RealEstateApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertyImagesController : ControllerBase
{
    private readonly PropertyImageService _service;

    public PropertyImagesController(PropertyImageService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<PropertyImage>>> Get() =>
        await _service.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<PropertyImage>> Get(string id)
    {
        var img = await _service.GetByIdAsync(id);
        return img is null ? NotFound() : img;
    }

    [HttpPost]
    public async Task<ActionResult> Create(PropertyImage img)
    {
        await _service.CreateAsync(img);
        return CreatedAtAction(nameof(Get), new { id = img.IdPropertyImage }, img);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, PropertyImage img)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing is null) return NotFound();
        img.IdPropertyImage = existing.IdPropertyImage;
        await _service.UpdateAsync(id, img);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing is null) return NotFound();
        await _service.DeleteAsync(id);
        return NoContent();
    }
}