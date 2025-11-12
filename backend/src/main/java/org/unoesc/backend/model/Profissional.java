package org.unoesc.backend.model;

import jakarta.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name = "idPessoa")
public class Profissional extends Pessoa{
}
