# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"

# Copy the remaining source code and publish the application
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /app/publish .

# Railway injects $PORT at runtime; Program.cs reads it with Environment.GetEnvironmentVariable("PORT").
# We expose 8080 as a documentation hint only — the actual port is dynamic.
EXPOSE 8080

# The entry point commands Render to start the API
ENTRYPOINT ["dotnet", "backend.dll"]