import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { features } from "process";
import React from "react";
import CheckoutButton from "./CheckoutButton";

const tiers = [
  {
    name: "Starter",
    id: null,
    herf: "#",
    priceMonthly: null,
    description: "Get chatting right away with anyone,any more",
    features: [
      "20 Message chat Limit in Chats",
      "2 Participant limit in Chat",
      "3 chat Romms limit",
      "support 2 languages",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    herf: "#",
    priceMonthly: "5$",
    description: "Unlock the full Potential with Pro!",
    features: [
      "Unlimirted Messages in Chats",
      "Unlimited Participients in Chats",
      "Unlimited Chat Rooms",
      "Support Up to 10 Languages",
      "Mulitmedia support in chat {coming soon}",
      "1-hour , dedicated support response time",
      "Early access to new Features",
    ],
  },
];

export default function PricingCards({ redirect }: { redirect: boolean }) {
  return (
    <div>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 mt-10  mb-10">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-grey-900/10 sm:p-10"
          >
            <div>
              <h3
                className="text-base font-semibold leading-7 text-indigo-500"
                id={tier.id + tier.name}
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-x-2">
                {tier?.priceMonthly ? (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-blue-900">
                      {tier?.priceMonthly}
                    </span>
                    <span className="text-base font-semibold leading-7 text-black">
                      /month
                    </span>
                  </>
                ) : (
                  <span className="text-5xl font-bold tracking-tight text-green-900">
                    Free
                  </span>
                )}
              </div>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {tier.description}

              </p>
              <ul
              role="list"
              className="mt-10 space-y-4 text-sm leading-6 text-black ">
              {
                tier?.features.map((feature)=>(
                <li key={feature}
                className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-indigo-500"
                        aria-hidden="true"/>
                        {feature} 
                </li>
              ))}
              </ul>
            </div>
            {redirect ? (
                <Link
                className="mt-8 block rounded-md bg-indigo-500 px-3 py-2 text-center  text-sm font-semibold leading-7 text-white hover:bg-indigo-200 focus-visible:outline-2 focus-visible:outline-offset-2  cursor-pointer disabled:opacity-80"
                href="/register">
                    Get Started Today
                </Link>

            ) :(
                tier.id && <CheckoutButton/>
            ) }
          </div>
        ))}

      </div>
    </div>
  );
}
