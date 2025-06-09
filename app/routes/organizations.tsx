import { useLoaderData } from '@remix-run/react';
import { executeQuery, QueryData } from '@/db/execute-query';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';
import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoaderError } from '@/types/loader-error';

// Types and query definition
export type OrganizationData = {
  organization_id: number;
  organization_name: string;
  industry: string;
  subscription_tier: string;
  created_at: string;
};

export const organizationsQuery = `
  SELECT organization_id, organization_name, industry, subscription_tier, created_at
  FROM organizations
  ORDER BY organization_name
`;

// Component implementation
interface OrganizationsTableProps {
  data: OrganizationData[];
}

export function OrganizationsTable({ data }: OrganizationsTableProps) {
  return (
    <UniversalTableCard
      title="Organizations"
      description="List of all organizations with their details."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Subscription Tier</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No organizations found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((org) => (
              <TableRow key={org.organization_id}>
                <TableCell>{org.organization_id}</TableCell>
                <TableCell>{org.organization_name}</TableCell>
                <TableCell>{org.industry}</TableCell>
                <TableCell>{org.subscription_tier}</TableCell>
                <TableCell>{new Date(org.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}

export async function loader(): Promise<OrganizationsPageProps | LoaderError> {
  try {
    const organizations = await executeQuery<OrganizationData>(organizationsQuery);
    return { organizations };
  } catch (error) {
    console.error('Error in organizations loader:', error);
    return { error: error instanceof Error ? error.message : 'Failed to load organizations data' };
  }
}

interface OrganizationsPageProps {
  organizations: QueryData<OrganizationData[]>;
}

export default function OrganizationsPage({ organizations }: OrganizationsPageProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Organizations Overview</h1>
      <WithErrorHandling
        queryData={organizations}
        render={(data) => <OrganizationsTable data={data} />}
      />
    </div>
  );
}
