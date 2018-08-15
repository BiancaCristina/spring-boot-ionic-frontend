// Coloca o "interface" pra poder definir um tipo DTO
export interface CategoriaDTO{
    id: string, // Mesmo que no backend seja "Integer", vou deixar esse id como "string" pra deixar o projeto mais flexivel caso eu use um banco de dados que usa ID como string
    nome: string,
}