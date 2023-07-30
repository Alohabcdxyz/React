export const adminMenu = [
  {
    //user
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      {
        name: "menu.admin.manage-admin-pro",
        link: "/system/manage-admin-pro",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // },
      // {
      //   //doctor manage
      //   name: "menu.doctor.manage-schedule",
      //   link: "/doctor/manage-schedule",
      // },
    ],
  },

  {
    //clinic
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
      {
        name: "menu.admin.edit-clinic",
        link: "/system/edit-clinic",
      },
    ],
  },

  {
    //specialty
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
      {
        name: "menu.admin.edit-specialty",
        link: "/system/edit-specialty",
      },
    ],
  },

  {
    //handbook
    name: "menu.admin.hand-book",
    menus: [
      {
        name: "menu.admin.manage-hand-book",
        link: "/system/manage-hand-book",
      },
      {
        name: "menu.admin.edit-hand-book",
        link: "/system/edit-hand-book",
      },
    ],
  },

  {
    //dashboard
    name: "menu.admin.dashboard",
    menus: [
      {
        name: "menu.admin.dashboard",
        link: "/system/dashboard",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.doctor.manage-doctor",
    menus: [
      {
        //doctor manage
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        //doctor manage booking
        name: "menu.doctor.manage-booking",
        link: "/doctor/manage-booking",
      },
      {
        //doctor manage booking
        name: "menu.doctor.manage-not-confirm-booking",
        link: "/doctor/manage-not-confirm-booking",
      },
      {
        //doctor manage booking
        name: "menu.doctor.manage-done-booking",
        link: "/doctor/manage-done-booking",
      },
      {
        //doctor manage booking
        name: "menu.doctor.manage-cancel-booking",
        link: "/doctor/manage-cancel-booking",
      },
    ],
  },
  {
    name: "menu.doctor.manage-profile",
    menus: [
      {
        //doctor manage
        name: "menu.doctor.manage-profile",
        link: "/doctor/manage-profile",
      },
      {
        //doctor manage
        name: "menu.doctor.manage-profile-extra",
        link: "/doctor/manage-profile-extra",
      },
    ],
  },
];
