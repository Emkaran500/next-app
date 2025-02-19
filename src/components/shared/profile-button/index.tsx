"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileButton() {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <Button>
          <Link href="/auth/signin">Sign in </Link>
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={
                session.user?.image ??
                "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
              }
              alt={session.user?.name ?? "user"}
            />
            <AvatarFallback>
              {session.user?.name?.[0]?.toUpperCase() ?? "user"}
            </AvatarFallback>
          </Avatar>
          <Button variant="destructive" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      )}
    </>
  );
}