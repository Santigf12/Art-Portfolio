// config/admin.ts (Strapi v5)

const getPreviewPathname = (uid: string, { locale, document }: any): string | null => {
  const l = locale || document?.locale || "en";
  const slug = document?.slug;

  switch (uid) {
    case "api::about.about":
      return `/${l}/about`;

    case "api::selected-work.selected-work":
      return `/${l}/selected-works`;

    case "api::project.project":
      return slug ? `/${l}/projects/${slug}` : `/${l}/projects`;

    case "api::artwork.artwork":
      return slug ? `/${l}/artwork/${slug}` : `/${l}`;

    default:
      return null; // no preview button for other types
  }
};

export default ({ env }: any) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY"),
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },

  // ✅ Preview config
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env("CLIENT_URL"),
      async handler(uid: never , { documentId, locale, status }: any) {
        const clientUrl = env("CLIENT_URL");
        const previewSecret = env("PREVIEW_SECRET");

        const document = await strapi.documents(uid).findOne({ documentId, locale });
        const pathname = getPreviewPathname(uid, { locale, document });

        if (!pathname) return null;

        const qs = new URLSearchParams({
          url: pathname,
          secret: previewSecret,
          status,
        });

        return `${clientUrl}/api/preview?${qs.toString()}`;
      },
    },
  },
});
