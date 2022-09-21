package com.cognizant.kpusercrud.models;

import java.util.List;
import java.util.Objects;

public class RegistrationRequest {
    private  String username;
    private final Boolean enabled = true;
    private List<Credentials> credentials;

    public RegistrationRequest(String username, List<Credentials> credentials) {
        this.username = username;
        this.credentials = credentials;
    }

    public RegistrationRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public List<Credentials> getCredentials() {
        return credentials;
    }

    public void setCredentials(List<Credentials> credentials) {
        this.credentials = credentials;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegistrationRequest that = (RegistrationRequest) o;
        return Objects.equals(username, that.username) && Objects.equals(enabled, that.enabled) && Objects.equals(credentials, that.credentials);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, enabled, credentials);
    }

    @Override
    public String toString() {
        return "RegistrationRequest{" +
                "username='" + username + '\'' +
                ", enabled=" + enabled +
                ", credentials=" + credentials +
                '}';
    }
}
