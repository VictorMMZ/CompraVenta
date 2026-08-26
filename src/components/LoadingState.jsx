import "../assets/css/loading-state.css";

export function LoadingState({ message = "Cargando..." }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
