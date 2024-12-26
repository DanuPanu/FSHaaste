"use client"

import { useState } from "react";
import { useFactories } from "../FactoriesContext";
import { BasicPageWrapper } from "../../components/BasicPageWrapper";

export default function AddFactoryPage() {
  const {addFactory, error, loading } = useFactories(); // Hakee addFactory-kontextista
  const [factoryName, setFactoryName] = useState("");
  const [featureName, setFeatureName] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const handleFactoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFactoryName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFactory(factoryName, features);
    setFactoryName(""); 
    setFeatures([]);  // Tyhjennetään ominaisuudet lähetyksen jälkeen
  };

  const handleAddFeature = () => {
    if (featureName.trim()) {
      // Lisää ominaisuuden listaan
      setFeatures((prevFeatures) => [...prevFeatures, featureName]);
      setFeatureName(""); // Tyhjennetään kenttä
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures((prevFeatures) =>
      prevFeatures.filter((feature) => feature !== featureToRemove)
    );
  };

  return (
    <BasicPageWrapper title="New Factory">
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="factoryName">Factory Name:</label>
          <input
            className="border p-1 ml-5"
            id="factoryName"
            type="text"
            value={factoryName}
            onChange={handleFactoryNameChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="featureName">Feature Name:</label>
          <input
            className="border p-1 ml-5"
            id="featureName"
            type="text"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
          />
          <button
            className="ml-3"
            type="button"
            onClick={handleAddFeature}
            disabled={loading || !featureName.trim()}
          >
            Add Feature
          </button>
        </div>

        {features.length > 0 && (
          <div>
            <h3 className="mb-1">Features:</h3>
            <ul>
              {features.map((feature, index) => (
                <li className="mb-1" key={index}>
                  {feature}
                  <button
                    className="ml-5"
                    type="button"
                    onClick={() => removeFeature(feature)}
                  >
                    Remove feature
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button className="mt-10" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Factory"}
        </button>
      </form>
    </div>
    </BasicPageWrapper>
  );
}
