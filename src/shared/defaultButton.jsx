"use client"

import Link from "next/link"
import React from "react"

export default function DefaultButton({ route, target="", rel="", className = "", children, action }) {
  return (
    <Link href={route || "/cotizar"} target={target} rel={rel} className={className || "btn-primary"} area-label="default-button" onClick={action}>
      {children || "Contáctanos"}
    </Link>
  )
}