"use client";

import { useParams } from "next/navigation";
import { BasicPageWrapper } from "../../components/BasicPageWrapper";
import { useFactories } from "../FactoriesContext";
import { useEffect } from "react";

export default function Mill() {
  const { mill } = useParams();
  const { factory, fetchFactoryByName, toggleFeatureState } = useFactories();

  useEffect(() => {
    if (mill) {
      fetchFactoryByName(mill as string);
    }
  }, [mill]);

  if (!factory) {
    return (
      <BasicPageWrapper title="Loading..." parent={{ path: "/", name: "all mills" }}>
        <p>Loading factory data...</p>
      </BasicPageWrapper>
    );
  }

  return (
    <BasicPageWrapper
      title={factory.name}
      parent={{ path: "/", name: "all mills" }}
    >
      <div>
        <ul>
          {factory.features.map((feature: any) => (
            <li key={feature.id} className="flex justify-between items-center border-b pb-3 pt-3">
              <h2>{feature.name}</h2>
              <label>
                <input
                  type="checkbox"
                  checked={feature.state}
                  onChange={() => toggleFeatureState(feature.id, feature.state)} // Togglaa ominaisuuden tila
                />
                {feature.state ? "On" : "Off"}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </BasicPageWrapper>
  );
}
