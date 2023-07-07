export const getLocalizedMainNavTabs = (t:any) => [
  {
    id: 0,
    title: t('Home'),
    path: '/',
  },
  {
    id: 1,
    title: t('Borrows'),
    path: '/borrows',
    path2: '/borrows'
  },
  {
    id: 2,
    title: t('Portfolio'),
    path: '/portfolio'
  }
];


export const portfolioTabs = [
  {
    id: 0,
    title: 'Your investments',
    path: '/portfolio/investments',
  },
  {
    id: 1,
    title: 'Your borrows',
    path: '/portfolio/borrows',
  },
];


export const getLocalizedBorrowsTabs = (t: any) => [
    {
      label: t("AllTab"),
      status: -1,
      text: t("AllTabText")
    },
    {
      label: t("OpenTab"),
      status: 0,
      text: t("OpenTabText")
    },
    {
      label: t("ActiveTab"),
      status: 1,
      text: t("ActiveTabText")
    },
    {
      label: t("ClosedTab"),
      status: 2,
      text: t("ClosedTabText")
    },
];