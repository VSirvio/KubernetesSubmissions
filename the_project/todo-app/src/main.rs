use axum::{routing::get, response::{Html, IntoResponse, Response}, Router};
use std::env;
use tokio::net::TcpListener;
use tokio::signal::{self, unix::{SignalKind, signal}};

#[tokio::main]
async fn main() {
	let port = env::var("PORT").unwrap_or("3000".to_string());
	let addr = format!("0.0.0.0:{}", port);
	let listener = TcpListener::bind(addr).await.unwrap();

	let app = Router::new().route("/", get(test_route));

	println!("Server started in port {}", port);
	axum::serve(listener, app)
		.with_graceful_shutdown(shutdown_signal())
		.await
		.unwrap();
}

async fn shutdown_signal() {
	let ctrl_c = async {
		signal::ctrl_c()
			.await
			.expect("Failed to install Ctrl+C handler");
	};

	let terminate = async {
		signal(SignalKind::terminate())
			.expect("Failed to install SIGTERM handler")
			.recv()
			.await;
	};

	tokio::select! {
		_ = ctrl_c => {},
		_ = terminate => {},
	}
}

async fn test_route() -> Response {
	Html("<h1>Hello world!</h1>").into_response()
}
