"use client"

import Link from "next/link"
import React from "react"

export default function DefaultButton({ route, target="", rel="", className = "", children }) {
  return (
    <Link href={route || "/cotizar"} target={target} rel={rel} className={className || "btn-primary"}>
      {children || "Contáctanos"}
    </Link>
  )
}