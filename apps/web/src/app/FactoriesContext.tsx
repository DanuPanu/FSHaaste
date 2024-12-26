"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

const FactoriesContext = createContext<{
  factories: any[];
  factory: any | null;
  fetchFactoryByName: (name: string) => Promise<void>;
  toggleFeatureState: (featureId: number, currentState: boolean) => Promise<void>;
  addFactory: (name: string, features: string[]) => Promise<void>;
  loading: boolean; 
  error: string;
}>({
  factories: [],
  factory: null,
  fetchFactoryByName: async () => {},
  toggleFeatureState: async () => {},
  addFactory: async () => {},
  loading: false, 
  error: "",
});

export const useFactories = () => {
  return useContext(FactoriesContext);
};

export const FactoriesProvider = ({ children }: { children: ReactNode }) => {
  const [factories, setFactories] = useState<any[]>([]);
  const [factory, setFactory] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001");
        const data = await res.json();
        setFactories(data);
      } catch (error) {
        console.error("Error fetching factories:", error);
      }
    };

    fetchFactories();
  }, []);

  const fetchFactoryByName = async (name: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001"}/${name}`
      );
      const data = await res.json();
      setFactory(data);
    } catch (error) {
      console.error("Error fetching factory:", error);
    }
  };

  const toggleFeatureState = async (featureId: number, currentState: boolean) => {
    try {
      const res = await fetch(`http://localhost:3001/features/${featureId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: !currentState }), // Lähetetään uusi tila
      });
  
      if (res.ok) {
        const updatedFeature = await res.json();
        console.log("Updated feature:", updatedFeature);
  
        // Päivitetään factory state
        setFactory((prevFactory: any) => {
          if (!prevFactory) return prevFactory;
  
          const updatedFeatures = prevFactory.features.map((feature: any) =>
            feature.id === featureId ? updatedFeature : feature
          );
  
          console.log("Updated features array:", updatedFeatures);
  
          return {
            ...prevFactory,
            features: updatedFeatures,
          };
        });
      } else {
        console.error("Failed to update feature state");
      }
    } catch (error) {
      console.error("Error toggling feature state:", error);
    }
  };
  
  // Lisätään uusi tehdas
  const addFactory = async (name: string, features: string[]) => {
    if (!name || features.length === 0) {
      setError("Factory name and at least one feature are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/factories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, features }),
      });

      if (res.ok) {
        const newFactory = await res.json();
        alert("Factory added successfully!");
        setFactories((prevFactories) => [...prevFactories, newFactory]);
        setFeatures([]); // Tyhjennetään ominaisuudet
      } else {
        const errorData = await res.json();
        console.error("API Error: ", errorData);
        setError("Failed to add factory");
      }
    } catch (error) {
      console.error("Error occurred while adding factory:", error);
      setError("Error occurred while adding factory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FactoriesContext.Provider
      value={{
        factories,
        factory,
        fetchFactoryByName,
        toggleFeatureState,
        addFactory,
        error,
        loading,
      }}
    >
      {children}
    </FactoriesContext.Provider>
  );
};
