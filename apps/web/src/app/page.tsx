"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { BasicPageWrapper } from "../components/BasicPageWrapper";
import Link from "next/link";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  return (
    <BasicPageWrapper title="Home">
      <div className="text-gray-500">
        List mills here{" "}
        <Link className="text-blue-500" href="/example_mill">
          Link to example mill
        </Link>
      </div>
    </BasicPageWrapper>
  );
}
