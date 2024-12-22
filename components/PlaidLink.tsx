'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        const data = await createLinkToken(user);
        setToken(data?.linkToken || "");
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };

    getLinkToken(); // Ensure function is called
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      try {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push("/"); // Redirect to the desired path
      } catch (error) {
        console.error("Error exchanging public token:", error);
      }
    },
    [user, router]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect Bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button variant='ghost' onClick={() => open()} className="plaidLink-ghost">
           <Image src='/icons/connect-bank.svg' alt="connect bank" width={24} height={24} />
           <p className="hidden xl:block text-[16px] font-semibold text-black-2">Connect Bank</p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidLink-default mr-[2.5rem]">
          <Image src='/icons/connect-bank.svg' alt="connect bank" width={20} height={20} />
          <p className="text-[12px] font-semibold text-black-2">Connect Bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
