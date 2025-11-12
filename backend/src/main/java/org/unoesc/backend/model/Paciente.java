package org.unoesc.backend.model;

import jakarta.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name = "idPessoa")
public class Paciente extends Pessoa{
}
