package com.cognizant.kpusercrud.feign;

import com.cognizant.kpusercrud.models.AuthTokenRequest;
import com.cognizant.kpusercrud.models.KeycloakResponse;
import feign.form.spring.SpringFormEncoder;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "cheerios", url="https://enablement-keycloak.work.cognizant.studio/", path = "/", configuration = KeycloakFeignClient.Configuration.class)
public interface KeycloakFeignClient {

    @PostMapping(value = "/auth/realms/Enablement/protocol/openid-connect/token", consumes = "application/x-www-form-urlencoded")
    KeycloakResponse getAuthorizedToken(AuthTokenRequest request);

    class Configuration {
        @Bean
        SpringFormEncoder feignFormEncoder(ObjectFactory<HttpMessageConverters> converters) {
            return new SpringFormEncoder(new SpringEncoder(converters));
        }
    }
}
