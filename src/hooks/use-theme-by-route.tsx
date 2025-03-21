
import { useLocation } from "react-router-dom";

type RouteTheme = {
  backgroundImage: string;
  accentColor: string;
};

const routeThemes: Record<string, RouteTheme> = {
  "/dashboard": {
    backgroundImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-blue-500",
  },
  "/membership": {
    backgroundImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-purple-500",
  },
  "/events": {
    backgroundImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-amber-500",
  },
  "/credits": {
    backgroundImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-emerald-500",
  },
  "/collaboration": {
    backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-rose-500",
  },
  "/resources": {
    backgroundImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-cyan-500",
  },
  "/admin": {
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-slate-500",
  },
};

export function useThemeByRoute(): RouteTheme {
  const location = useLocation();
  const defaultTheme: RouteTheme = {
    backgroundImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=10",
    accentColor: "bg-blue-500",
  };

  return routeThemes[location.pathname] || defaultTheme;
}
