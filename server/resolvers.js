import { getCompany } from "./db/companies.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompanyId,
  updateJob,
} from "./db/jobs.js";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    jobs: async () => getJobs(),
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError("No Company found with id " + id);
      }
      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError("No Job found with id " + id);
      }
      return job;
    },
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError("User not authenticated");
      }
      return createJob({ companyId: user.companyId, title, description });
    },
    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError("User not authenticated");
      }
      const job = await deleteJob(id, user.companyId);
      if (!job) {
        throw notFoundError(`No job found with id ${id}`);
      }
      return job;
    },
    updateJob: (_root, { input: { id, title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError("User not authenticated");
      }
      const job = updateJob({ id, companyId: user.companyId, title, description });
      if (!job) {
        throw notFoundError(`No job found with id ${id}`);
      }
      return job;
    },
  },

  Company: {
    jobs: async (company) => getJobsByCompanyId(company.id),
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
};

const toIsoDate = (value) => value.slice(0, "yyyy-mm-dd".length);

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHORIZED" },
  });
}
