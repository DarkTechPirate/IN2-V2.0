export const mockPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    setTimeout(() => {
      return res.status(200).json({
        message: "Payment Successful",
        transactionId: "TXN-" + Date.now(),
        status: "success"
      });
    }, 1500);

  } catch (err) {
    console.error("Payment Error:", err);
    return res.status(500).json({ message: "Payment failed" });
  }
};
