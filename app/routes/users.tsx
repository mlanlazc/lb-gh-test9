import { useLoaderData } from '@remix-run/react';
import { executeQuery, QueryData } from '@/db/execute-query';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';
import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoaderError } from '@/types/loader-error';
import { Badge } from '@/components/ui/badge';

// Types and query definition
export type UserData = {
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
};

export const usersQuery = `
  SELECT user_id, username, email, first_name, last_name, role, is_active, created_at
  FROM users
  ORDER BY username
`;

// Component implementation
interface UsersTableProps {
  data: UserData[];
}

export function UsersTable({ data }: UsersTableProps) {
  return (
    <UniversalTableCard
      title="Users"
      description="List of all users with their details."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? 'default' : 'destructive'}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}

export async function loader(): Promise<UsersPageProps | LoaderError> {
  try {
    const users = await executeQuery<UserData>(usersQuery);
    return { users };
  } catch (error) {
    console.error('Error in users loader:', error);
    return { error: error instanceof Error ? error.message : 'Failed to load users data' };
  }
}

interface UsersPageProps {
  users: QueryData<UserData[]>;
}

export default function UsersPage({ users }: UsersPageProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Users Overview</h1>
      <WithErrorHandling
        queryData={users}
        render={(data) => <UsersTable data={data} />}
      />
    </div>
  );
}
