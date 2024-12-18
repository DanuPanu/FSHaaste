"use client";

import { useParams } from "next/navigation";
import { BasicPageWrapper } from "../../components/BasicPageWrapper";

export default function Mill() {
  const { mill } = useParams();

  return (
    <BasicPageWrapper
      title={mill as string}
      parent={{ path: "/", name: "all mills" }}
    >
      {/* You can replace the title withthe actual mill name stored in the database
      or format the title to be more readable */}
      <div className="text-gray-500">List pumps here</div>
    </BasicPageWrapper>
  );
}
