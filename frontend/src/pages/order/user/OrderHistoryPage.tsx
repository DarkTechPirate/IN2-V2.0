import { useEffect, useState } from "react";
import { apiService } from "../../../services/api";
import { getImageUrl } from "../../../utils/imageUrl";

export function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiService.get("/api/order/my").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="pt-20 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order: any) => (
        <div key={order._id} className="bg-white rounded-xl p-4 mb-4 shadow border">
          <p className="font-semibold">Order #{order._id}</p>
          <p>Status: {order.status}</p>
          <p>Amount: ₣{order.totalAmount}</p>

          {order.items.map((item: any) => (
            <div className="flex gap-4 mt-3" key={item.product._id}>
              <img
                src={getImageUrl(item.product.image)}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p>{item.product.name}</p>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
