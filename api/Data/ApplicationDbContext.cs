using Microsoft.EntityFrameworkCore;


namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<api.Models.Cliente> Cliente { get; set; } = default!;
        public DbSet<api.Models.Fornecedor> Fornecedor { get; set; } = default!;
        public DbSet<api.Models.Produto> Produto { get; set; } = default!;
        public DbSet<api.Models.Pedido> Pedido { get; set; } = default!;

    }
}
