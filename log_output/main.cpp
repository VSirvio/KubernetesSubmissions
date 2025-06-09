// Requires C++20 or newer (e.g. GCC G++ version >= 13 with "-std=c++20" switch)

#include <chrono>
#include <csignal>
#include <format>
#include <iostream>
#include <random>
#include <string>
#include <thread>

void signalHandler(int signal)
{
    std::exit(EXIT_SUCCESS);
}

int main()
{
    const std::string CHARSET = "0123456789abcdef";
    const int LENGTH = 32;

    std::signal(SIGINT, signalHandler);
    std::signal(SIGTERM, signalHandler);

    auto now = std::chrono::system_clock::now();
    std::chrono::nanoseconds nanosecondsSinceEpoch = now.time_since_epoch();

    const auto seed = nanosecondsSinceEpoch.count();
    std::default_random_engine randomNumberEngine(seed);

    std::uniform_int_distribution<> pickRandomIndex(0, CHARSET.size() - 1);

    std::string randomString;
    for (int i = 0; i < LENGTH; i++)
        randomString += CHARSET[pickRandomIndex(randomNumberEngine)];

    while (true)
    {
        now = std::chrono::system_clock::now();

        std::cout << std::format("{:%FT%TZ}", now) << ": "
            << randomString << std::endl;

        std::this_thread::sleep_for(std::chrono::seconds(5));
    }
}
