
import * as React from "react"
import { useLocation } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

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
  const { toast } = useToast()
  
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
    if (isMobile) {
      closeSidebar()
    }
  }, [location.pathname, isMobile, closeSidebar])
  
  return {
    isOpen: isMobile ? isOpen : true,
    isMobile,
    toggleSidebar,
    closeSidebar
  }
}
