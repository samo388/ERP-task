# Task Manager - Enterprise Design System

## Overview
This design system provides a comprehensive set of reusable components, patterns, and guidelines for building enterprise-grade web applications. It's optimized for both React and Angular Material implementations.

---

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Library](#component-library)
6. [Layout Patterns](#layout-patterns)
7. [Angular Material Mapping](#angular-material-mapping)
8. [Accessibility](#accessibility)

---

## Design Principles

### Enterprise SaaS Aesthetic
- **Professional**: Clean, trustworthy design that conveys reliability
- **Scalable**: Components work at any scale from startup to enterprise
- **Consistent**: Unified visual language across all screens
- **Accessible**: WCAG 2.1 AA compliant

### Visual Hierarchy
- Clear distinction between primary, secondary, and tertiary actions
- Consistent use of color for status and feedback
- Proper spacing to create breathing room
- Strategic use of shadows and borders

---

## Color System

### Primary Colors
```css
--primary: #4f46e5 (Indigo 600)
--primary-foreground: #ffffff
```
**Usage**: Primary actions, active states, brand elements

### Semantic Colors
```css
--success: #10b981 (Green 500)
--warning: #f59e0b (Orange 500)
--error: #ef4444 (Red 500)
--info: #3b82f6 (Blue 500)
```

### Neutral Colors
```css
Light Mode:
--background: #ffffff
--foreground: #0f172a (Gray 900)
--muted: #f3f4f6 (Gray 100)
--muted-foreground: #64748b (Gray 500)
--border: rgba(0, 0, 0, 0.1)

Dark Mode:
--background: #0f172a (Slate 900)
--foreground: #f1f5f9 (Slate 100)
--card: #1e293b (Slate 800)
--border: #334155 (Slate 700)
```

### Chart Colors
```css
--chart-1: #6366f1 (Indigo)
--chart-2: #10b981 (Green)
--chart-3: #f59e0b (Orange)
--chart-4: #ef4444 (Red)
--chart-5: #8b5cf6 (Purple)
```

---

## Typography

### Font Family
- **Primary**: System UI fonts (Inter, SF Pro, Segoe UI)
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif

### Type Scale
```css
h1: 24px / 1.5 / 500 weight
h2: 20px / 1.5 / 500 weight
h3: 18px / 1.5 / 500 weight
h4: 16px / 1.5 / 500 weight
body: 16px / 1.5 / 400 weight
small: 14px / 1.5 / 400 weight
xs: 12px / 1.5 / 400 weight
```

### Usage Guidelines
- Use h1 for page titles
- Use h2 for section headers
- Use h3 for card titles
- Use body for general content
- Use small/xs for metadata and labels

---

## Spacing System

### 8px Grid System
All spacing uses multiples of 8px for consistency:

```
4px  - xs (tight spacing)
8px  - sm (default gap)
16px - md (section spacing)
24px - lg (major sections)
32px - xl (page sections)
48px - 2xl (page margins)
```

### Component Spacing
- **Card padding**: 24px (p-6)
- **Button padding**: 12px 24px
- **Input padding**: 8px 12px
- **Section gaps**: 24px (gap-6)

---

## Component Library

### 1. Buttons

#### Primary Button
```tsx
<Button>Primary Action</Button>
```
**Angular Material**: `<button mat-raised-button color="primary">`
- Use for main actions
- Maximum 1 per section

#### Secondary Button
```tsx
<Button variant="outline">Secondary</Button>
```
**Angular Material**: `<button mat-stroked-button>`
- Use for alternative actions

#### Ghost Button
```tsx
<Button variant="ghost">Tertiary</Button>
```
**Angular Material**: `<button mat-button>`
- Use for low-emphasis actions

#### Icon Button
```tsx
<Button variant="ghost" size="icon"><Icon /></Button>
```
**Angular Material**: `<button mat-icon-button>`

---

### 2. Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

**Angular Material**:
```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Title</mat-card-title>
    <mat-card-subtitle>Description</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <!-- Content -->
  </mat-card-content>
</mat-card>
```

**Usage**:
- Container for related content
- Use consistent padding (p-6)
- Include subtle shadow for depth

---

### 3. Form Inputs

```tsx
<div className="space-y-2">
  <Label htmlFor="field">Label</Label>
  <Input id="field" placeholder="Placeholder" />
</div>
```

**Angular Material**:
```html
<mat-form-field appearance="outline">
  <mat-label>Label</mat-label>
  <input matInput placeholder="Placeholder">
</mat-form-field>
```

**Guidelines**:
- Always pair with labels
- Use placeholder for examples
- Show validation inline
- Include helper text when needed

---

### 4. Badges

```tsx
<Badge variant="default">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
```

**Angular Material**: `<mat-chip>` or custom component

**Status Badges**:
- Pending: Orange (outline)
- In Progress: Blue (solid)
- Completed: Green (subtle)

---

### 5. Tables

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Angular Material**:
```html
<table mat-table [dataSource]="dataSource">
  <ng-container matColumnDef="column">
    <th mat-header-cell *matHeaderCellDef>Column</th>
    <td mat-cell *matCellDef="let element">{{element.data}}</td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="columns"></tr>
  <tr mat-row *matRowDef="let row; columns: columns"></tr>
</table>
```

---

### 6. Dialogs/Modals

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Angular Material**:
```typescript
this.dialog.open(DialogComponent, {
  width: '500px',
  data: { /* data */ }
});
```

---

### 7. Navigation

#### Top Navigation
- Height: 64px (h-16)
- Logo + Title on left
- Actions + Profile on right
- Sticky positioning

**Angular Material**: `<mat-toolbar>`

#### Sidebar Navigation
- Width: 256px (w-64)
- Active state highlighting
- Icon + Label format
- Role-based visibility

**Angular Material**: `<mat-sidenav>` within `<mat-sidenav-container>`

---

### 8. Charts & Analytics

**Libraries**:
- React: Recharts
- Angular: ngx-charts or ng2-charts

**Chart Types**:
1. **Bar Chart**: Comparing categories
2. **Line Chart**: Trends over time
3. **Pie Chart**: Distribution
4. **Area Chart**: Volume over time
5. **Radar Chart**: Multi-metric comparison

**Styling**:
- Use semantic colors
- Responsive containers
- Proper tooltips
- Legend when needed

---

## Layout Patterns

### Dashboard Grid
```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {/* KPI Cards */}
</div>
<div className="grid gap-6 lg:grid-cols-2">
  {/* Charts */}
</div>
```

**Angular Material**: `<mat-grid-list>`

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Wide: > 1440px

---

## Angular Material Mapping

### Complete Component Map

| React Component | Angular Material | Notes |
|----------------|------------------|-------|
| Button | `mat-button`, `mat-raised-button` | Use color="primary" |
| Card | `mat-card` | Direct mapping |
| Input | `mat-form-field` + `input matInput` | Use appearance="outline" |
| Select | `mat-select` | Within mat-form-field |
| Checkbox | `mat-checkbox` | Direct mapping |
| Radio | `mat-radio-group` | Direct mapping |
| Switch | `mat-slide-toggle` | Direct mapping |
| Dialog | `MatDialog` service | Inject and use open() |
| Table | `mat-table` | Use with dataSource |
| Tabs | `mat-tab-group` | Direct mapping |
| Badge | `mat-chip` | Or custom component |
| Avatar | Custom or `mat-icon` | Use Material Icons |
| Progress | `mat-progress-bar` | Direct mapping |
| Tooltip | `matTooltip` directive | Direct mapping |
| Menu | `mat-menu` | With matMenuTriggerFor |
| Snackbar | `MatSnackBar` service | For toasts |

### Service Equivalents

| React Context/Hook | Angular Service |
|-------------------|-----------------|
| AuthContext | Custom AuthService |
| ThemeProvider | Custom ThemeService |
| Toast | MatSnackBar |
| Form Validation | Reactive Forms |

---

## Accessibility

### WCAG 2.1 AA Compliance

1. **Color Contrast**
   - Text: Minimum 4.5:1
   - Large text: Minimum 3:1
   - Icons: Minimum 3:1

2. **Keyboard Navigation**
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order

3. **Screen Readers**
   - Semantic HTML
   - ARIA labels where needed
   - Alt text for images
   - Form labels associated

4. **Focus Management**
   - Focus trapping in modals
   - Focus restoration
   - Skip links

### Dark Mode
- Automatic system preference detection
- Manual toggle available
- All colors defined in theme
- Proper contrast in both modes

---

## Implementation Checklist

### For React
- ✅ Components in `/src/app/components`
- ✅ Theme in `/src/styles/theme.css`
- ✅ Tailwind CSS v4
- ✅ Dark mode with next-themes
- ✅ Recharts for analytics

### For Angular
- [ ] Install Angular Material: `ng add @angular/material`
- [ ] Choose Indigo/Pink theme
- [ ] Create custom theme file
- [ ] Import Material modules
- [ ] Create reusable components
- [ ] Set up services (Auth, Theme)
- [ ] Configure routing
- [ ] Add ngx-charts for analytics

---

## Best Practices

### Component Development
1. Keep components small and focused
2. Use TypeScript for type safety
3. Document props/inputs
4. Handle loading/error states
5. Make responsive by default

### Styling
1. Use design tokens (CSS variables)
2. Follow 8px spacing grid
3. Keep specificity low
4. Avoid hardcoded colors
5. Test in both light/dark modes

### Data Handling
1. Show loading states
2. Handle empty states
3. Provide error feedback
4. Validate user input
5. Confirm destructive actions

---

## Resources

### Design References
- Linear: https://linear.app
- Notion: https://notion.so
- Asana: https://asana.com
- Jira: https://atlassian.com/jira

### Documentation
- React: https://react.dev
- Angular Material: https://material.angular.io
- Tailwind CSS: https://tailwindcss.com
- Recharts: https://recharts.org
- ngx-charts: https://swimlane.gitbook.io/ngx-charts

---

## Version History
- **v1.0** - Initial design system
- Theme: Light + Dark mode
- Components: 30+ UI components
- Patterns: Dashboard, Forms, Tables
- Accessibility: WCAG 2.1 AA

---

**Maintained by**: Task Manager Design Team  
**Last Updated**: January 2026  
**License**: Proprietary - Enterprise Use
