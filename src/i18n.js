import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Unverifed": "Unverifed",
      "Rate": "Rate",
      "Period": "Period",
      "Created on": "Created on",
      "Ends in": "Ends in",
      "Closed": "Closed",
      "Expected": "Expected",

      "GO TO INVEST": "GO TO INVEST",
      "GET A BORROW": "GET A BORROW",
      "About": "Early Bird uses smart contracts to provide loans to companies, significantly reducing the cost of raising funds. Connect your wallets to get started.",
      "Total borrowed": "Total borrowed",
      "Borrowers": "Borrowers",
      "Investors": "Investors",
      "Avg rate": "Avg rate",

      "Home": "Home",
      "Borrows": "Borrows",
      "Portfolio": "Portfolio",

      "AllTab": "All",
      "OpenTab": "Open",
      "ActiveTab": "Active",
      "ClosedTab": "Closed",
      "CanceledTab": "CanceledTab",

      "AllTabText": "All borrows",
      "OpenTabText": "Borrows that are still in the process of raising funds",
      "ActiveTabText": "Formed borrows for which repayments are expected",
      "ClosedTabText": "Completed borrows that have already matured",
      "CanceledTabText": "CanceledTab",

      "Search": "Search",

      "Supported Chains": "Supported Chains",
      "For investors": "For investors",

      "Back": "Back",
      "Ends in BorrowPage": "Ends in",
      "Share": "Share",
      "Copy Link": "Copy Link",

      "Borrower expected to pay": "Borrower expected to pay",
      "Created in": "Created in",
      "Period, days": "Period, days",
      "Total borrowed Page": "Total borrowed",
      "Interest rate": "Interest rate",
      "About borrower": "About borrower",
      "Unverified borrower. Hight risk to invest": "Unverified borrower. Hight risk to invest",
      "Invest": "Invest",

      "Enter amount": "Enter amount",
      "Pending": "Pending",
      "Wait for confirmations": "Wait for confirmations",
      "Congratulations": "Congratulations",
      "You successfuly invested": "You successfuly invested",
      "in": 'in',
      "View transaction": "View transaction",
      "Share to": "Share to",





    }
  },
  ru: {
    translation: {
      "Unverifed": "Непроверенный",
      "Rate": "Ставка",
      "Period": "Срок",
      "Created on": "Создан",
      "Ends in": "Осталось",
      "Closed": "Закрыт",
      "Expected": "Ожидает оплаты",

      "GO TO INVEST": "ИНВЕСТИРОВАТЬ",
      "GET A BORROW": "ПОЛУЧИТЬ ЗАЙМ",
      "About": "Early Bird использует смарт-контракты для предоставления кредитов компаниям, что значительно снижает стоимость привлечения средств. Подключите свои кошельки, чтобы начать.",
      "Total borrowed": "Всего занято",
      "Borrowers": "Заемщики",
      "Investors": "Инвесторы",
      "Avg rate": "Средняя ставка",

      "Home": "Главная",
      "Borrows": "Займы",
      "Portfolio": "Портфель",

      "AllTab": "Все",
      "OpenTab": "Открытые",
      "ActiveTab": "Активные",
      "ClosedTab": "Закрытые",
      "CanceledTab": "Отмененные",

      "AllTabText": "Все займы на платформе",
      "OpenTabText": "Займы, которые все еще находятся в процессе сбора средств",
      "ActiveTabText": "Сформированные займы, по которым ожидается погашение",
      "ClosedTabText": "Завершенные займы, которые уже погашены",
      "CanceledTabText": "CanceledTab",

      "Search": "Поиск",

      "Supported Chains": "Поддерживаемые сети",
      "For investors": "Инвесторам",

      "Back": "Назад",
      "Ends in BorrowPage": "Заканчивается через",
      "Share": "Поделиться",
      "Copy Link": "Ссылка",

      "Borrower expected to pay": "Ожидается оплата по займу",
      "Created in": "Дата создания",
      "Period, days": "Срок, дней",
      "Total borrowed Page": "Всего собрано",
      "Interest rate": "Ставка",
      "About borrower": "О заемщике",
      "Unverified borrower. Hight risk to invest": "Непроверенный заемщик. Инвестирование в данный займ несет большой риск",
      "Invest": "Инвестировать",

      "Enter amount": "Введите сумму",
      "Pending": "Ожидание",
      "Wait for confirmations": "Транзакция выполняется",
      "Congratulations": "Поздравляем",
      "You successfuly invested": "Вы успешно инвестировали",
      "in": 'в',
      "View transaction": "Посмотреть транзакцию",
      "Share to": "Поделиться в",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;