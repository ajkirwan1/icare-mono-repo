# The Search Toolbar: A Complete Guide

## 1. What Is a Search Toolbar?

A search toolbar (often called a **FilterBar** or **Toolbar**) is the horizontal strip of controls that sits above a data set — typically a table or card grid — and allows the user to narrow down what they see.

It combines two concepts:

- **Search**: Free-text input matched against one or more fields. Open-ended.
- **Filter**: Structured selection from predefined values. Constrained.

These are not separate systems. They work together as additive constraints (AND logic). A search term of "Sarah" combined with a role filter of "Caregiver" produces: all users whose name or email contains "Sarah" AND whose role is Caregiver.

From an implementation perspective, both produce query parameters sent to the same endpoint:

```
GET /api/users?q=sarah&role=caregiver&status=active
```

---

## 2. HTML Elements of a Search Toolbar

### 2.1 The Container

The toolbar itself is a container that groups related controls.

```html
<div role="toolbar" aria-label="User filters">
  <!-- controls go here -->
</div>
```

**Attributes:**

| Attribute | Purpose |
|-----------|---------|
| `role="toolbar"` | ARIA role that tells assistive tech this is a group of related controls. Enables arrow-key navigation between child controls. |
| `aria-label` | Names the toolbar for screen readers. Required because there is no visible heading for the toolbar itself. |

The `role="toolbar"` is optional. It is most useful when you want keyboard arrow-key navigation between the controls. For simpler toolbars, a plain `<div>` is acceptable.

---

### 2.2 The Search Input

```html
<form role="search">
  <label for="user-search" class="sr-only">Search users</label>
  <input
    id="user-search"
    type="search"
    name="q"
    placeholder="Search by name or email..."
    autocomplete="off"
  />
  <button type="button" aria-label="Clear search">X</button>
</form>
```

#### The `<form>` element

| Attribute | Purpose |
|-----------|---------|
| `role="search"` | Creates a **search landmark** in the accessibility tree. Screen reader users can jump directly to it via landmark navigation (e.g., VoiceOver rotor). |
| `method="get"` | Default. Serializes form data into URL search parameters on submit. |
| `action="/path"` | The URL to navigate to on submit. Defaults to the current URL. |

The `<form>` provides two things: (1) the Enter key triggers submit automatically, and (2) `role="search"` creates a landmark.

If your filtering is entirely live/debounced with no explicit submit, you can skip `<form>` and use `<div role="search">` instead — you still get the landmark without the submission behaviour.

#### The `<input>` element

| Attribute | Purpose |
|-----------|---------|
| `type="search"` | Semantic input type for search. Some browsers show a native clear button (X). Screen readers announce it as a "search text field" rather than just "text field". |
| `name="q"` | The parameter name used when the form is serialized. Convention is `q` for search queries. |
| `placeholder="..."` | Hint text shown when the input is empty. Should describe what is searchable: "Search by name or email..." is better than "Search...". |
| `autocomplete="off"` | Prevents browser autocomplete suggestions from overlapping your own results. |
| `aria-label="..."` | Names the input for screen readers. Use this **only if** there is no visible `<label>` element. If you have a `<label>`, you do not need `aria-label`. |

#### The `<label>` element

```html
<label for="user-search">Search users</label>
```

| Attribute | Purpose |
|-----------|---------|
| `for="..."` | Associates the label with an input by matching the input's `id`. Clicking the label focuses the input. Screen readers read the label text when the input is focused. |

If the label is visually hidden (common in toolbars where the placeholder serves as the visible hint), add a CSS class like `sr-only` that hides it visually but keeps it in the accessibility tree.

#### The clear button

```html
<button type="button" aria-label="Clear search">X</button>
```

| Attribute | Purpose |
|-----------|---------|
| `type="button"` | Prevents this button from submitting the form. `type="submit"` is the default inside a `<form>`, so this must be explicit. |
| `aria-label="Clear search"` | The button's visible content is just "X", which is meaningless to a screen reader. The label provides the actual purpose. |

Only render this button when the search input has a value. Users expect to clear their search with one click.

---

### 2.3 Filter Dropdowns

```html
<select name="role" aria-label="Filter by role">
  <option value="">All Roles</option>
  <option value="caregiver">Caregiver</option>
  <option value="care-receiver">Care Receiver</option>
  <option value="family">Family Member</option>
</select>
```

#### The `<select>` element

| Attribute | Purpose |
|-----------|---------|
| `name="role"` | The parameter name when serialized. Produces `?role=caregiver` in the URL. |
| `aria-label="..."` | Names the dropdown for screen readers. Required because there is no visible `<label>`. If you have a visible label, use `<label for="...">` instead. |

#### The `<option>` element

| Attribute | Purpose |
|-----------|---------|
| `value=""` | An empty value represents "no filter applied" (show all). This is the default/reset state. |
| `value="caregiver"` | The value sent as the query parameter when this option is selected. |
| `selected` | Marks this option as the currently selected one. In React, use `defaultValue` on the `<select>` instead. |

**The first option** should always be the "All" / "Any" / unfiltered state. This gives users an obvious way to reset a filter.

---

### 2.4 Date Range Filters

```html
<label>
  From
  <input type="date" name="from" />
</label>
<label>
  To
  <input type="date" name="to" />
</label>
```

| Attribute | Purpose |
|-----------|---------|
| `type="date"` | Renders a native date picker in the browser. Produces a value in `YYYY-MM-DD` format. |
| `name="from"` / `name="to"` | Parameter names: `?from=2026-01-01&to=2026-01-31`. |
| `min` / `max` | Constrain the selectable date range. `min="2026-01-01"` prevents selecting dates before that. |

Wrapping the `<input>` inside a `<label>` implicitly associates them — no `for`/`id` needed.

---

### 2.5 Active Filter Tags

When filters are applied, it is common to display them as removable tags below the toolbar:

```html
<ul aria-label="Active filters">
  <li>
    Role: Caregiver
    <button aria-label="Remove role filter">X</button>
  </li>
  <li>
    Status: Active
    <button aria-label="Remove status filter">X</button>
  </li>
  <li>
    <button>Clear all filters</button>
  </li>
</ul>
```

| Attribute | Purpose |
|-----------|---------|
| `aria-label="Active filters"` | Names the list for screen readers. Without this, it is just an anonymous list. |
| `aria-label="Remove role filter"` | Each remove button needs its own label since they all look like "X" visually. |

Only render this section when at least one filter is active.

---

### 2.6 Results Count

```html
<output aria-live="polite">Showing 24 of 234 users</output>
```

| Attribute/Element | Purpose |
|-------------------|---------|
| `<output>` | Semantic element for a result of a calculation or user action. Appropriate for dynamic counts. |
| `aria-live="polite"` | When the content changes (e.g., after filtering), screen readers announce the new text without interrupting the user. `"polite"` waits for a pause; `"assertive"` interrupts immediately. |

---

### 2.7 Action Buttons

```html
<button type="button">Export CSV</button>
```

These sit at the end of the toolbar and perform actions on the current (filtered) data set. Common examples: Export, Print, Bulk Delete.

`type="button"` is important if the button is inside a `<form>` — it prevents form submission.

---

### 2.8 Sort Controls

```html
<select name="sort" aria-label="Sort by">
  <option value="newest">Newest first</option>
  <option value="oldest">Oldest first</option>
  <option value="name-asc">Name A-Z</option>
  <option value="name-desc">Name Z-A</option>
</select>
```

Sorting is technically not filtering (it does not reduce the result set), but it lives in the toolbar because it controls how data is displayed. It serializes the same way as filters: `?sort=newest`.

Alternatively, sort can be triggered from table column headers using `<button>` inside `<th>`:

```html
<th scope="col">
  <button aria-sort="ascending">
    Name
  </button>
</th>
```

| Attribute | Purpose |
|-----------|---------|
| `aria-sort="ascending"` / `"descending"` / `"none"` | Communicates the current sort state to screen readers. Only one column should have `ascending` or `descending` at a time. |

---

## 3. Form Scope: What Should the `<form>` Wrap?

There are three valid patterns:

### Pattern A: Form wraps only search

```html
<div role="toolbar">
  <form role="search">
    <input type="search" name="q" />
  </form>
  <select name="role">...</select>
  <select name="status">...</select>
</div>
```

**Behaviour:** Enter submits the search. Dropdowns filter immediately via JavaScript `onChange` handlers. Two independent interaction models coexist.

**Use when:** Filters are instant (client-side or auto-submitted), but search requires an explicit action.

### Pattern B: Form wraps everything

```html
<form role="search" method="get">
  <input type="search" name="q" />
  <select name="role">...</select>
  <select name="status">...</select>
  <button type="submit">Apply</button>
</form>
```

**Behaviour:** All values are collected and submitted together. A single `onSubmit` event handles everything.

**Use when:** Queries go to a server, you want all parameters in one request, or you want an explicit "Apply Filters" button.

### Pattern C: No form, all live

```html
<div role="search">
  <input type="search" />
  <select>...</select>
  <select>...</select>
</div>
```

**Behaviour:** Every control triggers immediate filtering via `onChange` / debounced input. No submit step.

**Use when:** Small datasets, client-side filtering, instant feedback.

---

## 4. React Router's `<Form>` Component

React Router provides a `<Form>` component that replaces the standard HTML `<form>`. It is the idiomatic way to handle search toolbars in a React Router application.

### 4.1 The Core Idea

A standard HTML `<form>` sends a request to the server and triggers a full page reload. React Router's `<Form>` intercepts that submission and converts it into **client-side navigation**.

```jsx
import { Form } from "react-router";

<Form method="get" action="/users">
  <input type="search" name="q" />
  <select name="role">
    <option value="">All Roles</option>
    <option value="caregiver">Caregiver</option>
  </select>
  <button type="submit">Search</button>
</Form>
```

When submitted, this navigates to `/users?q=sarah&role=caregiver` without reloading the page. React Router handles it as a route transition.

### 4.2 GET vs POST

| Method | What happens | When to use |
|--------|-------------|-------------|
| `method="get"` | Serializes inputs to URL search params. Triggers the route's **loader** function. | Reading data: searches, filters, pagination. |
| `method="post"` | Sends form data in the request body. Triggers the route's **action** function. | Writing data: creating, updating, deleting records. |

```jsx
// GET: search/filter (triggers loader)
<Form method="get">
  <input name="q" />
</Form>

// POST: mutation (triggers action)
<Form method="post">
  <input name="email" />
  <button>Create User</button>
</Form>
```

### 4.3 Connecting to Loaders

The loader function runs every time the route's URL changes — including when search parameters change.

```jsx
// Route definition
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const role = url.searchParams.get("role") || "";
  const page = url.searchParams.get("page") || "1";

  const data = await fetchUsers({ q, role, page });
  return { users: data.users, total: data.total, q, role };
}

export default function UsersPage() {
  const { users, total, q, role } = useLoaderData();

  return (
    <>
      <Form method="get">
        <input type="search" name="q" defaultValue={q} />
        <select name="role" defaultValue={role}>
          <option value="">All Roles</option>
          <option value="caregiver">Caregiver</option>
        </select>
        <button type="submit">Search</button>
      </Form>

      <p>Showing {users.length} of {total}</p>

      <table>
        {/* render users */}
      </table>
    </>
  );
}
```

The flow is:
1. User fills in the form and submits
2. React Router serializes the form inputs into URL search params
3. The URL changes (e.g., to `/users?q=sarah&role=caregiver`)
4. React Router calls the loader with the new URL
5. The loader extracts the params, fetches data, and returns it
6. The component re-renders with the new data from `useLoaderData()`

### 4.4 `defaultValue` vs `value`

This is a critical distinction. Use `defaultValue`, not `value`:

```jsx
// Correct: uncontrolled, React Router manages state via URL
<input name="q" defaultValue={q} />

// Wrong: controlled, requires useState + onChange, fights the router
<input name="q" value={q} onChange={(e) => setQ(e.target.value)} />
```

With `defaultValue`, the form is **uncontrolled**. The URL is the single source of truth. When the loader returns new data (including the current `q` value), the component re-renders and the input gets its initial value from the URL.

With `value`, you create a parallel source of truth (React state) that must be kept in sync with the URL — unnecessary complexity.

### 4.5 Auto-Submitting Filters with `useSubmit`

To submit the form when a dropdown changes (without clicking a button), use the `useSubmit` hook:

```jsx
import { Form, useSubmit } from "react-router";

export default function UsersPage() {
  const { users, q, role } = useLoaderData();
  const submit = useSubmit();

  return (
    <Form method="get">
      <input type="search" name="q" defaultValue={q} />
      <select
        name="role"
        defaultValue={role}
        onChange={(e) => submit(e.currentTarget.form)}
      >
        <option value="">All Roles</option>
        <option value="caregiver">Caregiver</option>
      </select>
    </Form>
  );
}
```

`submit(formElement)` reads all the current values from the form DOM and navigates with those as params. The search input value is included automatically because it is part of the same form.

### 4.6 Debouncing Search Input

For search-as-you-type, debounce the submission so you are not triggering a loader on every keystroke:

```jsx
import { Form, useSubmit } from "react-router";
import { useRef } from "react";

export default function UsersPage() {
  const { users, q } = useLoaderData();
  const submit = useSubmit();
  const timerRef = useRef(null);

  function handleSearchChange(e) {
    clearTimeout(timerRef.current);
    const form = e.currentTarget.form;
    timerRef.current = setTimeout(() => submit(form), 300);
  }

  return (
    <Form method="get">
      <input
        type="search"
        name="q"
        defaultValue={q}
        onChange={handleSearchChange}
      />
    </Form>
  );
}
```

The loader is called 300ms after the user stops typing.

### 4.7 Showing Loading State with `useNavigation`

While the loader is running (fetching data), you can show a loading indicator:

```jsx
import { useNavigation } from "react-router";

export default function UsersPage() {
  const { users } = useLoaderData();
  const navigation = useNavigation();

  const isSearching = navigation.state === "loading"
    && navigation.location?.search;

  return (
    <>
      <Form method="get">
        <input type="search" name="q" />
        {isSearching && <span>Searching...</span>}
      </Form>

      <div style={{ opacity: isSearching ? 0.6 : 1 }}>
        <table>{/* render users */}</table>
      </div>
    </>
  );
}
```

`navigation.state` is `"loading"` while the loader runs. `navigation.location` tells you where the user is navigating to, including the new search params.

### 4.8 Benefits of URL-Based State

Using React Router's `<Form method="get">` for your toolbar means:

1. **Bookmarkable URLs** — `/users?q=sarah&role=caregiver` can be saved, shared, or pasted into a new tab.
2. **Browser history works** — Back/forward navigates between filter states. The user can undo a filter change with the back button.
3. **No `useState` for filters** — The URL is the single source of truth. No state synchronisation bugs.
4. **Server-side rendering compatible** — The loader can run on the server with the same URL params, producing the correct initial HTML.
5. **Deep linking** — Another page can link to `/users?status=suspended` and the toolbar will show the correct state on load.

---

## 5. Putting It All Together

A complete search toolbar in a React Router application:

```jsx
import { Form, useSubmit, useLoaderData, useNavigation } from "react-router";
import { useRef } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const role = url.searchParams.get("role") || "";
  const status = url.searchParams.get("status") || "";
  const sort = url.searchParams.get("sort") || "newest";
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const data = await fetchRecords({ q, role, status, sort, page });

  return { records: data.records, total: data.total, q, role, status, sort };
}

export default function ListPage() {
  const { records, total, q, role, status, sort } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const timerRef = useRef(null);
  const isFiltering = navigation.state === "loading";

  function handleSearchChange(e) {
    clearTimeout(timerRef.current);
    const form = e.currentTarget.form;
    timerRef.current = setTimeout(() => submit(form), 300);
  }

  function handleFilterChange(e) {
    submit(e.currentTarget.form);
  }

  const hasFilters = q || role || status;

  return (
    <main>
      <h1>Records</h1>

      <Form method="get" role="search">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by name or email..."
          aria-label="Search records"
          onChange={handleSearchChange}
        />

        <select
          name="role"
          defaultValue={role}
          aria-label="Filter by role"
          onChange={handleFilterChange}
        >
          <option value="">All Roles</option>
          <option value="caregiver">Caregiver</option>
          <option value="care-receiver">Care Receiver</option>
        </select>

        <select
          name="status"
          defaultValue={status}
          aria-label="Filter by status"
          onChange={handleFilterChange}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>

        <select
          name="sort"
          defaultValue={sort}
          aria-label="Sort by"
          onChange={handleFilterChange}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="name-asc">Name A-Z</option>
        </select>
      </Form>

      {hasFilters && (
        <div aria-label="Active filters">
          {q && <span>Search: {q}</span>}
          {role && <span>Role: {role}</span>}
          {status && <span>Status: {status}</span>}
          <Form method="get">
            <button type="submit">Clear all filters</button>
          </Form>
        </div>
      )}

      <output aria-live="polite">
        Showing {records.length} of {total} records
      </output>

      <div style={{ opacity: isFiltering ? 0.6 : 1 }}>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.role}</td>
                <td>{record.status}</td>
                <td><a href={`/records/${record.id}`}>View</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
```

Note the "Clear all filters" trick: an empty `<Form method="get">` with just a submit button navigates to the current route with no search params, effectively resetting everything.

---

## 6. Summary of Key Elements

| Element | Key Attributes | Purpose |
|---------|---------------|---------|
| `<div role="toolbar">` | `aria-label` | Groups related controls, enables arrow-key nav |
| `<form>` / `<Form>` | `role="search"`, `method`, `action` | Creates search landmark, handles submission |
| `<input type="search">` | `name`, `placeholder`, `aria-label`, `autocomplete` | Free-text search input |
| `<label>` | `for` | Associates text with an input for accessibility |
| `<select>` | `name`, `aria-label`, `defaultValue` | Structured filter with predefined options |
| `<option>` | `value` | Individual filter choice |
| `<input type="date">` | `name`, `min`, `max` | Date range filter |
| `<button type="button">` | `aria-label` | Actions that should not submit the form |
| `<button type="submit">` | | Submits the form |
| `<output>` | `aria-live="polite"` | Dynamic results count |
| `<ul>` | `aria-label="Active filters"` | Shows currently applied filters as removable tags |
| `<th>` | `scope="col"`, `aria-sort` | Sortable column headers in the results table |
