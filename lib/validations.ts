import { z } from "zod"

export const submissionSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required").max(2000, "Description too long"),
  hours: z.number().min(0.1, "Hours must be at least 0.1").max(24, "Hours cannot exceed 24"),
  link: z.string().url().optional().or(z.literal("")),
})

export type SubmissionInput = z.infer<typeof submissionSchema>
