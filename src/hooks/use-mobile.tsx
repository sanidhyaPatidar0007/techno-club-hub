
import * as React from "react"
import { useLocation } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

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
  const { toast } = useToast()
  
  let location = { pathname: "/" }
  let isRouterAvailable = true
  
  try {
    // This will throw an error if not in a Router context
    location = useLocation()
  } catch (error) {
    isRouterAvailable = false
    console.warn("useMobileSidebar: Not in a Router context")
  }
  
  const toggleSidebar = React.useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev
      
      // Only show toast on mobile when opening sidebar
      if (isMobile && newState) {
        toast({
          title: "Sidebar opened",
          description: "Tap outside or navigate to close"
        })
      }
      
      return newState
    })
  }, [isMobile, toast])
  
  const closeSidebar = React.useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])
  
  // This ensures the sidebar is properly closed when switching to mobile view
  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    } else {
      // When switching to desktop, ensure sidebar is open
      setIsOpen(true)
    }
  }, [isMobile])
  
  // Close sidebar on route change in mobile view
  React.useEffect(() => {
    if (isMobile && isRouterAvailable) {
      closeSidebar()
    }
  }, [location.pathname, isMobile, closeSidebar, isRouterAvailable])
  
  return {
    isOpen: isMobile ? isOpen : true,
    isMobile,
    toggleSidebar,
    closeSidebar
  }
}
