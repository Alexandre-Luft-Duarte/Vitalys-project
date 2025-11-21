export type AuthContextType =  {
    isAuthenticated: boolean | null
    login: (email: string, senha: string) => Promise<void>
    logout: () => void
    nome: string
    cadastro: (dados: cadastroType) => Promise<void>
}

export type CadastroType = {
    nomeCompleto: string,
    cpf: string,
    dataNascimento: string,
    email: string,
    senha: string,
    tipoUsuario: "PROFISSIONAL" | "RECEPCIONISTA",
    especialidadeId?: number,
    telefone?: string,
    endereco?: string
}

// Tipo para o Endereço
export type EnderecoData = {
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
}

// Tipo Principal
export type CadastroPacienteType = {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string; // YYYY-MM-DD
    descricaoMedica?: string;
    telefone?: string;
    endereco?: EnderecoData | null; // Pode ser null se não preenchido
}

export type PacienteListagemType = {
    id: number,
    nome: string,
    cpf: string,
    dataNascimento: string
}