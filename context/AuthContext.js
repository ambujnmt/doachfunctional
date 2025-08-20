'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userTokens, setUserTokens] = useState({ accessToken: null, idToken: null });
  const [adminTokens, setAdminTokens] = useState({ accessToken: null, idToken: null });
  const [loading, setLoading] = useState(true);

const setAuth = ({ accessToken, idToken, userRole, user }) => {
  const decodedToken = jwtDecode(accessToken);

  const fullUser = {
    ...(user || {}),
    token: accessToken,
    decodedToken, // 👈 Add this
  };

  setUser(fullUser);
  setUserRole(userRole);

  Cookies.set("userRole", userRole, { sameSite: "Strict" });
  Cookies.set("accessToken", accessToken, { sameSite: "Strict" });
  Cookies.set("idToken", idToken, { sameSite: "Strict" });

  sessionStorage.setItem("user", JSON.stringify(fullUser)); // ✅ store decodedToken too

  if (userRole === "superadmin") {
    setAdminTokens({ accessToken, idToken });
  } else {
    setUserTokens({ accessToken, idToken });
  }
};



  const clearAuth = () => {
    setUser(null);
    setUserRole(null);
    setUserTokens({ accessToken: null, idToken: null });
    setAdminTokens({ accessToken: null, idToken: null });

    Cookies.remove('userRole');
    Cookies.remove('accessToken');
    Cookies.remove('idToken');
  };

useEffect(() => {
  const role = Cookies.get("userRole");
  const accessToken = Cookies.get("accessToken");
  const idToken = Cookies.get("idToken");
  const storedUser = sessionStorage.getItem("user");

  if (role && accessToken && idToken) {
    setUserRole(role);
    const tokens = { accessToken, idToken };

    if (role === "superadmin") {
      setAdminTokens(tokens);
    } else {
      setUserTokens(tokens);
    }
    
  try {
  const parsedUser = storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : { token: accessToken };

  // ✅ Parse token if missing
  if (!parsedUser.decodedToken && parsedUser.token) {
    parsedUser.decodedToken = jwtDecode(parsedUser.token);
  }

  setUser(parsedUser);
} catch (e) {
  console.error("❌ Failed to parse stored user:", storedUser);
  setUser({ token: accessToken, decodedToken: jwtDecode(accessToken) });
}

  }

  setLoading(false);
}, []);



  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      userRole,
      setUserRole,
      userTokens,
      setUserTokens,
      adminTokens,
      setAdminTokens,
      setAuth,
      clearAuth,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
