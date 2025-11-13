import { useEffect, useState } from "react";
import { apiService } from "../../services/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const [cart, setCart] = useState<any>(null);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [addressMode, setAddressMode] = useState<"saved" | "new">("saved");

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
  });

  const [selectedSavedAddress, setSelectedSavedAddress] = useState<any>(null);

  const navigate = useNavigate();

  /* ---------------- FETCH CART + USER ADDRESSES ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const cartRes = await apiService.get("/api/cart");
        setCart(cartRes);

        const userRes = await apiService.get("/api/user/profile");
        const addrs = userRes.user.addresses || [];

        setSavedAddresses(addrs);

        // Pick default address automatically
        const defaultAddr = addrs.find((a: any) => a.isDefault);
        if (defaultAddr) setSelectedSavedAddress(defaultAddr);
      } catch {
        toast.error("Failed to load checkout data");
      }
    })();
  }, []);

  if (!cart)
    return <div className="pt-20 text-center">Loading checkout...</div>;

  const total = cart.totalCost + 15;

  /* ---------------- HANDLE PAYMENT ---------------- */
  const handlePayment = async () => {
    let shippingAddress = null;

    if (addressMode === "saved") {
      if (!selectedSavedAddress) return toast.error("Select a saved address");
      shippingAddress = selectedSavedAddress;
    } else {
      // Validate new address
      if (!newAddress.fullName || !newAddress.phone || !newAddress.street)
        return toast.error("Enter all required address fields");

      shippingAddress = newAddress;
    }

    try {
      const pay = await apiService.post("/api/order/pay", { amount: total });

      if (pay.status === "success") {
        const order = await apiService.post("/api/order/create", {
          address: shippingAddress,
        });

        toast.success("Order placed!");
        navigate(`/order/success/${order.order._id}`);
      }
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* ---------------- ADDRESS SECTION ---------------- */}
      <div className="bg-white p-6 rounded-xl shadow border mb-6">
        <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

        {/* Option Selector */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={addressMode === "saved"}
              onChange={() => setAddressMode("saved")}
            />
            Deliver to Saved Address
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={addressMode === "new"}
              onChange={() => setAddressMode("new")}
            />
            Deliver to Another Address
          </label>
        </div>

        {/* ---------------- SAVED ADDRESS LIST ---------------- */}
        {addressMode === "saved" && (
          <div className="space-y-3">
            {savedAddresses.length === 0 && (
              <p className="text-gray-500">No saved addresses found.</p>
            )}

            {savedAddresses.map((addr: any, index: number) => (
              <div
                key={index}
                className={`p-4 border rounded-xl cursor-pointer ${
                  selectedSavedAddress === addr
                    ? "border-primary_green bg-primary_green/10"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedSavedAddress(addr)}
              >
                <p className="font-semibold">{addr.fullName}</p>
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state}</p>
                <p>{addr.country} - {addr.postalCode}</p>
                <p>Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        )}

        {/* ---------------- NEW ADDRESS FORM ---------------- */}
        {addressMode === "new" && (
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              onChange={(e) =>
                setNewAddress({ ...newAddress, fullName: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
            />
            <Input
              placeholder="Pincode"
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
            />

            <Input
              placeholder="City"
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />
            <Input
              placeholder="State"
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
            />

            <Input
              className="col-span-2"
              placeholder="Street Address"
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
            />

            <Input
              className="col-span-2"
              placeholder="Landmark (optional)"
              onChange={(e) =>
                setNewAddress({ ...newAddress, landmark: e.target.value })
              }
            />
          </div>
        )}
      </div>

      {/* ---------------- PAYMENT SUMMARY ---------------- */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-4">Order Total</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₣{cart.totalCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>₣15</span>
        </div>

        <div className="flex justify-between mb-4 font-bold">
          <span>Total</span>
          <span>₣{total.toFixed(2)}</span>
        </div>

        <Button className="w-full bg-primary_green" onClick={handlePayment}>
          Pay Now
        </Button>
      </div>
    </div>
  );
}
