"use client";
import { TimeBlockFormState } from "@/types/time-block.types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TimeBlockingForm } from "./form/TimeBlockingForm";
import { TimeBlockingList } from "./TimeBlockList";

export function TimeBlocking() {
  const methods = useForm<TimeBlockFormState>();
  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-2 gap-12">
        <TimeBlockingList />
        <TimeBlockingForm />
      </div>
    </FormProvider>
  );
}
