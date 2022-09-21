package com.cognizant.kpusercrud.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class LogoutRequest {
    @JsonProperty(value = "client_id")
    private String clientId;
    private String token;

    public LogoutRequest(String clientId, String token) {
        this.clientId = clientId;
        this.token = token;
    }

    public LogoutRequest() {
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LogoutRequest that = (LogoutRequest) o;
        return Objects.equals(clientId, that.clientId) && Objects.equals(token, that.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientId, token);
    }

    @Override
    public String toString() {
        return "LogoutRequest{" +
                "clientId='" + clientId + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
