"use client"

import { useState, useTransition } from "react"

import { signOut } from "next-auth/react"

import deleteProfile from "@/utils/actions/deleteProfile"

export default function DeleteProfileButton({
  userEmail,
}: {
  userEmail: string | null | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)

  const [pending, startTransition] = useTransition()
  return userEmail ? (
    <>
      <button
        className="text-red-600 fluid-base border rounded-xl p-2 my-4 border-red-700"
        onClick={() => setIsOpen(true)}
      >
        Delete profile
      </button>

      {isOpen ? (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-bgPrimary m-auto p-8 rounded-lg drop-shadow-md max-w-[95%] text-textPrimary">
            <div className="flex flex-col gap-4 items-center">
              <h3 className="fluid-lg">
                Your preferences, cart and favorites will be permanently
                deleted. Proceed?
              </h3>
              <div className="flex gap-4 items-stretch">
                <button
                  className="bg-red-600 text-gray-100 rounded-lg p-2"
                  onClick={() => {
                    startTransition(() => {
                      deleteProfile(userEmail)
                    })
                    signOut()
                    setIsOpen(false)
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-600 rounded-lg text-gray-100 p-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  ) : null
}
