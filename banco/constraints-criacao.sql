alter table if exists internacao
    add constraint UKocmc0h88gh6123b4445h3r9ro unique (id_atendimento);

alter table if exists pessoa
    add constraint UKnlwiu48rutiltbnjle59krljo unique (cpf);

alter table if exists anotacao_medica
    add constraint FKmy211u4j265m1pd6ljb5ggdv1
    foreign key (id_atendimento)
    references atendimento;

alter table if exists anotacao_medica
    add constraint FK71uus12fx9mvm4xolagmdg7tx
    foreign key (id_departamento)
    references departamento;

alter table if exists atendimento
    add constraint FK4r3owlaip8iqtobownlys4br4
    foreign key (departamento_id_departamento)
    references departamento;

alter table if exists atendimento
    add constraint FK5gu04edb49md9jhsqpl4nfnl2
    foreign key (paciente_id_pessoa)
    references paciente;

alter table if exists atendimento
    add constraint FKbqb87ghwqlufes7ti1k6ed5d0
    foreign key (profissional_id_pessoa)
    references profissional;

alter table if exists atendimento
    add constraint FKes0np7wddnh23avlcvmbq8t37
    foreign key (recepcionista_id_pessoa)
    references recepcionista;

alter table if exists contato
    add constraint FK2h6l5bma9cyyjy8ytvky10n1c
    foreign key (id_pessoa)
    references pessoa;

alter table if exists endereco
    add constraint FK36sv4vy3hi3flqeiswatu14sl
    foreign key (id_pessoa)
    references pessoa;

alter table if exists evolucao_internacao
    add constraint FKrt8yn38mc9gkhamr9qfxhltpl
    foreign key (id_internacao)
    references internacao;

alter table if exists evolucao_internacao
    add constraint FKa8am1thv7meu72l9mtf2wkrh6
    foreign key (id_profissional)
    references profissional;

alter table if exists internacao
    add constraint FKdg7ruukdllhqass6u6dtt4s1r
    foreign key (id_atendimento)
    references atendimento;

alter table if exists internacao
    add constraint FKrxb4xru8b4sx6wdnu8k4ixml1
    foreign key (id_departamento)
    references departamento;

alter table if exists internacao
    add constraint FKh7kefbg0n34fxe8sqy7xdcqgn
    foreign key (id_paciente)
    references paciente;

alter table if exists internacao
    add constraint FK9y1vfbqkxk1sqvxuqtr1ut5be
    foreign key (id_profissional)
    references profissional;

alter table if exists paciente
    add constraint FKr7gw7jr8c8fcg5cdjugjpkp8k
    foreign key (id_pessoa)
    references pessoa;

alter table if exists profissional
    add constraint FK9jmru38aluh6fbwidvxrnqmn2
    foreign key (id_especialidade)
    references especialidade;

alter table if exists profissional
    add constraint FKcj0lj8t351515u94xi7ni7dhj
    foreign key (id_pessoa)
    references usuario;

alter table if exists recepcionista
    add constraint FKifxqecgem932htet0ofdwj6es
    foreign key (id_pessoa)
    references usuario;

alter table if exists usuario
    add constraint FKihpr6fsj9vxc6aqg9seaicql6
    foreign key (id_pessoa)
    references pessoa;