# Apartment House Application (Frontend)

## Gereksinimler

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/downloads)
- [Github SSH KEY](https://www.youtube.com/watch?v=YIDBZ8ZQ25g)

## Projenin Klonlanması

Backend, Frontend ve Database projelerinin hepsi docker üzerinden ortak olarak ayaklanmaktır.

Projenin yerel bilgisayarınıza klonlanması için aşağıdaki adımları izleyin:

>Dockerınızın çalıştığından emin olun.

>SSH keyinizin github üzerinde tanımlı olduğundan emin olun.

```sh
git clone git@github.com:mehmetcanyildiz/house-docker.git

cd house-docker

sh start.sh
```

## Ortamlar (Frontend)

 > Stage
 ```sh
http:://localhost:4299
```

 > Prod
 ```sh
https://apartment-house-application.vercel.app
```

 > Local
 ```sh
http:://localhost:4200
```

## Swagger

[Stage Swagger](http:://localhost:8099/swagger-ui/index.html)

  > Dockerda projeleri ayaklandırdığınız taktirde çalışacaktır.

[Prod Swagger](https://house-application-2c2abb3720c7.herokuapp.com/swagger-ui/index.html) 

  > Heroku üzerinden canlı ortam testi olarak ayaklandırılmıştır.

[Local Swagger](http:://localhost:8090/swagger-ui/index.html)

 > Manuel kurulum gerektirir.

## Postman

house (backend) projesinin içinde ```postman``` klasörünün altında collection ve envoriments olarak ulaşabilirsiniz.
