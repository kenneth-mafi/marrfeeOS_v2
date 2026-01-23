import { useCryptoPrices } from "../API/CryptoApi";


export const generateId = () =>{
  return Date.now().toString() + Math.random().toString(36).slice(2);
}

export const capitalize = (str) =>{
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getSavingsProgressMessage(progressPercent) {
  if (progressPercent <= 0) {
    return "Let’s get started! Every small deposit counts 💪";
  }

  if (progressPercent < 10) {
    return "Good start! You’ve taken the first step 👏";
  }

  if (progressPercent < 25) {
    return "Momentum is building — keep going 🚀";
  }

  if (progressPercent < 50) {
    return "You’re making solid progress 👍";
  }

  if (progressPercent < 75) {
    return "More than halfway there! Stay focused 🔥";
  }

  if (progressPercent < 90) {
    return "Almost there — the finish line is in sight 🏁";
  }

  if (progressPercent < 100) {
    return "So close! One last push 💰";
  }

  return "Goal achieved! Amazing discipline 🎉";
}


export function getBudgetProgressMessage(spent, limit) {
  if (limit <= 0) return "";

  const percent = (spent / limit) * 100;

  if (percent <= 0) {
    return "No spending yet — budget is fully intact 🟢";
  }

  if (percent < 25) {
    return "Plenty of room left in this budget 👍";
  }

  if (percent < 50) {
    return "You’re spending steadily — keep it balanced ⚖️";
  }

  if (percent < 75) {
    return "Careful now, you’re past halfway ⚠️";
  }

  if (percent < 90) {
    return "Budget is running low — plan ahead 🟠";
  }

  if (percent < 100) {
    return "Almost at the limit — proceed with caution 🔴";
  }

  return "Budget exceeded — review your spending 🚨";
}


export function usePortfolioUpdater() {
  const { cryptoData } = useCryptoPrices();

  useEffect(() => {
    if (!cryptoData.length) return;

    updatePortfolioValue(cryptoData);

    const interval = setInterval(() => {
      updatePortfolioValue(cryptoData);
    }, 60000);

    return () => clearInterval(interval);
  }, [cryptoData]);
}

/**
 * Parses CSV string into array of rows
 * @param {string} text
 * @returns {Array<Object>}
 */
export function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(",");
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i]?.trim();
      return obj;
    }, {});
  });
}


/**
 * Converts raw bank CSV row into app transaction
 */
export function normalizeTransaction(row) {
  const amount = Number(row.Amount);

  return {
    id: generateId(),
    label: row.Description || "Bank transaction",
    amount: Math.abs(amount),
    date: row.Date,
    group: amount >= 0 ? "income" : "expense"
  };
}


export function isDuplicate(tx, existing) {
  return existing.some(e =>
    e.date === tx.date &&
    e.amount === tx.amount &&
    e.label === tx.label
  );
}


const getBottomNavLinks = () => {
    return [
              {
                id: generateId(),
                icon: homeIcon,
                label: "Label",
                to: "/marrfeeShopping/homePage"
              },
              {
                id: generateId(),
                icon: reactIcon,
                label: "Label",
              },
              {
                id: generateId(),
                icon: reactIcon,
                label: "Label",
              },
              {
                id: generateId(),
                icon: reactIcon,
                label: "Label",
              },
    ]
}
  