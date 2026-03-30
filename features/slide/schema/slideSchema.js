const zod = require("zod");

const SlideSchema = zod
  .object({
    title: zod.string().min(5, "Título muito pequeno"),
    mediaUrl: zod.string().min(10, "URL inválida"),
    mediaType: zod.enum(["image", "video", "gif"], "Formato de arquivo inválido"),
    isEnabled: zod.boolean().optional(),
    startAt: zod.coerce.date("Formato de data inválida"),
    endAt: zod.coerce.date("Formato de data inválida"),
  })
  .superRefine((obj, ctx) => {
    if (obj.startAt > obj.endAt) {
      ctx.addIssue({
        message: "Data de início maior que data final",
      });
    }
  });

module.exports = { SlideSchema };
