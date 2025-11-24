package org.unoesc.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.unoesc.backend.dto.LoginRequestDTO;
import org.unoesc.backend.dto.LoginResponseDTO;
import org.unoesc.backend.dto.UsuarioCadastroDTO;
import org.unoesc.backend.model.Contato;
import org.unoesc.backend.model.Departamento;
import org.unoesc.backend.model.Endereco;
import org.unoesc.backend.model.Profissional;
import org.unoesc.backend.model.Recepcionista;
import org.unoesc.backend.model.Usuario;
import org.unoesc.backend.repository.DepartamentoRepository;
import org.unoesc.backend.repository.ProfissionalRepository;
import org.unoesc.backend.repository.RecepcionistaRepository;
import org.unoesc.backend.repository.UsuarioRepository;

/**
 * Controlador responsável pelo gerenciamento de usuários do sistema.
 * <p>
 * Lida com o cadastro unificado de Profissionais e Recepcionistas, validação de dados
 * e endpoints de autenticação (login/logout).
 * </p>
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired private RecepcionistaRepository recepcionistaRepository;
    @Autowired private ProfissionalRepository profissionalRepository;
    @Autowired private DepartamentoRepository departamentoRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    /**
     * Cadastra um novo usuário no sistema (Profissional ou Recepcionista).
     * <p>
     * Verifica se o e-mail já existe e salva a entidade específica baseada no
     * tipo de usuário informado no DTO.
     * </p>
     *
     * @param dados DTO contendo todas as informações pessoais, de contato e credenciais.
     * @return O usuário criado com status 201 (Created).
     * @throws ResponseStatusException Se o email já existir (400) ou departamento não for encontrado (404).
     */
    @PostMapping("/cadastro")
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody UsuarioCadastroDTO dados) {

        if (usuarioRepository.findByEmail(dados.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já cadastrado.");
        }

        Usuario novoUsuario = null;

        if ("PROFISSIONAL".equalsIgnoreCase(dados.tipoUsuario())) {
            if (dados.departamentoId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID do Departamento é obrigatório para profissionais.");
            }

            Departamento departamento = departamentoRepository.findById(dados.departamentoId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento não encontrado."));

            Profissional prof = new Profissional();
            prof.setDepartamento(departamento);
            preencherDadosComuns(prof, dados);

            novoUsuario = profissionalRepository.save(prof);

        } else if ("RECEPCIONISTA".equalsIgnoreCase(dados.tipoUsuario())) {
            Recepcionista recep = new Recepcionista();
            preencherDadosComuns(recep, dados);

            novoUsuario = recepcionistaRepository.save(recep);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de usuário inválido. Use PROFISSIONAL ou RECEPCIONISTA.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    /**
     * Realiza a autenticação do usuário.
     * Verifica as credenciais e retorna o perfil de acesso.
     *
     * @param loginRequest DTO contendo email e senha.
     * @return Objeto com dados do usuário e token, ou erro de autorização.
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDTO loginRequest) {
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.email()).orElse(null);

        if (usuario == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail não encontrado.");
        if (!usuario.getSenha().equals(loginRequest.senha())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
        if (!usuario.getStatusAtivo()) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário inativo no sistema.");

        String tipoUsuario = "USUARIO";
        if (usuario instanceof Profissional) tipoUsuario = "PROFISSIONAL";
        else if (usuario instanceof Recepcionista) tipoUsuario = "RECEPCIONISTA";

        LoginResponseDTO response = new LoginResponseDTO(usuario.getIdPessoa(), usuario.getNomeCompleto(), usuario.getEmail(), tipoUsuario, "dummy-token");
        return ResponseEntity.ok(response);
    }

    /**
     * Realiza o logout do usuário (operação lógica).
     *
     * @return Status 200 OK.
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }

    /**
     * Método auxiliar para preencher os dados comuns da classe Pai (Usuario/Pessoa).
     * Popula nome, CPF, nascimento, contatos e endereços a partir do DTO.
     *
     * @param usuario A instância da entidade (Profissional ou Recepcionista).
     * @param dados O DTO com os dados de entrada.
     */
    private void preencherDadosComuns(Usuario usuario, UsuarioCadastroDTO dados) {
        usuario.setNomeCompleto(dados.nomeCompleto());
        usuario.setCpf(dados.cpf());
        usuario.setDataNascimento(dados.dataNascimento());
        usuario.setEmail(dados.email());
        usuario.setSenha(dados.senha());
        usuario.setStatusAtivo(true);

        if (dados.telefone() != null && !dados.telefone().isBlank()) {
            Contato contato = new Contato();
            contato.setTelefone(dados.telefone());
            contato.setPessoa(usuario);
            usuario.addContato(contato);
        }

        if (dados.endereco() != null && !dados.endereco().isBlank()) {
            Endereco endereco = new Endereco();
            String[] infos = dados.endereco().split(",");

            if (infos.length > 0 && !infos[0].isBlank()) endereco.setLogradouro(infos[0].trim());
            if (infos.length > 1 && !infos[1].isBlank()) endereco.setNumero(infos[1].trim());
            if (infos.length > 2 && !infos[2].isBlank()) endereco.setBairro(infos[2].trim());
            
            if (endereco.getLogradouro() != null) {
                endereco.setPessoa(usuario);
                usuario.addEndereco(endereco);
            }
        }
    }
}