# Component Showcase & Usage Guide

## Enterprise UI Component Library

This document showcases all reusable components in the Task Manager design system with usage examples and best practices.

---

## Form Components

### Input Field
**Purpose**: Text input with label and validation

**React Example**:
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="you@company.com"
    className="w-full"
  />
</div>
```

**Angular Example**:
```html
<mat-form-field appearance="outline" class="full-width">
  <mat-label>Email Address</mat-label>
  <input matInput type="email" placeholder="you@company.com">
  <mat-error>Please enter a valid email</mat-error>
</mat-form-field>
```

**Variants**:
- Text: `type="text"`
- Email: `type="email"`
- Password: `type="password"`
- Number: `type="number"`

---

### Select Dropdown
**Purpose**: Single-choice selection from options

**React Example**:
```tsx
<Select value={status} onValueChange={setStatus}>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="in-progress">In Progress</SelectItem>
    <SelectItem value="completed">Completed</SelectItem>
  </SelectContent>
</Select>
```

**Angular Example**:
```html
<mat-form-field appearance="outline">
  <mat-label>Status</mat-label>
  <mat-select [(value)]="status">
    <mat-option value="pending">Pending</mat-option>
    <mat-option value="in-progress">In Progress</mat-option>
    <mat-option value="completed">Completed</mat-option>
  </mat-select>
</mat-form-field>
```

---

### Textarea
**Purpose**: Multi-line text input

**React Example**:
```tsx
<Textarea 
  placeholder="Enter description..."
  rows={4}
  className="resize-none"
/>
```

**Angular Example**:
```html
<mat-form-field appearance="outline">
  <mat-label>Description</mat-label>
  <textarea matInput 
            rows="4" 
            placeholder="Enter description...">
  </textarea>
</mat-form-field>
```

---

## Button Components

### Primary Button
**Use case**: Main action on a page
```tsx
<Button>Save Changes</Button>
```

### Secondary Button
**Use case**: Alternative actions
```tsx
<Button variant="outline">Cancel</Button>
```

### Destructive Button
**Use case**: Delete or dangerous actions
```tsx
<Button variant="destructive">Delete Task</Button>
```

### Ghost Button
**Use case**: Low-emphasis actions
```tsx
<Button variant="ghost">View Details</Button>
```

### Icon Button
**Use case**: Actions represented by icons
```tsx
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

### Loading State
```tsx
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  Submit
</Button>
```

---

## Data Display

### Table
**Purpose**: Display structured data

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <Badge variant={getBadgeVariant(item.status)}>
            {item.status}
          </Badge>
        </TableCell>
        <TableCell>{item.date}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Features**:
- Sortable columns
- Hover states
- Responsive design
- Action menus

---

### Card
**Purpose**: Container for related content

```tsx
<Card>
  <CardHeader>
    <CardTitle>Task Statistics</CardTitle>
    <CardDescription>Overview of your tasks</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content goes here */}
  </CardContent>
  <CardFooter>
    <Button>View All</Button>
  </CardFooter>
</Card>
```

**Use cases**:
- Dashboard widgets
- List items
- Form containers
- Content sections

---

### Badge
**Purpose**: Status indicators and labels

```tsx
{/* Status Badges */}
<Badge className="bg-green-100 text-green-700">Completed</Badge>
<Badge className="bg-blue-600 text-white">In Progress</Badge>
<Badge className="border-orange-200 bg-orange-50 text-orange-700" variant="outline">
  Pending
</Badge>

{/* Role Badges */}
<Badge variant="default">Admin</Badge>
<Badge variant="secondary">User</Badge>
```

**Color Coding**:
- Green: Success/Completed
- Blue: Active/In Progress
- Orange: Warning/Pending
- Red: Error/Failed
- Gray: Inactive/Disabled

---

## Feedback Components

### Toast Notifications
**Purpose**: Brief, auto-dismissing messages

```tsx
import { toast } from 'sonner';

// Success
toast.success('Task created successfully');

// Error
toast.error('Failed to delete task');

// Warning
toast.warning('Please save your changes');

// Info
toast.info('New update available');

// Custom
toast('Custom message', {
  description: 'Additional details here',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  }
});
```

---

### Alert
**Purpose**: Important contextual messages

```tsx
<Alert variant="default">
  <InfoIcon className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You have pending tasks that need attention.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>
    Failed to save changes. Please try again.
  </AlertDescription>
</Alert>
```

**Variants**:
- `default`: General information
- `destructive`: Errors and critical warnings

---

### Progress Bar
**Purpose**: Show completion or loading progress

```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label>Completion Rate</Label>
    <span className="text-sm font-medium">75%</span>
  </div>
  <Progress value={75} className="h-2" />
</div>
```

---

### Skeleton Loader
**Purpose**: Loading placeholder

```tsx
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-4 w-3/4 mt-2" />
  </CardHeader>
  <CardContent>
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </CardContent>
</Card>
```

---

## Dialog & Modals

### Dialog
**Purpose**: Modal dialog for forms and confirmations

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Create Task</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogDescription>
        Add a new task to your list.
      </DialogDescription>
    </DialogHeader>
    
    {/* Form content */}
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" />
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSubmit}>Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Alert Dialog
**Purpose**: Confirmation before destructive actions

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the task.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Navigation

### Dropdown Menu
**Purpose**: Contextual actions menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleEdit}>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDuplicate}>
      <Copy className="mr-2 h-4 w-4" />
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem 
      onClick={handleDelete}
      className="text-red-600"
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Tabs
**Purpose**: Organize content into sections

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    {/* Overview content */}
  </TabsContent>
  <TabsContent value="analytics">
    {/* Analytics content */}
  </TabsContent>
  <TabsContent value="settings">
    {/* Settings content */}
  </TabsContent>
</Tabs>
```

---

## Charts

### Bar Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#4f46e5" />
  </BarChart>
</ResponsiveContainer>
```

### Line Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
```

### Pie Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderCustomLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

---

## Layout Components

### Container
```tsx
<div className="container mx-auto px-6 max-w-7xl">
  {/* Content */}
</div>
```

### Grid Layout
```tsx
{/* 4-column grid */}
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {items.map(item => <Card key={item.id}>{/* ... */}</Card>)}
</div>

{/* 2-column grid */}
<div className="grid gap-6 lg:grid-cols-2">
  {items.map(item => <Card key={item.id}>{/* ... */}</Card>)}
</div>
```

### Flex Layout
```tsx
{/* Space between */}
<div className="flex items-center justify-between">
  <h2>Title</h2>
  <Button>Action</Button>
</div>

{/* Centered */}
<div className="flex items-center justify-center min-h-screen">
  <LoginForm />
</div>
```

---

## Utility Components

### Avatar
```tsx
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback className="bg-indigo-100 text-indigo-700">
    JD
  </AvatarFallback>
</Avatar>
```

### Separator
```tsx
<div>
  <p>Section 1</p>
  <Separator className="my-4" />
  <p>Section 2</p>
</div>
```

### Switch
```tsx
<div className="flex items-center justify-between">
  <Label htmlFor="notifications">Email Notifications</Label>
  <Switch id="notifications" checked={enabled} onCheckedChange={setEnabled} />
</div>
```

### Checkbox
```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>
```

---

## Best Practices

### Accessibility
1. Always use labels with form inputs
2. Provide meaningful alt text
3. Ensure proper color contrast
4. Support keyboard navigation
5. Include ARIA labels where needed

### Performance
1. Lazy load heavy components
2. Use skeleton loaders
3. Implement pagination for large lists
4. Optimize images
5. Code-split routes

### Consistency
1. Use design tokens (CSS variables)
2. Follow spacing system (8px grid)
3. Maintain visual hierarchy
4. Use consistent terminology
5. Follow naming conventions

### Responsive Design
1. Mobile-first approach
2. Use responsive grid systems
3. Test on multiple devices
4. Optimize touch targets (min 44x44px)
5. Handle different screen sizes

---

## Dark Mode Support

All components support dark mode automatically through CSS variables:

```tsx
// Light mode
className="bg-white text-gray-900"

// Dark mode aware
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"

// Using theme variables
className="bg-card text-card-foreground"
```

---

## Component Checklist

When creating new components:
- [ ] Support light and dark modes
- [ ] Include loading states
- [ ] Handle error states
- [ ] Add empty states
- [ ] Ensure accessibility
- [ ] Make responsive
- [ ] Add TypeScript types
- [ ] Include documentation
- [ ] Test keyboard navigation
- [ ] Verify color contrast

---

## Resources

- [Component Library](./src/app/components/ui/)
- [Design System](./DESIGN_SYSTEM.md)
- [Angular Guide](./ANGULAR_IMPLEMENTATION_GUIDE.md)
- [Figma File](#) (if available)

---

**Last Updated**: January 2026  
**Version**: 1.0.0
