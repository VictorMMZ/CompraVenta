export function CartItem({ item, onRemove }) {
  const handleRemove = () => {
    onRemove(item);
  };

  return (
    <div className="cart-item">
      <span>{item}</span>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}
