// Strapi v5
export default {
  async beforeCreate(event) {
    const data = event.params.data;

    // only auto-set if not provided
    if (data.order !== undefined && data.order !== null) return;

    const last = await strapi.db.query("api::project.project").findOne({
      orderBy: { order: "desc" },
      select: ["order"],
    });

    data.order = (last?.order ?? 0) + 1;
  },
};