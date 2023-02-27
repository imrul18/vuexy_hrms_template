// tag : '',            -----> div id
// position : 'top',    -----> top/bottom
// text : '',           -----> heading
// button : [1,2]       -----> 1=skip, 2=back, 3=next, 4=finish

const allSteps = {
  preference: [
    {
      tag: "hierarchy_level",
      text: "Firstly you need to set hierarchy level",
      button: [1, 3]
    },
    {
      tag: "hr_id",
      text: "Then you need to select System HR",
      button: [2, 3]
    },
    {
      tag: "final_approver_id",
      text: "Finally you need to select Final Approver",
      button: [2, 3]
    },
    {
      tag: "replace_all",
      text: "Checked it for applying this settings to all Departments",
      button: [2, 3]
    },
    {
      tag: "submit",
      text: "Click on submit button to save the settings",
      button: [2, 4]
    }
  ],
  department_settings: [
    {
      tag: "hierarchy_level",
      text: "You can change Hierarchy Level fro every Departments",
      button: [1, 3]
    },
    {
      tag: "include_special_person",
      text: "Then you need to select System HR",
      button: [2, 3]
    },
    {
      tag: "include_special_person_id",
      text: "Checked it for applying this settings to all Departments",
      button: [2, 3]
    },
    {
      tag: "include_department_head",
      text: "Checked it for applying this settings to all Departments",
      button: [2, 3]
    },
    {
      tag: "include_division_head",
      text: "Finally you need to select Final Approver",
      button: [2, 3]
    },
    {
      tag: "include_hr",
      text: "Checked it for applying this settings to all Departments",
      button: [2, 3]
    },
    {
      tag: "include_final_approver",
      text: "Click on submit button to save the settings",
      button: [2, 4]
    }
  ]
}

export default allSteps
