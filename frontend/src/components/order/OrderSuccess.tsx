import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";

export function OrderSuccessPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="pt-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Order ID: {orderId}</p>

      <Button
        className="mt-6 bg-primary_green"
        onClick={() => navigate("/orders")}
      >
        View My Orders
      </Button>
    </div>
  );
}
