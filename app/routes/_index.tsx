import { useLoaderData, redirect } from '@remix-run/react';
import { ErrorComponent } from '@/components/building-blocks/error-component/error-component';
import OrganizationsPage, { loader as organizationsLoader } from './organizations';

export async function loader() {
  // Redirect to the organizations page as it's now the main dashboard
  return redirect('/organizations');
}

export default function Index() {
  // This component will technically not be rendered due to the redirect in the loader,
  // but it's kept for Remix's routing structure.
  // If direct access were possible, it would handle errors or render the organizations page.
  const data = useLoaderData<typeof loader>();

  if ('error' in data) {
    return <ErrorComponent errorMessage={data.error} />;
  }

  return <OrganizationsPage {...data} />;
}
