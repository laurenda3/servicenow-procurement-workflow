# Technical Brief: Procurement Workflow Automation

## The Problem
In decentralized industrial operations, "blind spending" is a major risk. Without centralized approval gates, property managers were seeing a high volume of unauthorized purchases and, more importantly, duplicate ordering of major appliances because buyers had no visibility into existing inventory. This led to budget overruns and equipment stockpiles that sat unused while capital was tied up.

## The Solution
I built a **Procurement Control System** on the **ServiceNow Zurich release** that integrates spend management with asset intelligence. My objective was to build a system that doesn't just route approvals, but actually checks the existing asset inventory before allowing a purchase request to proceed. This ensures that every dollar spent is a necessity, not an oversight.

---

## Technical Architecture

### Flow Designer & Approval Steps
I chose to build the core engine in **Flow Designer** to provide a clear, easy-to-follow process for purchase requests.
*   **How it works:** I built a **step-by-step approval process**. Instead of simple "Approved/Rejected," the system tracks `Pending Approval`, `Awaiting Inventory Check`, `Approved`, and `Ordered`. This gives the Service Desk a detailed view of exactly where a request is stuck.
*   **Automatic Rules:** The workflow uses "if/then" rules to handle my 3-tier approval strategy (Auto-approve < $500, Single-tier $500-$1,999, Dual-tier $2,000+).

### Data Modeling & License Optimization
*   **Architecture Strategy:** I designed the procurement request table as a custom table rather than extending a heavily-licensed ITOM table. This ensures the application remains highly functional while being **license-efficient** for the organization.
*   **Inventory Intelligence:** To solve the duplicate purchase problem, I built an automated **Inventory Check** step using the `ProcurementUtils` Script Include. This "Shift-Left" approach identifies available stock *before* any human approver is notified.

### Server-Side Rules (Script Includes)
*   **Keeping Rules in One Place:** I moved the approval limits and inventory lookup rules into one organized script (`ProcurementUtils`). This makes sure the system uses the same financial limits everywhere, making it easy to update if those limits change later.

---

## Key Features
*   **3-Tier Approval Logic:** Automated routing based on dollar thresholds, removing the manual "who do I send this to?" bottleneck.
*   **Inventory-Aware Ordering:** Automatically flags available stock to prevent duplicate equipment purchases.
*   **Digital Audit Trail:** A defensible record of every approval and rejection reason, stored permanently on the Task-extended record.
*   **Auto-Approve Thresholds:** Streamlines low-cost ordering (under $500) to keep maintenance teams moving without red tape.

## How to Review
To evaluate the technical implementation of this project, please review:
*   **Organized Code:** `scripts/ProcurementUtils.js` - See how I handle the approval limits and inventory checks in one place.
*   **Workflow Steps:** Check the Flow Designer screenshots below to see how I managed the approval steps and "if/then" rules.

---

## Screenshots

### Procurement Requests List
![Procurement Requests](assets/01_procurement_requests_list.png)  
*Dashboard showing pending, approved, and rejected purchase requests with status tracking*

### Procurement Request Form
![Request Form](assets/02_procurement_request_form.png)  
*Self-service form with auto-calculated approval tier and budget code categorization*

### Flow Designer Approval Logic
![Flow Designer](assets/03_flow_designer_canvas.png)  
*Multi-tier approval workflow showing conditional branching based on dollar thresholds*

---

- Inventory Checks
- Custom Table Design

---
**Developed by Laurenda Landry**  
*10 years experience in Industrial Operations & Compliance*
