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

# .NET 8 default container port is 8080. We expose it for Render.
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# The entry point commands Render to start the API
ENTRYPOINT ["dotnet", "backend.dll"]