
import * as React from "react"
import { useLocation } from "react-router-dom"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Check immediately on mount
    checkMobile()
    
    // Set up the event listener for resize
    window.addEventListener("resize", checkMobile)
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile === undefined ? false : isMobile
}

// Sidebar management for mobile
export function useMobileSidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const location = useLocation()
  
  const toggleSidebar = React.useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])
  
  const closeSidebar = React.useCallback(() => {
    setIsOpen(false)
  }, [])
  
  // This ensures the sidebar is properly closed when switching to mobile view
  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [isMobile])
  
  // Close sidebar on route change in mobile view
  React.useEffect(() => {
    if (isMobile) {
      closeSidebar()
    }
  }, [location.pathname, isMobile, closeSidebar])
  
  return {
    isOpen: isOpen && isMobile,
    isMobile,
    toggleSidebar,
    closeSidebar
  }
}
