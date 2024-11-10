import "./App.css";
import { useEffect, useState } from "react";
import {
  AdminPortal,
  useAuth,
  useLoginWithRedirect,
  ContextHolder,
  useAuthActions,
} from "@frontegg/react";

function App() {
  const { switchTenant } = useAuthActions();
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const [selectedTenant, setSelectedTenant] = useState<string | undefined>(
    user?.tenantId
  );

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${redirectUri}`;
  };

  const handleClick = () => {
    AdminPortal.openHosted();
  };

  const handleTenantChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tenantId = event.target.value;
    try {
      setSelectedTenant(tenantId);
      await switchTenant({ tenantId });

      console.log("Switched to tenant:", tenantId);
    } catch (error) {
      console.error(`Error switching tenant: ${error}`);
    }
  };

  return (
    <div className="App">
      {isAuthenticated && (
        <button onClick={handleClick} className="settings-button">
          Settings
        </button>
      )}
      {isAuthenticated ? (
        <div className="logged-in">
          <div className="profile-container">
            <img
              className="profile-image"
              src={user?.profilePictureUrl || "https://via.placeholder.com/100"}
              alt={user?.name || "User"}
            />
            <div className="user-info">
              <span>Logged in as: {user?.name}</span>
            </div>
          </div>
          {user?.tenants && (
            <div className="tenant-switcher">
              <label htmlFor="tenant-select">Tenants:</label>
              <select
                id="tenant-select"
                value={selectedTenant || ""}
                onChange={handleTenantChange}
              >
                {user.tenants.map((tenant, index) => (
                  <option key={tenant.tenantId} value={tenant.tenantId}>
                    {`Tenant ${index + 1} (${tenant.tenantId.slice(-4)})`}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="buttons-data-block">
            <button
              className="access-token"
              onClick={() => alert(user?.accessToken)}
            >
              What is my access token?
            </button>
            <button onClick={logout} className="logout-button">
              Click to logout
            </button>
          </div>
        </div>
      ) : (
        <div className="login-prompt">
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
