using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Fornecedor
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "O nome do fornecedor é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome não pode exceder 100 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O email não é válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O CNPJ é obrigatório.")]
        [RegularExpression(@"^\d{14}$", ErrorMessage = "O CNPJ deve conter 14 dígitos.")]
        public string CNPJ { get; set; }

        [StringLength(200, ErrorMessage = "O endereço não pode exceder 200 caracteres.")]
        public string Endereco { get; set; }

        [Phone(ErrorMessage = "O telefone não é válido.")]
        public string Telefone { get; set; }
    }
}
