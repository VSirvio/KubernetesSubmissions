FROM rust:1.87 AS build-stage

WORKDIR /build

RUN rustup target add x86_64-unknown-linux-musl

COPY Cargo.toml Cargo.toml
COPY src src

RUN cargo install --path . --target x86_64-unknown-linux-musl


FROM scratch

COPY --from=build-stage /usr/local/cargo/bin/todo-app /todo-app

CMD ["/todo-app"]
