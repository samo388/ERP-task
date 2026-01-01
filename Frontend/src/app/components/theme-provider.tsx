/**
 * Theme Provider Component
 * 
 * Angular Material Mapping:
 * - This functionality maps to Angular Material's ThemeService
 * - In Angular, use: import { MatThemeService } from '@angular/material/core'
 * - Or custom theme switching service with CSS classes
 */

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
