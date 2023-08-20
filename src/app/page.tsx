"use client";
import { Animal, AnimalValidator } from "@/lib/validators";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

export default function Home() {
  const [animals, setAnimals] = useState<Animal[] | null>(null);
  const { toast } = useToast();
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
        👋 Hello Animals
      </h1>
      <div className="grid grid-cols-4 gap-5 p-5 m-5">
        {animals.map((animal) => {
          return (
            <TooltipProvider key={animal.id} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger>
                  <Card
                    onClick={() =>
                      toast({
                        description: `Clicked on ${animal.name}`,
                      })
                    }
                    className="hover:scale-105 duration-300 ease-in-out hover:bg-secondary"
                  >
                    <CardHeader>
                      <CardTitle>
                        <h2>{animal.name}</h2>
                      </CardTitle>
                    </CardHeader>
                    <div className="relative h-64">
                      <Image
                        src={animal.imgUrl}
                        fill={true}
                        alt="animal"
                        className="object-contain"
                      />
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Give some love to {animal.name}!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </main>
  );
}
