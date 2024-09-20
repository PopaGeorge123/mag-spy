import { getCurrentUser } from "@/libs/API/user";
import { useState, useEffect } from "react";
import OwnButtonCheckout from "@/components/OwnButtonCheckout";
import config from "@/config";

export default function UpgradeButton() {
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    async function getUserState() {
      const dataAboutUser = await getCurrentUser();
      setHasAccess(dataAboutUser.hasAccess);
    }
    getUserState();
  });


  return (
    <div className="ml-auto">
      {!hasAccess && (
        // <button className="m-auto">Click me</button>
        <OwnButtonCheckout priceId={config.stripe.plans[1].priceId}/>
      )}
    </div>
  );
}
