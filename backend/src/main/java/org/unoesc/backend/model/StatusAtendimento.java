package org.unoesc.backend.model;

/**
 * Enumeração que define os possíveis estados de um atendimento clínico.
 * Utilizado para controlar o fluxo do paciente desde a chegada até a finalização.
 *
 * @author Equipe Vitalys
 * @version 1.0
 */
public enum StatusAtendimento {
    AGUARDANDO("Aguardando"),
    EM_ATENDIMENTO("Em Atendimento"),
    FINALIZADO("Finalizado");

    public final String status;

    private StatusAtendimento(String status) {
        this.status = status;
    }

    /**
     * Retorna a descrição textual do status.
     * @return String representando o status.
     */
    public String getStatus() {
        return status;
    }
}
