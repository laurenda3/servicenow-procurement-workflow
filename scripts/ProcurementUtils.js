var ProcurementUtils = Class.create();
ProcurementUtils.prototype = {
    initialize: function () { },

    /**
     * Calculates the required approval tier based on estimated cost.
     * 
     * @param {number} totalCost - The estimated cost of the procurement request.
     * @return {Object} An object containing the tier and approval requirement.
     * 
     * Why: This logic is moved into one organized script to keep things professional. 
     * Putting this in one central place ensures that both the initial check 
     * and the approval workflow use the exact same rules.
     */
    getApprovalTier: function (totalCost) {
        var results = {
            tier: 'none',
            approval_required: false
        };

        if (totalCost < 500) {
            results.tier = 'none';
            results.approval_required = false;
        } else if (totalCost >= 500 && totalCost < 2000) {
            results.tier = 'supervisor';
            results.approval_required = true;
        } else {
            results.tier = 'dual';
            results.approval_required = true;
        }

        return results;
    },

    /**
     * Checks inventory for availability before triggering a new purchase.
     * 
     * @param {string} modelID - The sys_id of the appliance model.
     * @return {boolean} True if stock is available.
     */
    isStockAvailable: function (modelID) {
        var gr = new GlideRecord('u_appliance');
        gr.addQuery('u_appliance_model', modelID);
        gr.addQuery('install_status', '6'); // In Stock
        gr.query();
        return gr.hasNext();
    },

    type: 'ProcurementUtils'
};
