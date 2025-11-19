package org.unoesc.backend.controller;

import org.unoesc.backend.dto.LoginRequestDTO;
import org.unoesc.backend.dto.LoginResponseDTO;
import org.unoesc.backend.dto.UsuarioCadastroDTO;
import org.unoesc.backend.model.*;
import org.unoesc.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired private RecepcionistaRepository recepcionistaRepository;
    @Autowired private ProfissionalRepository profissionalRepository;
    @Autowired private EspecialidadeRepository especialidadeRepository;
    @Autowired private UsuarioRepository usuarioRepository; // Para verificar email duplicado

    @PostMapping("/cadastro")
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody UsuarioCadastroDTO dados) {

        System.out.println(dados);

        // 1. Validações Básicas (Duplicidade)
        if (usuarioRepository.findByEmail(dados.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já cadastrado.");
        }
        // (Idealmente verificar CPF duplicado também aqui)

        Usuario novoUsuario = null;

        // 2. Lógica para PROFISSIONAL
        if ("PROFISSIONAL".equalsIgnoreCase(dados.tipoUsuario())) {
            if (dados.especialidadeId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID da Especialidade é obrigatório para profissionais.");
            }

            Especialidade especialidade = especialidadeRepository.findById(dados.especialidadeId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Especialidade não encontrada."));

            Profissional prof = new Profissional();
            prof.setEspecialidade(especialidade);
            // Configura os dados comuns (veja abaixo)
            preencherDadosComuns(prof, dados);

            novoUsuario = profissionalRepository.save(prof);

        }
        // 3. Lógica para RECEPCIONISTA
        else if ("RECEPCIONISTA".equalsIgnoreCase(dados.tipoUsuario())) {
            Recepcionista recep = new Recepcionista();
            // Configura os dados comuns
            preencherDadosComuns(recep, dados);

            novoUsuario = recepcionistaRepository.save(recep);
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de usuário inválido. Use PROFISSIONAL ou RECEPCIONISTA.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDTO loginRequest) {

        // 1. Buscar usuário pelo E-mail
        // O findByEmail vai buscar na tabela 'usuario' e, graças ao JOINED,
        // o JPA já traz os dados se ele for Profissional ou Recepcionista.
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.email())
                .orElse(null);

        // 2. Verificações Básicas
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail não encontrado.");
        }

        // (Nota: Em produção usaríamos BCrypt para comparar hash, mas para o MVP texto puro funciona)
        if (!usuario.getSenha().equals(loginRequest.senha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
        }

        if (!usuario.getStatusAtivo()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário inativo no sistema.");
        }

        // 3. Identificar o Tipo de Usuário (Polimorfismo)
        String tipoUsuario = "USUARIO";

        if (usuario instanceof Profissional) {
            tipoUsuario = "PROFISSIONAL";
        } else if (usuario instanceof Recepcionista) {
            tipoUsuario = "RECEPCIONISTA";
        }

        // 4. Montar a resposta de sucesso
        LoginResponseDTO response = new LoginResponseDTO(
                usuario.getIdPessoa(), // Lembra que o ID é herdado de Pessoa
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                tipoUsuario,
                "dummy-token-123456" // Token falso por enquanto (para MVP)
        );

        return ResponseEntity.ok(response);
    }

    /**
     * RF-002: Logout
     * Como nossa autenticação por enquanto é "stateless" (não criamos sessão no servidor),
     * o logout é apenas uma ação no Frontend (apagar o usuário da memória).
     * Mas deixamos o endpoint aqui para cumprir o requisito formalmente.
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok().build();
    }

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


            if (infos.length > 0 && !infos[0].isBlank()) {
                endereco.setLogradouro(infos[0].trim());
            }
            if (infos.length > 1 && !infos[1].isBlank()) {
                endereco.setNumero(infos[1].trim()); // Ex: "123 B" ou "S/N"
            }
            if (infos.length > 2 && !infos[2].isBlank()) {
                endereco.setBairro(infos[2].trim());
            }
            if (endereco.getLogradouro() != null) {
                endereco.setPessoa(usuario);
                usuario.addEndereco(endereco);
            }
        }
    }
}