export interface ClienteDTO {
    // Os campos abaixo sao os mesmos do ClienteDTO do backend
    id: string;
    nome: string;
    email: string;
    // Fim dos campos

    // A variavel a seguir armazena a URL da imagem do user
        // Esse "?" indica que essa URL eh opcional
    imageURL?: string; 
    // Fim da variavel

    
}