export function InfoCard({ title, value, icon, children }) {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      <p>{value} {icon}</p>
      
      {children}
    </div>
  );
}