package com.cognizant.kpusercrud.models;

import java.util.Objects;

public class Credentials {
    private final String type = "password";
    private String value;
    private final Boolean temporary = false;

    public Credentials() {
    }

    public Credentials(String value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }



    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean getTemporary() {
        return temporary;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Credentials that = (Credentials) o;
        return Objects.equals(type, that.type) && Objects.equals(value, that.value) && Objects.equals(temporary, that.temporary);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, value, temporary);
    }

    @Override
    public String toString() {
        return "Credentials{" +
                "type='" + type + '\'' +
                ", value='" + value + '\'' +
                ", temporary=" + temporary +
                '}';
    }
}
