package org.unoesc.backend.dto;

/**
 * Objeto de Transferência de Dados (DTO) para representar um endereço.
 * Utilizado aninhado em cadastros de pacientes ou profissionais.
 *
 * @param cep Código de Endereçamento Postal.
 * @param logradouro Nome da rua, avenida ou servidão.
 * @param numero Número da residência ou estabelecimento.
 * @param bairro Bairro de localização.
 * @param cidade Cidade.
 * @param estado Sigla da Unidade Federativa (UF).
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public record EnderecoDTO(
        String cep,
        String logradouro,
        String numero,
        String bairro,
        String cidade,
        String estado
) {}