import { TimeBlockFormState } from "@/types/time-block.types";
import React from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { useUpdateTimeBlock } from "./useUpdateTimeBlock";
import { useCreateTimeBlock } from "./useCreateTimeBlock";
import { COLORS } from "./colors.data";
import { Field } from "@/components/ui/fields/Field";
import { SingleSelect } from "@/components/ui/SingleSelect";
import { Button } from "@/components/ui/buttons/Button";

export function TimeBlockingForm() {
  const { register, reset, control, getValues, watch, handleSubmit } =
    useFormContext<TimeBlockFormState>();

  const isExistId = watch("id");
  const { updateTimeBlock } = useUpdateTimeBlock();
  const { createTimeBlock, isPending } = useCreateTimeBlock();

  const onSubmit: SubmitHandler<TimeBlockFormState> = (data) => {
    const { id, color, ...rest } = data;
    const dto = { ...rest, color: color || undefined };

    if (id) {
      updateTimeBlock({ id, data: dto });
    } else {
      createTimeBlock(dto);
    }

    reset({
      color: COLORS[COLORS.length - 1],
      duration: 0,
      name: "",
      id: undefined,
      order: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-3/5">
      <Field
        {...register("name", {
          required: true,
        })}
        id="name"
        label="Enter name:"
        placeholder="Enter name:"
        extra="mb-4"
      />
      <Field
        {...register("duration", {
          required: true,
          valueAsNumber: true,
        })}
        id="duration"
        label="Enter duration (min.):"
        placeholder="Enter duration (min.):"
        isNumber
        extra="mb-4"
      />
      <div>
        <span className="inline-block mb-1.5">Color:</span>
        <Controller
          control={control}
          name="color"
          render={({ field: { value, onChange } }) => {
            return (
              <SingleSelect
                data={COLORS.map((item) => ({ label: item, value: item }))}
                onChange={onChange}
                value={value || COLORS[COLORS.length - 1]}
                isColorSelect
              />
            );
          }}
        />
      </div>
      <Button type="submit" disabled={isPending} className="mt-6">
        {isExistId ? "Update" : "Create"}
      </Button>
    </form>
  );
}
