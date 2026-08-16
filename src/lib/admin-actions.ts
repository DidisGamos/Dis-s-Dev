import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma";

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────

export const getServices = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
});

export const upsertService = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: string;
      title: string;
      description: string;
      icon: string;
      details: string[];
      order: number;
      isActive: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    if (data.id) {
      return prisma.service.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          icon: data.icon,
          details: data.details,
          order: data.order,
          isActive: data.isActive,
        },
      });
    }
    return prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        details: data.details,
        order: data.order,
        isActive: data.isActive,
      },
    });
  });

export const deleteService = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await prisma.service.delete({ where: { id: data.id } });
    return { success: true };
  });

// ─────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────

export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.stat.findMany({ orderBy: { order: "asc" } });
});

export const upsertStat = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: string;
      value: string;
      label: string;
      order: number;
      isActive: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    if (data.id) {
      return prisma.stat.update({
        where: { id: data.id },
        data: { value: data.value, label: data.label, order: data.order, isActive: data.isActive },
      });
    }
    return prisma.stat.create({
      data: { value: data.value, label: data.label, order: data.order, isActive: data.isActive },
    });
  });

export const deleteStat = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await prisma.stat.delete({ where: { id: data.id } });
    return { success: true };
  });

// ─────────────────────────────────────────────
// ADVANTAGES
// ─────────────────────────────────────────────

export const getAdvantages = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.advantage.findMany({ orderBy: { order: "asc" } });
});

export const upsertAdvantage = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: string;
      text: string;
      order: number;
      isActive: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    if (data.id) {
      return prisma.advantage.update({
        where: { id: data.id },
        data: { text: data.text, order: data.order, isActive: data.isActive },
      });
    }
    return prisma.advantage.create({
      data: { text: data.text, order: data.order, isActive: data.isActive },
    });
  });

export const deleteAdvantage = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await prisma.advantage.delete({ where: { id: data.id } });
    return { success: true };
  });

// ─────────────────────────────────────────────
// PROCESS STEPS
// ─────────────────────────────────────────────

export const getProcessSteps = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.processStep.findMany({ orderBy: { order: "asc" } });
});

export const upsertProcessStep = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: string;
      stepNumber: string;
      title: string;
      description: string;
      order: number;
      isActive: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    if (data.id) {
      return prisma.processStep.update({
        where: { id: data.id },
        data: {
          stepNumber: data.stepNumber,
          title: data.title,
          description: data.description,
          order: data.order,
          isActive: data.isActive,
        },
      });
    }
    return prisma.processStep.create({
      data: {
        stepNumber: data.stepNumber,
        title: data.title,
        description: data.description,
        order: data.order,
        isActive: data.isActive,
      },
    });
  });

export const deleteProcessStep = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await prisma.processStep.delete({ where: { id: data.id } });
    return { success: true };
  });

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────

export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
});

export const upsertProject = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: string;
      title: string;
      category: string;
      shortDesc: string;
      fullDesc: string;
      imageUrl: string;
      techs: string[];
      features: string[];
      results: string;
      siteUrl?: string | null;
      apkUrl?: string | null;
      order: number;
      isActive: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    if (data.id) {
      return prisma.project.update({
        where: { id: data.id },
        data: {
          title: data.title,
          category: data.category,
          shortDesc: data.shortDesc,
          fullDesc: data.fullDesc,
          imageUrl: data.imageUrl,
          techs: data.techs,
          features: data.features,
          results: data.results,
          siteUrl: data.siteUrl,
          apkUrl: data.apkUrl,
          order: data.order,
          isActive: data.isActive,
        },
      });
    }
    return prisma.project.create({
      data: {
        title: data.title,
        category: data.category,
        shortDesc: data.shortDesc,
        fullDesc: data.fullDesc,
        imageUrl: data.imageUrl,
        techs: data.techs,
        features: data.features,
        results: data.results,
        siteUrl: data.siteUrl,
        apkUrl: data.apkUrl,
        order: data.order,
        isActive: data.isActive,
      },
    });
  });

export const deleteProject = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await prisma.project.delete({ where: { id: data.id } });
    return { success: true };
  });

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
});

export const upsertTestimonial = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id?: string;
      name: string;
      role: string;
      content: string;
      rating: number;
      avatarUrl?: string | null;
      order: number;
      isActive: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    if (data.id) {
      return prisma.testimonial.update({
        where: { id: data.id },
        data: {
          name: data.name,
          role: data.role,
          content: data.content,
          rating: data.rating,
          avatarUrl: data.avatarUrl,
          order: data.order,
          isActive: data.isActive,
        },
      });
    }
    return prisma.testimonial.create({
      data: {
        name: data.name,
        role: data.role,
        content: data.content,
        rating: data.rating,
        avatarUrl: data.avatarUrl,
        order: data.order,
        isActive: data.isActive,
      },
    });
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await prisma.testimonial.delete({ where: { id: data.id } });
    return { success: true };
  });

// ─────────────────────────────────────────────
// CONTACT MESSAGES
// ─────────────────────────────────────────────

export const getContactMessages = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
});

export const markMessageAsRead = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return prisma.contactMessage.update({
      where: { id: data.id },
      data: { isRead: true },
    });
  });

export const deleteMessage = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await prisma.contactMessage.delete({ where: { id: data.id } });
    return { success: true };
  });

// ─────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────

export const getDashboardStats = createServerFn({ method: "GET" }).handler(async () => {
  const [
    servicesCount,
    projectsCount,
    testimonialsCount,
    unreadMessages,
    totalMessages,
    statsCount,
    advantagesCount,
    processStepsCount,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.count(),
    prisma.stat.count(),
    prisma.advantage.count(),
    prisma.processStep.count(),
  ]);

  return {
    servicesCount,
    projectsCount,
    testimonialsCount,
    unreadMessages,
    totalMessages,
    statsCount,
    advantagesCount,
    processStepsCount,
  };
});
