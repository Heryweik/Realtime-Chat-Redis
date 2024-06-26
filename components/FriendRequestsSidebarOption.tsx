"use client";

import { pusherClient } from "@/lib/pusher";
import { cn, toPusherKey } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FriendRequestsSidebarOptionProps {
  sessionId: string;
  initialUnseenRequestsCount: number;
}

export default function FriendRequestsSidebarOption({
  initialUnseenRequestsCount,
  sessionId,
}: FriendRequestsSidebarOptionProps) {
  const pathname = usePathname();

  const [unseenRequestsCount, setUnseenRequestsCount] = useState<number>(
    initialUnseenRequestsCount
  );

  // Actualizamos la cantidad de solicitudes de amistad en tiempo real
  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    )
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))

    const friendRequestHandler = () => {
      setUnseenRequestsCount((prev) => prev + 1)
    }

    const addedFriendHandler = () => {
      setUnseenRequestsCount((prev) => prev - 1)
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler)
    pusherClient.bind('new_friend', addedFriendHandler)

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      )
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))

      pusherClient.unbind('new_friend', addedFriendHandler)
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
    }
  }, [sessionId])

  return (
    <>
    <Link
      href={"/dashboard/requests"}
      className={cn(
        "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hidden md:flex",
        pathname === "/dashboard/requests" ? "bg-gray-50 text-indigo-600" : ""
      )}
    >
      <div
        className={cn(
          "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white",
          pathname === "/dashboard/requests"
            ? "border-indigo-600 text-indigo-600"
            : ""
        )}
      >
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests</p>

      {unseenRequestsCount > 0 && (
        /* <span className='text-xs font-semibold leading-6 text-indigo-600 bg-indigo-100 rounded-full px-2'>
                {unseenRequestsCount}
            </span> */
        <div className="rounded-full w-5 h-5 text-sm flex justify-center items-center text-white bg-indigo-600">
          {unseenRequestsCount}
        </div>
      )}
    </Link>

    <a
      href={"/dashboard/requests"}
      className={cn(
        "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex md:hidden items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ",
        pathname === "/dashboard/requests" ? "bg-gray-50 text-indigo-600" : ""
      )}
    >
      <div
        className={cn(
          "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white",
          pathname === "/dashboard/requests"
            ? "border-indigo-600 text-indigo-600"
            : ""
        )}
      >
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests</p>

      {unseenRequestsCount > 0 && (
        /* <span className='text-xs font-semibold leading-6 text-indigo-600 bg-indigo-100 rounded-full px-2'>
                {unseenRequestsCount}
            </span> */
        <div className="rounded-full w-5 h-5 text-sm flex justify-center items-center text-white bg-indigo-600">
          {unseenRequestsCount}
        </div>
      )}
    </a>
    
    </>
  );
}
