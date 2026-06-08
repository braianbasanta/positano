import { isAuthed } from "./actions";
import { listItems } from "@/lib/reviews/store";
import AdminReviews from "./AdminReviews";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  if (!(await isAuthed())) {
    return <LoginForm />;
  }
  const items = await listItems();
  return <AdminReviews items={items} devMode={!process.env.ADMIN_REVIEWS_TOKEN} />;
}
