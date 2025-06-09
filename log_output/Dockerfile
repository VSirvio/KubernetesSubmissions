FROM gcc:15 AS build-stage

WORKDIR /build

COPY main.cpp .

RUN g++ -std=c++20 -static -o log_output main.cpp


FROM scratch

COPY --from=build-stage /build/log_output /

CMD ["/log_output"]
