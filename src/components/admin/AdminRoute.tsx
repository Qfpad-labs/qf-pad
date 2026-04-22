import { useAccount } from '@/lib/papi/hooks';
import { Navigate } from 'react-router-dom';
import { useIsAdmin } from '@/lib/utils/admin';
import type { Address } from 'viem';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { address, isConnected } = useAccount();
  const { isAdmin, isLoading } = useIsAdmin(address as Address | undefined);

  // Show loading state while checking admin status
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If wallet is not connected, show access denied
  if (!isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            Please connect your wallet to access this page.
          </p>
        </div>
      </div>
    );
  }

  // If connected wallet is not an admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If user is admin, render the protected content
  return <>{children}</>;
}
