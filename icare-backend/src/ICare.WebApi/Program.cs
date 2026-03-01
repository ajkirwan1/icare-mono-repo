using System.Reflection;
using Npgsql;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalDev", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
builder.Services.AddSingleton<NpgsqlDataSource>(_ =>
{
    var connectionString =
        builder.Configuration.GetConnectionString("DefaultConnection") ??
        ResolveConnectionStringFromDatabaseUrl(Environment.GetEnvironmentVariable("DATABASE_URL")) ??
        "Host=localhost;Port=5432;Database=icare_dev;Username=icare;Password=icare_password";

    return new NpgsqlDataSourceBuilder(connectionString).Build();
});
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(
    Assembly.Load("ICare.Application")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
else
{
    app.UseHttpsRedirection();
}
app.UseCors("LocalDev");

app.MapControllers();
app.Run();

static string? ResolveConnectionStringFromDatabaseUrl(string? databaseUrl)
{
    if (string.IsNullOrWhiteSpace(databaseUrl))
    {
        return null;
    }

    if (!Uri.TryCreate(databaseUrl, UriKind.Absolute, out var uri))
    {
        return null;
    }

    if (uri.Scheme is not ("postgres" or "postgresql"))
    {
        return null;
    }

    var userInfo = uri.UserInfo.Split(':', 2);
    var username = userInfo.Length > 0 ? Uri.UnescapeDataString(userInfo[0]) : "";
    var password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : "";
    var database = uri.AbsolutePath.TrimStart('/');
    var host = uri.Host;
    var port = uri.Port > 0 ? uri.Port : 5432;

    return $"Host={host};Port={port};Database={database};Username={username};Password={password};";
}
