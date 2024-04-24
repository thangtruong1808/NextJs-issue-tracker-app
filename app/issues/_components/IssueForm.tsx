"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { RxInfoCircled } from "react-icons/rx";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <>
      <div className="max-w-xl mb-3 text-red-500 font-semibold">
        {error && (
          <Callout.Root size={"3"}>
            <Callout.Icon>
              <RxInfoCircled className="font-semibold text-2xl" />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </div>
      <form className="max-w-xl space-y-5" onSubmit={onSubmit}>
        <TextField.Root size={"3"}>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description . . ." {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Flex direction={"column"}>
          <Button disabled={isSubmitting}>
            <MdOutlineDone />
            {issue ? "Update Issue" : "Submit New Issue"}
            {isSubmitting && <Spinner />}
          </Button>
          <Button mt="5">
            <Link href={"/issues/list"} className="flex items-center gap-1">
              <span>
                <IoIosArrowRoundBack size={30} />
              </span>
              Back
            </Link>
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default IssueForm;
