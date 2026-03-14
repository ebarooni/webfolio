FROM registry.access.redhat.com/ubi9/openjdk-21:1.23

ARG PROJECT_VERSION
ARG BUILD_DATE

ENV LANGUAGE='en_US:en'

LABEL org.opencontainers.image.title="webfolio"
LABEL org.opencontainers.image.description="Portfolio and blog website"
LABEL org.opencontainers.image.source="https://github.com/ebarooni/webfolio"
LABEL org.opencontainers.image.url="https://barooni.dev"
LABEL org.opencontainers.image.version="${PROJECT_VERSION}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.licenses="MIT"

# We make four distinct layers so if there are application changes the library layers can be re-used
COPY --chown=185 quarkus-app/lib/ /deployments/lib/
COPY --chown=185 quarkus-app/*.jar /deployments/
COPY --chown=185 quarkus-app/app/ /deployments/app/
COPY --chown=185 quarkus-app/quarkus/ /deployments/quarkus/

EXPOSE 8080
USER 185
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"

ENTRYPOINT [ "/opt/jboss/container/java/run/run-java.sh" ]
