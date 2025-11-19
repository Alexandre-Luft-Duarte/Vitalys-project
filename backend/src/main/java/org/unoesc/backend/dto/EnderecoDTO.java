package org.unoesc.backend.dto;

public record EnderecoDTO(
        String cep,
        String logradouro, // rua
        String numero,
        String bairro,
        String cidade,
        String estado // UF
) {}