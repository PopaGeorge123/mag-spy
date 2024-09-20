"use client";

import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function FreePlanAlert({forWhat}) {
  useEffect(() => {
    const alertShown = localStorage.getItem('alertShown');
    const alertTimestamp = localStorage.getItem('alertTimestamp');
    const now = Date.now();

    // Check if alertShown exists and if it has expired
    if (!alertShown || (now - alertTimestamp) > 30 * 1000) { // 30 * 1000 = half a minute in milliseconds
      if (forWhat === 'product') toast.error("You have reached the limit of 1 product for the free plan. Please upgrade to add more products.");
      else if (forWhat === 'alert') toast.error("You have reached the limit of 1 alert for the free plan. Please upgrade to add more alerts.");
      
      localStorage.setItem('alertShown', 'true');
      localStorage.setItem('alertTimestamp', now);
    }
  }, []);

  return null;
}
