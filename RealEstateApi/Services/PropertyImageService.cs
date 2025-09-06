using MongoDB.Driver;
using RealEstateApi.Models;

namespace RealEstateApi.Services;

public class PropertyImageService
{
    private readonly IMongoCollection<PropertyImage> _collection;

    public PropertyImageService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDb:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDb:Database"]);
        _collection = database.GetCollection<PropertyImage>("PropertyImages");
    }

    public async Task<List<PropertyImage>> GetAllAsync() =>
        await _collection.Find(_ => true).ToListAsync();

    public async Task<PropertyImage?> GetByIdAsync(string id) =>
        await _collection.Find(x => x.IdProperty == id).FirstOrDefaultAsync();

    public async Task CreateAsync(PropertyImage img) =>
        await _collection.InsertOneAsync(img);

    public async Task UpdateAsync(string id, PropertyImage img) =>
        await _collection.ReplaceOneAsync(x => x.IdPropertyImage == id, img);

    public async Task DeleteAsync(string id) =>
        await _collection.DeleteOneAsync(x => x.IdPropertyImage == id);
}