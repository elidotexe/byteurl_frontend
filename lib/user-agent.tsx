export function getUserAgent() {
  var userAgent = window.navigator.userAgent;
  var browser = "Unknown Browser";

  switch (true) {
    case userAgent.includes("Firefox"):
      browser = "Firefox";
      break;
    case userAgent.includes("SamsungBrowser"):
      browser = "Samsung Browser";
      break;
    case userAgent.includes("Opera") || userAgent.includes("OPR"):
      browser = "Opera";
      break;
    case userAgent.includes("Trident"):
      browser = "Internet Explorer";
      break;
    case userAgent.includes("Edge"):
      browser = "Edge";
      break;
    case userAgent.includes("Chrome"):
      browser = "Chrome";
      break;
    case userAgent.includes("Safari"):
      browser = "Safari";
      break;
    default:
      browser = "Other";
      break;
  }

  // Detecting device
  var device = "Unknown Device";
  switch (true) {
    case userAgent.includes("iPhone"):
      device = "iPhone";
      break;
    case userAgent.includes("iPad"):
      device = "iPad";
      break;
    case userAgent.includes("Linux"):
      device = "Linux/MacOS";
      break;
    case userAgent.includes("Android"):
      device = "Android";
      break;
    case userAgent.includes("Windows"):
      device = "Windows PC";
      break;
    case userAgent.includes("Macintosh"):
      device = "Macintosh";
      break;
    default:
      browser = "Other";
      break;
  }

  return { browser: browser, device: device };
}
