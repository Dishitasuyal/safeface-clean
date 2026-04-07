import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useToast } from "../../hooks/use-toast";

type User = {
  userId: string;
  email: string;
  status: string;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  // Fetch users from backend
  useEffect(() => {
    fetch("http://localhost:5000/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Suspend user
  const handleSuspend = async (userId: string) => {
  await fetch(`http://localhost:5000/admin/suspend/${userId}`, {
    method: "PUT"
  });

  // update UI
  setUsers(prev =>
    prev.map(user =>
      user.userId === userId ? { ...user, status: "suspended" } : user
    )
  );
};

  // Unsuspend user
  const handleUnsuspend = async (userId: string) => {
    await fetch(`http://localhost:5000/admin/users/unsuspend/${userId}`, {
      method: "POST",
    });

    setUsers((prev) =>
      prev.map((user) =>
        user.userId === userId ? { ...user, status: "active" } : user
      )
    );

    toast({
      title: "User Unsuspended",
      description: `User ${userId} has been reactivated.`,
    });
  };

  // Delete user
  const handleDelete = async (userId: string) => {
    await fetch(`http://localhost:5000/admin/users/delete/${userId}`, {
      method: "DELETE",
    });

    setUsers((prev) => prev.filter((user) => user.userId !== userId));

    toast({
      title: "User Deleted",
      description: `User ${userId} has been deleted.`,
      variant: "destructive",
    });
  };

  
        const getActionButton = (user: User) => {

  if ((user.status || "active") === "active") {
    return (
      <Button
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => handleSuspend(user.userId)}
      >
        Suspend
      </Button>
    );
  }

  if (user.status === "suspended") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleUnsuspend(user.userId)}
      >
        Unsuspend
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={() => handleDelete(user.userId)}
    >
      Delete
    </Button>
  );
};
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>

        <div className="bg-card rounded-lg shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.email}</TableCell>
                 <TableCell className="text-muted-foreground">
                 {user.status || "active"}
                 </TableCell>
                  <TableCell className="text-right">
                    {getActionButton(user)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
