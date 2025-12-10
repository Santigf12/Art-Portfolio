module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env.int("SMTP_PORT", 587),
        secure: env.bool("SMTP_SECURE", false), // false for 587 STARTTLS
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        // Optional, only if you hit TLS/cert issues:
        // tls: { rejectUnauthorized: false },
      },
      settings: {
        defaultFrom: env("SMTP_FROM", "support@fuentes.it.com"),
        defaultReplyTo: env("SMTP_REPLY_TO", "support@fuentes.it.com"),
      },
    },
  },
});