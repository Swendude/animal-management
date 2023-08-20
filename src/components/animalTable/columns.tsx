"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Animal } from "@/lib/validators";
import { CheckSquare, XSquare } from "lucide-react";

const animalKindToEmoji = (kind: Animal["kind"]) => {
  switch (kind) {
    case "cow":
      return "🐄";
    case "chicken":
      return "🐓";
    case "pig":
      return "🐖";
    case "sheep":
      return "🐑";
  }
};

export const columns: ColumnDef<Animal>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Name</div>,
    cell: ({ row }) => {
      return <h2>{row.getValue("name")}</h2>;
    },
  },
  {
    accessorKey: "kind",
    header: "Kind",
    cell: ({ row }) => {
      return <p>{animalKindToEmoji(row.getValue("kind"))}</p>;
    },
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => {
      return <p>{row.getValue("age")} years old</p>;
    },
  },
  {
    accessorKey: "hasBeenFed",
    header: "Fed?",
    cell: ({ row }) =>
      row.getValue("hasBeenFed") ? (
        <CheckSquare className="text-green-700" />
      ) : (
        <XSquare className="text-red-700" />
      ),
  },
];
