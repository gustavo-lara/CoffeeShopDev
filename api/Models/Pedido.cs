
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Pedido
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "A data de emissão é obrigatória.")]
        public DateTime DataEmissao { get; set; }

        [Required(ErrorMessage = "O valor total é obrigatório.")]
        public decimal ValorTotal { get; set; }

        [ForeignKey("ClienteId")]
        [Required(ErrorMessage = "O ID do cliente é obrigatório.")]
        public Guid ClienteId { get; set; }
        public Cliente? Cliente { get; set; }
    }
}
