export default {
    key: "skillsForm",
    title: "Add Skills",
    fields: [
        {
            name: "skills",
            label: "Select your caregiving skills",
            type: "checkbox-group",
            options: [
                { label: "Cooking & Meal Prep", value: "cooking" },
                { label: "Mobility Support", value: "mobility" },
                { label: "Medication Management", value: "medication" },
                { label: "Companionship", value: "companionship" },
                { label: "Personal Hygiene", value: "hygiene" },
                { label: "Housekeeping", value: "housekeeping" },
            ],
        },
    ],
    submitLabel: "Save Skills",
};
