/**
 * @BusinessRule: Calculate Approval Tier
 * @Table: u_procurement_request
 * @When: Before Insert/Update
 * 
 * Why: I chose a Business Rule to handle the initial state transition and tier 
 * calculation. This ensures the record is 'born' with the correct requirements 
 * populated, allowing the Flow Designer to pick up the record with high-fidelity 
 * data already in place.
 */
(function executeRule(current, previous) {
    if (current.estimated_cost.nil()) return;

    var totalCost = parseFloat(current.estimated_cost);

    // Approval Logic thresholds
    if (totalCost < 500) {
        current.approval_required = false;
        current.approval_tier = 'none';
        // Auto-approve small amounts immediately
        if (current.isNewRecord()) {
            current.state = 'approved';
            current.work_notes = "Auto-approved: Purchase is under $500 threshold.";
        }
    } else if (totalCost >= 500 && totalCost < 2000) {
        current.approval_required = true;
        current.approval_tier = 'supervisor';
    } else {
        current.approval_required = true;
        current.approval_tier = 'dual';
    }

})(current, previous);
