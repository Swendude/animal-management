"use client";
import { useEffect, useState } from "react";
import { Animal, AnimalValidator } from "@/lib/validators";
import { z } from "zod";
import { DataTable } from "@/components/animalTable/data-table";
import { columns } from "@/components/animalTable/columns";

export default function TablePage() {
  const [animals, setAnimals] = useState<Animal[] | null>(null);

  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch(
        "https://reader.mindmingle.nl/api/exercises/react/animals"
      );
      if (response.ok) {
        const parsed = z
          .array(AnimalValidator)
          .safeParse(await response.json());
        if (parsed.success) {
          setAnimals(parsed.data);
        } else {
          alert("We received wrong data from the API");
          console.log(parsed.error.flatten());
        }
      } else {
        alert(`Problem with HTTP request, status:${response.status}`);
      }
    };
    getAnimals();
  }, []);

  if (animals === null) {
    return (
      <main className="grid place-content-center h-screen ">
        <p className="font-bold aimate-bounce">Loading...</p>
      </main>
    );
  }

  return (
    <main className="w-screen">
      <h1 className="bg-dark m-5 p-5 text-lg font-bold underline">
        👋 Hello Table
      </h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={animals} />
      </div>
    </main>
  );
}
