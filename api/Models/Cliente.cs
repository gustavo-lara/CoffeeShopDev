using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Cliente
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome não pode exceder 100 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O CPF é obrigatório.")]
        [RegularExpression(@"^\d{11}$", ErrorMessage = "O CPF deve conter 11 dígitos.")]
        public string CPF { get; set; }

        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O email não é válido.")]
        public string Email { get; set; }

        [Phone(ErrorMessage = "O telefone não é válido.")]
        public string Telefone { get; set; }

        public bool Ativo { get; set; }
        public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
        //    //Possibilita pegar info sem ter que fazer coisas no controller | Cliente nao surge com ICollection então cria uma nova lista
        //    //Poderia user em pedidos
        //    //Serve como um filtro
    }
}
