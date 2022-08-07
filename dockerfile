FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ADD target/ds_group_13-0.0.1-SNAPSHOT.jar ds_group_13-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/ds_group_13-0.0.1-SNAPSHOT.jar"]