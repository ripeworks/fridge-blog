import React, { useEffect, useState } from "react";
import Login from "./Login";
export default function withAuth(Component) {
  return (props) => {
    const [hasAccess, setHasAccess] = useState(null);

    useEffect(() => {
      fetch("/api/auth")
        .then((res) => res.json())
        .then((res) => {
          setHasAccess(res.hasAccess);
        })
        .catch(() => {
          setHasAccess(false);
        });
    }, []);

    if (hasAccess === null) {
      return null;
    }

    return hasAccess ? <Component {...props} /> : <Login />;
  };
}
