import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./src/app/api/[...slug]/Users.js";
import { Media } from "./src/app/api/[...slug]/Media.js";
import { Landing } from "./src/app/api/[...slug]/Landing.js";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  admin: { user: "users" },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  }),

  collections: [Users, Media, Landing],

  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.AASPartners_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],

  sharp,
});
