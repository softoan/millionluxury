using RealEstateApi.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Registrar servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<PropertyImageService>();

// 🔹 Registrar política de CORS ANTES de Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()   // Permite cualquier origen
            .AllowAnyMethod()   // Permite GET, POST, PUT, DELETE, etc.
            .AllowAnyHeader();  // Permite cualquier header
    });
});

var app = builder.Build();

// 🔹 Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔹 Activar CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
