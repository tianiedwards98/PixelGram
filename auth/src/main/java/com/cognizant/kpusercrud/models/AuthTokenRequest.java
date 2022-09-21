package com.cognizant.kpusercrud.models;

import java.util.Objects;


public class AuthTokenRequest {

    private String username;

    private String password;

    private String client_id;

    private String grant_type;

    public AuthTokenRequest() {}

    public AuthTokenRequest(String username, String password, String client_id, String grant_type) {
        this.username = username;
        this.password = password;
        this.client_id = client_id;
        this.grant_type = grant_type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public String getGrant_type() {
        return grant_type;
    }

    public void setGrant_type(String grant_type) {
        this.grant_type = grant_type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthTokenRequest that = (AuthTokenRequest) o;
        return Objects.equals(username, that.username) && Objects.equals(password, that.password) && Objects.equals(client_id, that.client_id) && Objects.equals(grant_type, that.grant_type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password, client_id, grant_type);
    }

    @Override
    public String toString() {
        return "AuthTokenRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", client_id='" + client_id + '\'' +
                ", grant_type='" + grant_type + '\'' +
                '}';
    }
}
