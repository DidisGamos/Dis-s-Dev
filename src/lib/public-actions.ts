import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma";

/**
 * Public server functions — fetch active, ordered content for the public site.
 * These are called by the frontend sections and return only active items.
 */

export const getPublicServices = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
});

export const getPublicStats = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.stat.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
});

export const getPublicAdvantages = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.advantage.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
});

export const getPublicProcessSteps = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.processStep.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
});

export const getPublicProjects = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.project.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
});

export const getPublicTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
});

/**
 * Save a contact message to the database.
 */
export const saveContactMessage = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      email: string;
      company?: string;
      service?: string;
      budget?: string;
      message: string;
    }) => data
  )
  .handler(async ({ data }) => {
    return prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        service: data.service,
        budget: data.budget,
        message: data.message,
      },
    });
  });
