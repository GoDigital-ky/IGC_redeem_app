import React, { useState } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export default function GiftCardPortal({ user }) {
  const [couponCode, setCouponCode] = useState('');
  const [cardDetails, setCardDetails] = useState(null);
  const [redeemAmount, setRedeemAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const consumer_key = 'f3fece9060a4a85074ac06196dea31c9';
  const consumer_secret = 'd1884d1ea5fc9b466013bd6ab0719e15';

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCheckBalance = async () => {
    setMessage('');
    setLoading(true);
    setCardDetails(null);
    try {
      const response = await fetch('https://islandgiftcards.net/wp-json/api/v1/giftcard/coupon-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consumer_key,
          consumer_secret,
          coupon_code: couponCode,
        })
      });
      const data = await response.json();
      if (data.code === 'success') {
        setCardDetails(data);
      } else {
        setMessage(data.message || 'Invalid code.');
      }
    } catch (err) {
      setMessage('Error checking balance.');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async () => {
    setMessage('');
    setLoading(true);
    try {
      const response = await fetch('https://islandgiftcards.net/wp-json/api/v1/giftcard/redeem-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consumer_key,
          consumer_secret,
          coupon_code: couponCode,
          redeem_amount: Number(redeemAmount),
        })
      });
      const data = await response.json();
      if (data.code === 'success') {
        setCardDetails(data);
        setMessage('Redeemed successfully!');
      } else {
        setMessage(data.message || 'Redeem failed.');
      }
    } catch (err) {
      setMessage('Error redeeming gift card.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full bg-white p-6 rounded shadow text-center sm:max-w-md sm:p-8">
        <img src="/logo.png" alt="Island Gift Cards" className="mx-auto mb-6 h-14 sm:h-16 object-contain" />
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">Welcome, {user.email}</h1>
        <p className="text-sm text-gray-600 mb-6">Check balance & redeem your gift cards</p>

        <input
          type="text"
          className="w-full mb-3 px-4 py-3 border rounded text-sm"
          placeholder="Enter Gift Card Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          onClick={handleCheckBalance}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 mb-4 text-sm"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Balance'}
        </button>

        {cardDetails && (
          <div className="text-left text-sm bg-gray-50 p-4 rounded border mb-4">
            <p><strong>Remaining Amount:</strong> ${cardDetails.remaining_amount}</p>
            <p><strong>Usage Count:</strong> {cardDetails.usage_count} / {cardDetails.usage_limit}</p>
            <p><strong>Description:</strong> {cardDetails.description}</p>
            <p><strong>Expires:</strong> {cardDetails.coupon_expiry}</p>
          </div>
        )}

        {cardDetails && (
          <>
            <input
              type="number"
              className="w-full mb-3 px-4 py-3 border rounded text-sm"
              placeholder="Enter amount to redeem"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
            />
            <button
              onClick={handleRedeem}
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 text-sm"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Redeem'}
            </button>
          </>
        )}

        {message && <p className="text-sm mt-4 text-red-600">{message}</p>}

        <button
          onClick={handleLogout}
          className="mt-6 text-xs text-gray-500 underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
