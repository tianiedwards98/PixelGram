package com.cognizant.kpusercrud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class KpUserCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(KpUserCrudApplication.class, args);
	}

}
