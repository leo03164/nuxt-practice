export default function (context) {
  if (!context.store.getters.isAuthticated) {
    context.redirect("/admin/auth");
  }
}
